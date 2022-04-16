using System.ComponentModel.DataAnnotations;

namespace TwikeAPI.Models;

public class Post
{
    public int Id { get; set; }
    public int UserId { get; set; }
    [MaxLength(280)]
    public string UserName { get; set; }
    [MaxLength(280)]
    public string Content { get; set; }
    public string Date { get; set; }
    public int Time { get; set; }
    
    
    public List<Reaction> Reactions { get; set; }
    public List<ReactionUser> ReactionUsers { get; set; }
}