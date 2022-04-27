using System.Net;
using Newtonsoft.Json;

namespace TwikeAPI.Controllers.Mediators.Settings;

public class BaseResponse
{
    [JsonIgnore] public HttpStatusCode StatusCode { get; init; } = HttpStatusCode.OK;

    [JsonIgnore] public string Messages { get; init; }
}