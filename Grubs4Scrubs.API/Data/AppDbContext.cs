using Microsoft.EntityFrameworkCore;
using Grubs4Scrubs.API.Models;
using Grub4Scrubs.API.Data;

namespace Grub4Scrubs.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Recipe> Recipes {get; set;}
    

}