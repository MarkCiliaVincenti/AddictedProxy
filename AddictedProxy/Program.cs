#region

using System.Reflection;
using AddictedProxy.Controllers.Rest.Bootstrap;
using AddictedProxy.Database.Bootstrap;
using AddictedProxy.Database.Context;
using AddictedProxy.Model.Performance;
using AddictedProxy.Storage.Bootstrap;
using AddictedProxy.Upstream.Boostrap;
using InversionOfControl.Service.Bootstrap;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Sentry.Performance.Bootstrap;

#endregion

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSwaggerGen(options =>
       {
           // using System.Reflection;
           var executingAssembly = Assembly.GetExecutingAssembly();
           var xmlFilename = $"{executingAssembly.GetName().Name}.xml";
           options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
           if (builder.Environment.IsProduction())
           {
               options.AddServer(new OpenApiServer
               {
                   Url = "https://api.gestdown.info",
                   Description = "Production"
               });
           }

           options.SwaggerDoc("v1", new OpenApiInfo
           {
               Title = "Gestdown: Addicted Proxy",
               Description = "Provide a full api to search and download subtitles from Addic7ed website.",
               Version = executingAssembly.GetName().Version!.ToString(3)
           });
       })
       .AddEndpointsApiExplorer();

//Add our own bootstrapping
var currentAssemblies = new[]
{
    typeof(BootstrapController).Assembly,
    typeof(BootstrapDatabase).Assembly,
    typeof(BootstrapCompressor).Assembly,
    typeof(BootstrapAddictedServices).Assembly,
    typeof(BootstrapPerformance).Assembly
};

builder.Services
       .AddBootstrap(builder.Configuration, currentAssemblies);

builder.Host.UseSystemd();
builder.WebHost.UseSentry(sentryBuilder =>
{
    sentryBuilder.Dsn = Environment.GetEnvironmentVariable("SENTRY_DSN");
#if DEBUG
    sentryBuilder.Debug = true;
#endif
    var perf = builder.Configuration.GetSection("Performance").Get<Performance>();
    sentryBuilder.TracesSampleRate = perf.SampleRate;
});

var app = builder.Build();

app.UseBootstrap(currentAssemblies);
app.UseSentryTracing();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage()
       .UseSwaggerUI(options => options.RoutePrefix = "api");
}

app.UseCors(policyBuilder =>
{
    policyBuilder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        .WithExposedHeaders("Content-Disposition");
    if (app.Environment.IsDevelopment())
    {
        policyBuilder.SetIsOriginAllowed(_ => true);
    }
    else
    {
        policyBuilder.SetIsOriginAllowed(hostname => hostname.EndsWith(".gestdown.info"));
    }
});

app.UseSwagger(options => options.RouteTemplate = "api/{documentName}/swagger.{json|yaml}");

{
    await using var serviceScope = app.Services.CreateAsyncScope();
    await using var dbContext = serviceScope.ServiceProvider.GetRequiredService<EntityContext>();

    await dbContext.Database.MigrateAsync();
}


app.Run();