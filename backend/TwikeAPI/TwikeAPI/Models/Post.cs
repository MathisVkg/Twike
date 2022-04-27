namespace TwikeAPI.Models;

public class Post
{
    public int Id { get; set; }
    
    public string Content { get; set; }
    
    public string Pseudo { get; set; }
    
    public string AccountName { get; set; }
    
    public DateTime? Date { get; set; }
    
    public Reaction Reaction { get; set; }
}