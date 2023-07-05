﻿namespace AddictedProxy.Model.Dto;

public record struct MediaDetailsDto(ShowDto Media, MediaDetailsDto.DetailsDto? Details)
{
    /// <summary>
    /// Represent the type of media
    /// </summary>
    public enum MediaType
    {
        Show,
        Movie
    }

    public record DetailsDto(string PosterPath, string Overview, string OriginalName, MediaType MediaType, string BackdropPath, double VoteAverage, string[] Genre, string TagLine, int ReleaseYear)
    {
        /// <summary>
        /// URL of the poster
        /// </summary>
        /// <example>https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Bloodhounds_%28South_Korean_TV_series%29.jpg/250px-Bloodhounds_%28South_Korean_TV_series%29.jpg</example>
        public string PosterPath { get; init; } = PosterPath;

        /// <summary>
        /// Short description of the media, usually the plot
        /// </summary>
        /// <example>Bloodhounds depicts a story about two young boxers who set foot in the world of private loans in pursuit of money and get caught up in a huge force</example>
        public string Overview { get; init; } = Overview;

        /// <summary>
        /// Original name in its own language, useful for non-english shows
        /// </summary>
        /// <example>사냥개들</example>
        public string OriginalName { get; init; } = OriginalName;

        /// <summary>
        /// Type of media (Show or Movie)
        /// </summary>
        /// <example>Show</example>
        public MediaType MediaType { get; init; } = MediaType;

        /// <summary>
        /// URL of the backdrop image for the show
        /// </summary>
        /// <example>https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Bloodhounds_%28South_Korean_TV_series%29.jpg/250px-Bloodhounds_%28South_Korean_TV_series%29.jpg</example>
        public string BackdropPath { get; init; } = BackdropPath;

        /// <summary>
        /// Percentage of user votes
        /// </summary>
        /// <example>0.85</example>
        public double VoteAverage { get; init; } = VoteAverage;

        /// <summary>
        /// Genre of the media
        /// </summary>
        /// <example>["action", "horror"]</example>
        public string[] Genre { get; init; } = Genre;
        /// <summary>
        /// Tagline of the media
        /// </summary>
        /// <example>The best show on earth</example>
        public string TagLine { get; init; } = TagLine;

        /// <summary>
        /// Year of release
        /// </summary>
        public int ReleaseYear { get; init; } = ReleaseYear;
    }

    /// <summary>
    /// Show data
    /// </summary>
    public ShowDto Media { get; } = Media;

    /// <summary>
    /// Details of the show
    /// </summary>
    public DetailsDto? Details { get; } = Details;
}