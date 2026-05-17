namespace Grubs4Scrubs.Domain;

public class ShoppingItem
{
    public int UserId { get; set; }
    public int Id {get; set;}
    public string Name {get; set;} = string.Empty;
    public string Quantity { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public bool IsChecked {get; set;}

}