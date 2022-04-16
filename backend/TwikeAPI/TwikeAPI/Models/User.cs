using System.ComponentModel.DataAnnotations;

namespace TwikeAPI.Models;

public class User
{
    public int Id { get; set; }
    [MaxLength(100)]
    public string Username { get; set; }
    [MaxLength(100)]
    public string Password { get; set; }
}