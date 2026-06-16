
using Grubs4Scrubs.Business;
using Grubs4Scrubs.DataAccess;
using Microsoft.IdentityModel.Tokens.Experimental;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.Services.AddAuthentication("Bearer")
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
                };
            });

// DEPENDENCY INJECTION: this is where I wire the layers together.
// "Scoped" means one instance per HTTP request.



builder.Services.AddScoped<IRecipeRepository, RecipeRepository>();
builder.Services.AddScoped<RecipeService, RecipeService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserService, UserService>();
builder.Services.AddScoped<IShoppingItemRepository, ShoppingItemRepository>();
builder.Services.AddScoped<ShoppingItemService, ShoppingItemService>();
builder.Services.AddScoped<IMealPlanEntryRepository, MealPlanEntryRepository>();
builder.Services.AddScoped<MealPlanEntryService, MealPlanEntryService>();
builder.Services.AddScoped<IFavouriteRepository, FavouriteRepository>();
builder.Services.AddScoped<FavouriteService, FavouriteService>();




var app = builder.Build();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
DbSeeder.Seed(connectionString);

app.UseCors("AllowReact");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
