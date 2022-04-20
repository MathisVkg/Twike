using System.Text;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
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
    
    [HttpGet("userInfo")]
    public IActionResult GetUser(string user, string token)
    {
        List<User> users = _context.Users.ToList();
        var userFind = users.Find(find => find.Username == user && find.Authtoken == token);
        if (userFind == null)
        {
            return Ok(new {
                success = false,
                response = "user not found"
            });
        }
        return Ok(new
        {
            success = true,
            response = new {
                username = userFind.Username,
                authtoken = userFind.Authtoken,
                email = userFind.Email,
                id = userFind.Id
            }
        });
    }
    
    [HttpGet("userConnect")]
    public IActionResult GetUserById(string username, string password)
    {
        List<User> users = _context.Users.ToList();
        var passHash = getHash(password);
        var userFind = users.Find(find => find.Password == passHash && find.Username == username);
        if (userFind == null)
        {
            return Ok(new
            {
                success = false,
                response = "null"
            });
        }
        return Ok(new
        {
            success = true,
            response = new {
                authtoken = userFind.Authtoken
            }
        });
    }
    
    [HttpPost]
    public async Task<ActionResult<UserDto>> PostUser(UserDto userDto)
    {
        var user = new User
        {
            Username = userDto.Username,
            Email = userDto.Email,
            Password = getHash(userDto.Password),
            Authtoken = Guid.NewGuid().ToString()
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok("auth-token: " + user.Authtoken);
    }

    private static string getHash(string password)
    {
        var passHash = KeyDerivation.Pbkdf2(  
            password: password,  
            salt: Encoding.UTF8.GetBytes(password),  
            prf: KeyDerivationPrf.HMACSHA512,  
            iterationCount: 10000,  
            numBytesRequested: 256 / 8);
        return Convert.ToBase64String(passHash);
    }
    
}


public class UserDto: IMapFrom<User>
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}