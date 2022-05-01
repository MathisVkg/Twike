using MediatR;
using Microsoft.AspNetCore.Mvc;
using TwikeAPI.Controllers.Mediators;
using TwikeAPI.Controllers.Mediators.Settings;

namespace TwikeAPI.Controllers;

[Route("auth")]
public class UserController : ControllerBaseExtended
{
    public UserController(IMediator mediator)
    {
        Mediator = mediator;
    }
    
    [HttpPost("/user")]
    [ProducesResponseType(typeof(PostNewUser.UserDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> PostNewUser([FromBody] PostNewUser.Request request)
    {
        var response = await Mediator.Send(request);
        return Ok(response);
    }
    
    [HttpPost("/tweet")]
    [ProducesResponseType(typeof(PostUserTweet.PostDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> PostUserTweet([FromBody] PostUserTweet.Request request)
    {
        var response = await Mediator.Send(request);
        return Ok(response);
    }
}

