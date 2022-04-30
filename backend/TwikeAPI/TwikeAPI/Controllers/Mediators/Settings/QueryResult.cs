namespace TwikeAPI.Controllers.Mediators.Settings;

public class QueryResult<T> : BaseResponse
{
    public List<T> Items { get; set; } = new();

    public int TotalItems { get; set; }
}