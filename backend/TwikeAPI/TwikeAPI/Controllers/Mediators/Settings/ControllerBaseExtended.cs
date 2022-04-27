using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace TwikeAPI.Controllers.Mediators.Settings;

[ApiController]
[Produces("application/json")]
public abstract class ControllerBaseExtended : ControllerBase
{
    protected IMediator Mediator { get; init; }
}