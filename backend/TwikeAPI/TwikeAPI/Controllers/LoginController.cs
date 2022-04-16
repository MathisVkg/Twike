using Microsoft.AspNetCore.Mvc;
using TwikeAPI.Common.Mappings;
using TwikeAPI.Models;

namespace TwikeAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    private readonly TwikeDbContext _context;

    public LoginController(TwikeDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public IActionResult GetUser()
    {
        List<User> users = _context.Users.ToList();
        return Ok(users);
    }
    
    [HttpPost]
    public async Task<ActionResult<UserDto>> PostUser(UserDto userDto)
    {
        var user = new User
        {
            Username = userDto.Username,
            Password = userDto.Password
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetUser", user);
    }
}

public class UserDto: IMapFrom<User>
{
    public string Username { get; set; }
    public string Password { get; set; }
}