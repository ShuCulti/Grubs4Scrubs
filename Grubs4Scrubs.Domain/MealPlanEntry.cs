namespace Grubs4Scrubs.Domain;

public class MealPlanEntry
{
    public int Id { get; private set; }
    public int UserId { get; private set; } 
    public int RecipeId { get; private set; }
    public DateTime Date { get; private set; }
    public string MealType { get; private set; } = string.Empty;
    public int Servings { get; private set; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public MealPlanEntry(int id, int userId, int recipeId, DateTime date, string mealType, int servings, DateTime createdAt)
    {
        Id = id;
        UserId = userId;
        RecipeId = recipeId;
        Date = date;
        MealType = mealType;
        Servings = servings;
        CreatedAt = createdAt;
    }

    public MealPlanEntry(int userId, int recipeId, DateTime date, string mealType, int servings)
    {
        UserId = userId;
        RecipeId = recipeId;
        Date = date;
        MealType = mealType;
        Servings = servings;
    }
}