using Grubs4Scrubs.DataAccess;
using Grubs4Scrubs.Business;
using Grubs4Scrubs.Domain;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddOpenApi();
builder.Services.AddCors(policy =>
{
    policy.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

// DEPENDENCY INJECTION — this is where you wire the layers together.
// "Scoped" means one instance per HTTP request.
// When a controller asks for IRecipeService, .NET gives it a RecipeService.
// When RecipeService asks for IRecipeRepository, .NET gives it a RecipeRepository.
builder.Services.AddScoped<IRecipeRepository, RecipeRepository>();
builder.Services.AddScoped<IRecipeService, RecipeService>();

var app = builder.Build();

// Seed the database with starter recipes if empty
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
DbSeeder.Seed(connectionString);

app.UseCors("AllowReact");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
