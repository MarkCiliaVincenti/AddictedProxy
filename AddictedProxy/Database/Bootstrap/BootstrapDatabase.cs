﻿using AddictedProxy.Database.Context;
using AddictedProxy.Database.EnvVar;
using AddictedProxy.Database.Repositories;
using InversionOfControl.Model;
using InversionOfControl.Service.EnvironmentVariable.Registration;

namespace AddictedProxy.Database.Bootstrap;

public class BootstrapDatabase : IBootstrap,
                                 IBootstrapEnvironmentVariable<EFCoreLicense, EFCoreLicenseParser>
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddHostedService<SetupEfCoreHostedService>();
        services.AddDbContext<EntityContext>();

        services.AddScoped<ITvShowRepository, TvShowRepository>();

        services.AddScoped<ISeasonRepository, SeasonRepository>();
        services.AddScoped<IEpisodeRepository, EpisodeRepository>();
        services.AddScoped<ISubtitleRepository, SubtitleRepository>();
    }

    public EnvVarRegistration<EFCoreLicense, EFCoreLicenseParser> EnvVarRegistration => new("EFCORE");
}