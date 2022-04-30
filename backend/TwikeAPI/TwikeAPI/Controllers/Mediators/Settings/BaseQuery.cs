namespace TwikeAPI.Controllers.Mediators.Settings;
public abstract class BaseQuery
{
    public int Page { get; set; } = 1;
    
    public int ItemsPerPage { get; set; } = 10;
}