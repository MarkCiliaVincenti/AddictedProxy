﻿using InversionOfControl.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;

namespace InversionOfControl.Tests.Mock;

public class BoostrapServiceMock : IBootstrap
{
    public void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IBaseService>(_ =>
        {
            var baseService = Substitute.For<IBaseService>();
            baseService.Name.Returns("Test");
            return baseService;
        });
    }
}

public class BootstrapServiceMockConditional : IBootstrapConditional
{
    public interface IShouldntExists
    {
        
    }
    public void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IShouldntExists>();
    }

    public bool ShouldLoadBootstrap(IConfiguration configuration)
    {
        return false;
    }
}