using Grubs4Scrubs.Business;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Grubs4Scrubs.API;

public class GlobalExceptionHandler: IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext context, Exception ex, CancellationToken token)
    {
        var (status, title) = ex switch
        {
            DuplicateUserException => (StatusCodes.Status409Conflict, ex.Message),
            DuplicateFavouriteException => (StatusCodes.Status409Conflict, "Favourite already exists"),
            RecipeForeignKeyNotFoundException => (StatusCodes.Status400BadRequest, "Referenced record doesn't exist"),
            FavouriteForeignKeyNotFoundException => (StatusCodes.Status400BadRequest, "Referenced record doesn't exist"),
            ShoppingItemForeignKeyNotFoundException => (StatusCodes.Status400BadRequest, "Referenced record doesn't exist"),
            KeyNotFoundException => (StatusCodes.Status404NotFound, "Not Found"),
            ArgumentException => (StatusCodes.Status400BadRequest, "Invalid Request"),
            _ => (StatusCodes.Status500InternalServerError, "Something Went Wrong")
        };
        context.Response.StatusCode = status;
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(new ProblemDetails {Status = status, Title = title}, token);
        return true;
    }
    
}