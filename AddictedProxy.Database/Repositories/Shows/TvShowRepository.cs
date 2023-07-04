﻿#region

using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using AddictedProxy.Database.Context;
using AddictedProxy.Database.Model;
using AddictedProxy.Database.Model.Shows;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Z.BulkOperations;

#endregion

namespace AddictedProxy.Database.Repositories.Shows;

public class TvShowRepository : ITvShowRepository
{
    private static readonly Action<BulkOperation<TvShow>> AvoidUpdateDiscoveredField = Rule.AvoidUpdateDiscoveredField<TvShow>();
    private readonly EntityContext _entityContext;
    private readonly ILogger<TvShowRepository> _logger;

    public TvShowRepository(EntityContext entityContext, ILogger<TvShowRepository> logger)
    {
        _entityContext = entityContext;
        _logger = logger;
    }


    public async IAsyncEnumerable<TvShow> FindAsync(string name, [EnumeratorCancellation] CancellationToken token)
    {
        _logger.LogInformation("Looking for show: {show}", name);
        var strictMatch = await _entityContext.TvShows
                                              .Where(show => EF.Functions.ILike(show.Name, name))
                                              .OrderByDescending(show => show.Priority)
                                              .Include(show => show.Seasons)
                                              .FirstOrDefaultAsync(token);

        if (strictMatch != null)
        {
            yield return strictMatch;
            _logger.LogInformation("Found exact match for {show}", name);
            yield break;
        }

        foreach (var tvShow in _entityContext.TvShows
                                             .Where(show => EF.Functions.ILike(show.Name, $"%{name}%"))
                                             .OrderByDescending(show => show.Priority)
                                             .Include(show => show.Seasons))

        {
            yield return tvShow;
        }
    }

    public Task UpsertRefreshedShowsAsync(IEnumerable<TvShow> tvShows, CancellationToken token)
    {
        Expression<Func<TvShow, object>> ignoreOnUpdate = show => new { show.Id, show.Discovered, show.LastSeasonRefreshed, show.UniqueId, show.Priority, show.TmdbId, show.IsCompleted, show.Type, show.TvdbId };

        return _entityContext.TvShows.BulkSynchronizeAsync(tvShows, options =>
        {
            options.IgnoreOnMergeUpdateExpression = ignoreOnUpdate;
            options.IgnoreOnSynchronizeUpdateExpression = ignoreOnUpdate;
            options.ColumnPrimaryKeyExpression = show => show.ExternalId;
        }, token);
    }


    public Task BulkSaveChangesAsync(CancellationToken token)
    {
        return _entityContext.BulkSaveChangesAsync(token);
    }

    public IAsyncEnumerable<TvShow> GetAllAsync(CancellationToken token)
    {
        return _entityContext.TvShows.ToAsyncEnumerable();
    }

    public Task UpdateShowAsync(TvShow show, CancellationToken token)
    {
        return _entityContext.TvShows.SingleUpdateAsync(show, AvoidUpdateDiscoveredField, token);
    }

    public Task<TvShow?> GetByIdAsync(long id, CancellationToken cancellationToken)
    {
        return _entityContext.TvShows
                             .Include(show => show.Seasons)
                             .SingleOrDefaultAsync(show => show.Id == id, cancellationToken: cancellationToken);
    }

    public Task<TvShow?> GetByGuidAsync(Guid id, CancellationToken cancellationToken)
    {
        return _entityContext.TvShows
                             .Include(show => show.Seasons)
                             .SingleOrDefaultAsync(show => show.UniqueId == id, cancellationToken: cancellationToken);
    }

    public IAsyncEnumerable<TvShow> GetByTvdbIdAsync(int id, CancellationToken cancellationToken)
    {
        return _entityContext.TvShows
                             .Include(show => show.Seasons)
                             .Where(show => show.TvdbId == id)
                             .ToAsyncEnumerable();
    }

    /// <summary>
    /// Get duplicate show by TmdbID
    /// </summary>
    /// <param name="token"></param>
    /// <returns></returns>
    public async Task<IDictionary<int, TvShow[]>> GetDuplicateTvShowByTmdbIdAsync(CancellationToken token)
    {
        return await _entityContext.TvShows
                                   .GroupBy(show => show.TmdbId)
                                   .Where(shows => shows.Count() > 1)
                                   .Select(shows => new
                                   {
                                       TmdbId = shows.Key,
                                       Shows = shows.ToArray()
                                   })
                                   .Where(arg => arg.TmdbId != null)
                                   .ToDictionaryAsync(shows => shows.TmdbId!.Value, shows => shows.Shows, cancellationToken: token);
    }

    public IAsyncEnumerable<TvShow> GetShowWithoutTmdbIdAsync()
    {
        return _entityContext.TvShows
                             .Include(show => show.Seasons)
                             .Where(show => !show.TmdbId.HasValue)
                             .ToAsyncEnumerable();
    }
    
    /// <summary>
    /// Get shows having at least one season
    /// </summary>
    /// <returns></returns>
    public IAsyncEnumerable<TvShow> GetAllHavingEpisodesAsync()
    {
        return _entityContext.TvShows.Where(show => show.Episodes.Count > 0).AsNoTracking().ToAsyncEnumerable();
    }

    public IAsyncEnumerable<TvShow> GetNonCompletedShows()
    {
        return _entityContext.TvShows.Where(show => show.TmdbId.HasValue).Where(show => !show.IsCompleted).Where(show => show.Type == ShowType.Show).ToAsyncEnumerable();
    }
}