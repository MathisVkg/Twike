using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using TwikeAPI.Common.Mappings;
using AutoMapper;
using TwikeAPI.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TwikeAPI.Controllers.Mediators.Settings;

namespace TwikeAPI.Controllers.Mediators.Auth.Queries;

[ApiController]
[Route("authentification")]
[Produces("application/json")]
public class GetUserToken : ControllerBase
{
    private readonly TwikeDbContext _context;
    private readonly IMapper _mapper;
        
    public GetUserToken(TwikeDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet("token/{accountName}/{password}")]
    [ProducesResponseType(typeof(IActionResult), 201)]
    public async Task<IActionResult> GetUserConnect(string accountName, string password)
    {
        // var queryResult = _context.Users.
        //     Where(uc => uc.AccountName == accountName && uc.Password == password);
        var queryResult = _context.Users.
            FirstOrDefault(uc => uc.Password == GetHash(password) && uc.AccountName == accountName);

        if (queryResult == null)
        {
            return BadRequest(new 
            {
                success = false,
                response = "bad response"
            });
        }
        return Ok(new
        {
            success = true,
            Response = new
            {
                accountName = queryResult.AccountName,
                pseudo = queryResult.Pseudo,
                email = queryResult.Email,
                authtoken = queryResult.Authtoken
            }
        });
    }
    
    private static string GetHash(string password)
    {
        var passHash = KeyDerivation.Pbkdf2(  
            password: password,  
            salt: Encoding.UTF8.GetBytes(password),  
            prf: KeyDerivationPrf.HMACSHA512,  
            iterationCount: 10000,  
            numBytesRequested: 256 / 8);
        return Convert.ToBase64String(passHash);
    }
    
    public class UserDto : BaseResponse, IMapFrom<User>
    {
        public string AccountName { get; set; }
    
        public string Pseudo { get; set; }
        
        public string Authtoken { get; set; }
    }
}