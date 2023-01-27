﻿#region

using System.Text.Json.Serialization.Metadata;
using AddictedProxy.Controllers.Rest.Serializer;
using AddictedProxy.Services.Middleware;
using InversionOfControl.Model;
using Microsoft.AspNetCore.HttpOverrides;
using Prometheus;

#endregion

namespace AddictedProxy.Controllers.Bootstrap;

public class BootstrapController : IBootstrap, IBootstrapApp
{
    public void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers()
                .AddMvcOptions(options => options.Filters.Add<OperationCancelledExceptionFilter>())
                .AddJsonOptions(options => { options.JsonSerializerOptions.TypeInfoResolver = JsonTypeInfoResolver.Combine(SerializationContext.Default, new DefaultJsonTypeInfoResolver()); });
        services.AddLogging(opt => { opt.AddConsole(c => { c.TimestampFormat = "[HH:mm:ss] "; }); });
    }

    public void ConfigureApp(IApplicationBuilder app)
    {
        if (app is IEndpointRouteBuilder endpointRouteBuilder)
        {
            endpointRouteBuilder.MapControllers();
        }

        app.UseCors(policyBuilder =>
        {
            policyBuilder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithExposedHeaders("Content-Disposition")
                .WithExposedHeaders("sentry-trace");
            if (app.ApplicationServices.GetRequiredService<IWebHostEnvironment>().IsDevelopment())
            {
                policyBuilder.SetIsOriginAllowed(_ => true);
            }
            else
            {
                policyBuilder.SetIsOriginAllowed(hostname => hostname.EndsWith(".gestdown.info") || hostname == "gestdown.info");
            }
        });

        app.UseHttpLogging();
        app.UseRouting();
        app.UseHttpMetrics();
        app.UseSentryTracing();
        app.UseAuthorization();
    }
}