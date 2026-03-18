using Microsoft.EntityFrameworkCore;
using Grubs4Scrubs.API.Models;
using Grubs4Scrubs.API.Data;

namespace Grubs4Scrubs.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Recipe> Recipes {get; set;}
    

}