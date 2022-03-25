using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace AddictedProxy.Model.Shows;

[Index("TvShowId", nameof(Number), IsUnique = true)]
public class Season
{
    public int Id { get; set; }

    public int TvShowId { get; set; }

    [ForeignKey("TvShowId")]
    public virtual TvShow TvShow { get; set; }
    /// <summary>
    /// Number associated with the season
    /// </summary>
    public int Number { get; set; }

}