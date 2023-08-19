﻿#region

using AddictedProxy.Storage.Compressor.Factory;
using InversionOfControl.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

#endregion

namespace AddictedProxy.Storage.Compressor.Bootstrap;

public class BootstrapCompressor : IBootstrap
{
    public void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<ICompressor, Compressor>();
        services.AddSingleton<CompressorFactory>();
    }
}