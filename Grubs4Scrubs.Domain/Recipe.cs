namespace Grubs4Scrubs.Domain;

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
    /* Ingredients and Instructions are stored a JSON, don't forget to add that bro */
    public string Ingredients {get; set;} = string.Empty;
    public string Instructions {get; set;} = string.Empty;
    public int? UserId { get; set; }
    public string Tips { get; set; } = string.Empty;
    public string Nutrition {get; set;} = string.Empty;
    public string Calories {get; set;} = string.Empty;
    public string Protein {get; set;} = string.Empty;
    public string Carbs {get; set;} = string.Empty;
    public string Fats {get; set;} = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

}