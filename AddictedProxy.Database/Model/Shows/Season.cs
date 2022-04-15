using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace AddictedProxy.Database.Model.Shows;

[Index("TvShowId", nameof(Number), IsUnique = true)]
public class Season
{
    public long Id { get; set; }

    public long TvShowId { get; set; }

    [ForeignKey("TvShowId")]
    public virtual TvShow TvShow { get; set; }

    /// <summary>
    ///     Number associated with the season
    /// </summary>
    public long Number { get; set; }

    /// <summary>
    ///     When was the season last refreshed
    /// </summary>
    public DateTime? LastRefreshed { get; set; }
}