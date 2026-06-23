
using Grubs4Scrubs.Business;
using Microsoft.AspNetCore.Mvc;

namespace Grubs4Scrubs.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ShoppingItemController : ControllerBase
{
    private readonly ShoppingItemService _shoppingItemService;

    public ShoppingItemController(ShoppingItemService shoppingItemService)
    {
        _shoppingItemService = shoppingItemService;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var shoppingItems = _shoppingItemService.GetAllShoppingItems();
        return Ok(shoppingItems);
    }

    [HttpGet ("{id}")]

    public IActionResult GetById(int id)
    {
        var shoppingItem = _shoppingItemService.GetShoppingItemById(id);

        if (shoppingItem == null)
        {
            return NotFound();
        }

        return Ok(shoppingItem);
    }

    [HttpPost]

    public IActionResult Create(ShoppingItem shoppingItem)
    {
        try
        {
            _shoppingItemService.CreateShoppingItem(shoppingItem);
        }
        catch (ShoppingItemForeignKeyNotFoundException)
        {
            return NotFound("Referenced recipe's ingredient/Shopping Item not found");
        }
        return Created();
    }

    [HttpPut ("{id}")]
    
    public IActionResult Update(int id, ShoppingItem shoppingItem)
    {
        shoppingItem.Id = id;
        _shoppingItemService.UpdateShoppingItem(shoppingItem);
        return NoContent();
    }

    [HttpDelete ("{id}")]
    
    public IActionResult Delete(int id)
    {
        _shoppingItemService.DeleteShoppingItem(id);
        return NoContent();
    }
}

