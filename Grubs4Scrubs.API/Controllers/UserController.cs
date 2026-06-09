
using Grubs4Scrubs.Business;
using Microsoft.AspNetCore.Mvc;

namespace Grubs4Scrubs.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(IUserRepository userRepository)
    {
        _userService = new UserService(userRepository);
    }

    // GET api/user
    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _userService.GetAllUsers();
        return Ok(users);
    }

    // GET api/user/5
    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = _userService.GetUserById(id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    // POST api/user
    [HttpPost]
    public IActionResult Create(User user)
    {
        _userService.CreateUser(user);
        return Created();
    }

    // PUT api/user/5
    [HttpPut("{id}")]
    public IActionResult Update(int id, User user)
    {
        user.Id = id;
        _userService.UpdateUser(user);
        return NoContent();
    }

    // DELETE api/user/5
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _userService.DeleteUser(id);
        return NoContent();
    }
}
