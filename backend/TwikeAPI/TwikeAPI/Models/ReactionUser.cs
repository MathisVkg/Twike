using System.ComponentModel.DataAnnotations;

namespace TwikeAPI.Models;

public class ReactionUser
{
    public int Id { get; set; }
    public int userId { get; set; }
    [MaxLength(280)]
    public string userName { get; set; }
    [MaxLength(280)]
    public string Content { get; set; }
    public string Date { get; set; }
    public int Time { get; set; }
    
    public int PostId { get; set; }
    public Post Post { get; set; }
}