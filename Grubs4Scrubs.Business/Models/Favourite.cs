namespace Grubs4Scrubs.Business;

public class Favourite
{
    public int Id { get; private set; }
    public int UserId { get; private set; }
    public int RecipeId { get; private set; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    
    public Favourite(int id, int userId, int recipeId, DateTime createdAt)
    {
        Id = id;
        UserId = userId;
        RecipeId = recipeId;
        CreatedAt = createdAt;
    }

    public Favourite(int userId, int recipeId)
    {
        UserId = userId;
        RecipeId = recipeId;
    }

}
