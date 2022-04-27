namespace TwikeAPI.Models;

public class Reaction
{
    public int Id { get; set; }
    
    public int Like { get; set; }
    
    public int Comment { get; set; }
    
    public int Retweet { get; set; }
    
    public ReactionComment ReactionComment { get; set; }
}