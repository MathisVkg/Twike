using Microsoft.EntityFrameworkCore;

namespace TwikeAPI.Models;

public class TwikeDbContext: DbContext
{
    public TwikeDbContext(DbContextOptions<TwikeDbContext> options) : base(options) {}
    
    public DbSet<Post> Posts { get; set; }
    public DbSet<Reaction> Reactions { get; set; }
    public DbSet<ReactionUser> ReactionUsers { get; set; }
    public DbSet<User> Users { get; set; }
}