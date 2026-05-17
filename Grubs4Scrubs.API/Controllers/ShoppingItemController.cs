using Grubs4Scrubs.Domain;
using Grubs4Scrubs.Business;
using Microsoft.AspNetCore.Mvc;

namespace Grubs4Scrubs.Controllers;

[ApiController]
[Route("api/[controller]")]

public class ShoppingItemController : ControllerBase
{
    private readonly IShoppingItemService _shoppingItemService;

    public ShoppingItemController(IShoppingItemService shoppingItemService)
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
         _shoppingItemService.CreateShoppingItem(shoppingItem);
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

