using Grubs4Scrubs.Domain;
using Grubs4Scrubs.DataAccess;
using System.Net;

namespace Grubs4Scrubs.Business;

public class ShoppingItemService : IShoppingItemService
{
    private readonly IShoppingItemRepository _shoppingItemRepository;

    public ShoppingItemService(IShoppingItemRepository shoppingItemRepository)
    {
        _shoppingItemRepository = shoppingItemRepository;
    }

    public List<ShoppingItem> GetAllShoppingItems()
    {
        return _shoppingItemRepository.GetAll();
    }

    public ShoppingItem? GetShoppingItemById(int id)
    {
        return _shoppingItemRepository.GetById(id);
    }

    public void CreateShoppingItem(ShoppingItem shoppingItem)
    {

        if (string.IsNullOrWhiteSpace(shoppingItem.Name))
        {
            throw new ArgumentException("ShoppingItem name cannot be empty");
        }

        _shoppingItemRepository.Create(shoppingItem);
    }

    public void UpdateShoppingItem(ShoppingItem shoppingItem)
    {
        var existing = _shoppingItemRepository.GetById(shoppingItem.Id);

        if (existing == null)
        {
            throw new KeyNotFoundException("Couldn't find ShoppingItem to Update it");
        }

        _shoppingItemRepository.Update(shoppingItem);
    }

    public void DeleteShoppingItem(int id)
    {
        var existing = _shoppingItemRepository.GetById(id);

        if (existing == null)
        {
            throw new KeyNotFoundException("Couldn't Delete ShoppingItem");
        }

        _shoppingItemRepository.Delete(id);
    }
}