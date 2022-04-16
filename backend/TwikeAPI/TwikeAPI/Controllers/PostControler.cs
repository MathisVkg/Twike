using Microsoft.AspNetCore.Mvc;
using TwikeAPI.Common.Mappings;
using TwikeAPI.Models;

namespace TwikeAPI.Controllers;


[ApiController]
[Route("[controller]")]
public class PostDbController : ControllerBase
{
    private readonly TwikeDbContext _context;

    public PostDbController(TwikeDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public IActionResult GetPost()
    {
        List<Post> posts = _context.Posts.ToList();
        return Ok(posts);
    }
    
    [HttpPost]
    public async Task<ActionResult<PostDto>> PostTweet(PostDto postDto)
    {
        var post = new Post
        {
            UserId = postDto.UserId,
            UserName = postDto.UserName,
            Content = postDto.Content,
            Date = postDto.Date,
            Time = postDto.Time,
        };
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetPost", post);
    }
}

public class PostDto: IMapFrom<Post>
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string Content { get; set; }
    public string Date { get; set; }
    public int Time { get; set; }
}
