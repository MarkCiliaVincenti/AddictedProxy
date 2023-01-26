using System;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace NeoSmart.Caching.Sqlite
{
    public static class SqliteCacheServiceCollectionExtensions
    {
        public static IServiceCollection AddSqliteCache(this IServiceCollection services,
            Action<SqliteCacheOptions> setupAction)
        {
            if (services == null)
            {
                throw new ArgumentNullException(nameof(services));
            }

            if (setupAction == null)
            {
                throw new ArgumentNullException(nameof(setupAction));
            }

            services.AddOptions<SqliteCacheOptions>().Configure(setupAction);
            services.AddSingleton<SqliteCache>();
            return services;
        }
        
        public static IServiceCollection AddSqliteCacheAsDistributedCache(this IServiceCollection services,
                                                        Action<SqliteCacheOptions> setupAction)
        {
            AddSqliteCache(services, setupAction);
            services.AddSingleton<IDistributedCache>(provider => provider.GetRequiredService<SqliteCache>());
            return services;
        }

        /// <summary>
        /// Registers <c>SqliteCache</c> as a dependency-injected singleton, available
        /// both as <c>IDistributedCache</c> and <c>SqliteCache</c>.
        /// </summary>
        /// <param name="services"></param>
        /// <param name="path">The path where the SQLite database should be stored. It
        /// is created if it does not exist. (The path should be a file path, not a
        /// directory. Make sure the application has RW access at runtime.)</param>
        /// <returns></returns>
        public static IServiceCollection AddSqliteCache(this IServiceCollection services,
            string path)
        {
            return AddSqliteCache(services, options => options.CachePath = path);
        }
        
        public static IServiceCollection AddSqliteCacheAsDistributedCache(this IServiceCollection services,
                                                                          string path)
        {
            AddSqliteCache(services, path);
            services.AddSingleton<IDistributedCache>(provider => provider.GetRequiredService<SqliteCache>());
            return services;
        }

    }
}
