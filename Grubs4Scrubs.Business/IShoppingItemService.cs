using Grubs4Scrubs.Domain;
using Grubs4Scrubs.DataAccess;

namespace Grubs4Scrubs.Business;

public interface IShoppingItemService
{
    public List<ShoppingItem>GetAllShoppingItems();
    public ShoppingItem? GetShoppingItemById(int id);
    public void CreateShoppingItem(ShoppingItem shoppingItem);
    public void UpdateShoppingItem(ShoppingItem shoppingItem);
    public void DeleteShoppingItem(int id);
}