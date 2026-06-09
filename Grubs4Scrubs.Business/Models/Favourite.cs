namespace Grubs4Scrubs.Business;

public class Favourite
{
    public int Id { get; private set; }
    public int UserId { get; private set; }
    public int RecipeId { get; private set; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    
    public Favourite(int Id, int UserId, int RecipeId, DateTime CreatedAt)
    {
        Id = this.Id;
        UserId = this.UserId;
        RecipeId = this.RecipeId;
        CreatedAt = this.CreatedAt;
    }

}