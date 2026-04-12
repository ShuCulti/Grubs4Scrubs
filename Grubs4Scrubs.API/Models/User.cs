namespace Grubs4Scrubs.Users;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PaswordHash { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public int GoogleId  {get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}