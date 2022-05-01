namespace TwikeAPI.Models;

public class ReactionComment
{
    public int Id { get; set; }
    
    public string Content { get; set; }
    
    public string Pseudo { get; set; }
    
    public string AccountName { get; set; }
    
    public DateTime? Date { get; set; }
    
    public int Time { get; set; }
    
    public int PostId { get; set; }
}