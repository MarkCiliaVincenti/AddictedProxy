﻿using AddictedProxy.Database.Repositories.Shows;
using AddictedProxy.Services.Credentials;
using AddictedProxy.Services.Provider.Subtitle.Job;
using AddictedProxy.Storage.Store;
using AddictedProxy.Upstream.Service;
using AddictedProxy.Upstream.Service.Exception;
using Job.Scheduler.Scheduler;

namespace AddictedProxy.Services.Provider.Subtitle;

public class SubtitleProvider : ISubtitleProvider
{
    private readonly IAddic7edDownloader _addic7EdDownloader;
    private readonly IStorageProvider _storageProvider;
    private readonly ISubtitleRepository _subtitleRepository;
    private readonly ICredentialsService _credentialsService;
    private readonly IServiceProvider _serviceProvider;
    private readonly IJobScheduler _jobScheduler;

    public SubtitleProvider(IAddic7edDownloader addic7EdDownloader,
                            IStorageProvider storageProvider,
                            ISubtitleRepository subtitleRepository,
                            ICredentialsService credentialsService,
                            IServiceProvider serviceProvider,
                            IJobScheduler jobScheduler)
    {
        _addic7EdDownloader = addic7EdDownloader;
        _storageProvider = storageProvider;
        _subtitleRepository = subtitleRepository;
        _credentialsService = credentialsService;
        _serviceProvider = serviceProvider;
        _jobScheduler = jobScheduler;
    }

    /// <summary>
    /// Get the subtitle file stream
    /// </summary>
    /// <param name="subtitleUniqueId"></param>
    /// <param name="token"></param>
    /// <exception cref="DownloadLimitExceededException">When we reach limit in Addicted to download the subtitle</exception>
    /// <returns></returns>
    public async Task<Stream> GetSubtitleFileAsync(Guid subtitleUniqueId, CancellationToken token)
    {
        var subtitle = await _subtitleRepository.GetSubtitleByGuidAsync(subtitleUniqueId, false, token);
        if (subtitle == null)
        {
            return null;
        }

        if (subtitle.StoragePath != null)
        {
            return await _storageProvider.DownloadAsync(subtitle.StoragePath, token);
        }

        await using var creds = await _credentialsService.GetLeastUsedCredsAsync(token);

        await using var subtitleStream = await _addic7EdDownloader.DownloadSubtitle(creds.AddictedUserCredentials, subtitle, token);
        await using var buffer = new MemoryStream();

        await subtitleStream.CopyToAsync(buffer, token);

        var blob = buffer.ToArray();

        _jobScheduler.ScheduleJob(new StoreSubtitleJob(_serviceProvider, subtitleUniqueId, blob));
        return new MemoryStream(blob);
    }
}