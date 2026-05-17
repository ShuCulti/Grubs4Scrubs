namespace Grubs4Scrubs.Domain;

public interface IShoppingItemRepository
{
    List<ShoppingItem> GetAll();    
    ShoppingItem? GetById(int id);
    void Create(ShoppingItem ShoppingItem);
    void Update(ShoppingItem ShoppingItem);
    void Delete(int id);
}
