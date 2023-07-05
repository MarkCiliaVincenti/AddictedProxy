﻿using AddictedProxy.Database.Model;
using AddictedProxy.Model.Dto;
using AddictedProxy.Services.Provider.Shows;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using TvMovieDatabaseClient.Service;

namespace AddictedProxy.Controllers.Rest;

[Route("media")]
public class MediaController : Controller
{
    private readonly IShowRefresher _showRefresher;
    private readonly ITMDBClient _tmdbClient;

    public MediaController(IShowRefresher showRefresher, ITMDBClient tmdbClient)
    {
        _showRefresher = showRefresher;
        _tmdbClient = tmdbClient;
    }

    /// <summary>
    /// Get the details of a specific show
    /// </summary>
    /// <param name="showId"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentOutOfRangeException"></exception>
    [Route("{showId:guid}/details", Name = nameof(Routes.MediaDetails))]
    [HttpGet]
    [ProducesResponseType(typeof(MediaDetailsDto), 200)]
    [ProducesResponseType(typeof(string), 429)]
    [ProducesResponseType(404)]
    [Produces("application/json")]
    public async Task<IActionResult> GetDetailsById([FromRoute] Guid showId, CancellationToken cancellationToken)
    {
        Response.GetTypedHeaders().CacheControl = new CacheControlHeaderValue
        {
            Public = true,
            MaxAge = TimeSpan.FromDays(1)
        };

        var show = await _showRefresher.GetShowByGuidAsync(showId, cancellationToken);
        if (show == null)
        {
            Response.GetTypedHeaders().CacheControl = new CacheControlHeaderValue
            {
                Public = true,
                MaxAge = TimeSpan.FromDays(0.5)
            };
            return NotFound();
        }

        MediaDetailsDto.DetailsDto? detailsDto = null;
        if (show.TmdbId.HasValue)
        {
            switch (show.Type)
            {
                case ShowType.Show:
                    var showDetails = await _tmdbClient.GetShowDetailsByIdAsync(show.TmdbId.Value, cancellationToken);
                    if (showDetails != null)
                        detailsDto = new MediaDetailsDto.DetailsDto(showDetails.PosterPath,
                            showDetails.Overview,
                            showDetails.OriginalName,
                            (MediaDetailsDto.MediaType)show.Type,
                            showDetails.BackdropPath,
                            showDetails.VoteAverage,
                            showDetails.Genres.Select(genre => genre.Name).ToArray(),
                            showDetails.Tagline,
                            DateTime.Parse(showDetails.FirstAirDate).Year);
                    break;
                case ShowType.Movie:
                    var movieDetails = await _tmdbClient.GetMovieDetailsByIdAsync(show.TmdbId.Value, cancellationToken);
                    if (movieDetails != null)
                        detailsDto = new MediaDetailsDto.DetailsDto(movieDetails.PosterPath,
                            movieDetails.Overview,
                            movieDetails.OriginalTitle,
                            (MediaDetailsDto.MediaType)show.Type,
                            movieDetails.BackdropPath,
                            movieDetails.VoteAverage,
                            movieDetails.Genres.Select(genre => genre.Name).ToArray(),
                            movieDetails.Tagline,
                            DateTime.Parse(movieDetails.ReleaseDate).Year);

                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            detailsDto = detailsDto! with { PosterPath = $"https://image.tmdb.org/t/p/original{detailsDto.PosterPath}", BackdropPath = $"https://image.tmdb.org/t/p/original{detailsDto.BackdropPath}" };
        }

        return Ok(new MediaDetailsDto(new ShowDto(show), detailsDto));
    }
}