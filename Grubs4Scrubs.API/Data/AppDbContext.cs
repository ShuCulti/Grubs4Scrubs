using Microsoft.EntityFrameworkCore;
using Grubs4Scrubs.Models;

namespace Grubs4Scrubs.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Recipe> Recipes {get; set;}
    

}