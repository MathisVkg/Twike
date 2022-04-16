namespace TwikeAPI.Models;

public class Reaction
{
    public int Id { get; set; }
    public int Comment { get; set; }
    public int Repost { get; set; }
    public int Like { get; set; }
    
    public int PostId { get; set; }
    public Post Post { get; set; }
}