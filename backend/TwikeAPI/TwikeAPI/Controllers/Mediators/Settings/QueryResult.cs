using TwikeAPI.Models;

namespace TwikeAPI.Controllers.Mediators.Settings;

public class QueryResult<T> : BaseResponse
{
    public IQueryable<User> Items { get; set; }

    public int TotalItems { get; set; }
}