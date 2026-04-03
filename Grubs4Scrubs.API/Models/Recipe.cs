namespace Grubs4Scrubs.Models;

public class Recipe
{
    public int Id {get;set;}
    public string Title { get; set; }  = string.Empty;
    public string Description { get; set; }  = string.Empty;
    public int PrepTime { get; set; }
    public int CookTime { get; set; }
    public int Servings { get; set; }
    public string Tag { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public decimal EstimatedBudget {get; set;}
    public string Category { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

}