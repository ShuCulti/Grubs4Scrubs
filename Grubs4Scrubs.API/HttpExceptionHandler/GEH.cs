//This is My GlobalExceptionHandler but instead of the using switch arms(new syntax), I use the OG switch cases

using Grubs4Scrubs.Business;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

public class GEH: IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext context, Exception ex, CancellationToken token)
    {
        int status;
        string title;

        switch (ex)
        {
            case DuplicateUserException: 
                status = StatusCodes.Status409Conflict;
                title = "User Already Exists";
                break;
            case DuplicateFavouriteException:
                status = StatusCodes.Status409Conflict;
                title = "Favourite Already Exists";
                break;
            case RecipeForeignKeyNotFoundException:
                status = StatusCodes.Status404NotFound;
                title = "Recipe Not Found";
                break;
            case FavouriteForeignKeyNotFoundException:
                status = StatusCodes.Status404NotFound;
                title = "Referenced recipe not Found";
                break;
            case ShoppingItemForeignKeyNotFoundException:
                status = StatusCodes.Status404NotFound;
                title = "Shopping Item Not Found";
                break;
            case ValidationException:
                status = StatusCodes.Status500InternalServerError;
                title = ex.Message;
                break;
            case ArgumentException:
                status = StatusCodes.Status400BadRequest;
                title = string.IsNullOrWhiteSpace(ex.Message) ?  "Something Went Wrong" : ex.Message ;
                break;
            case KeyNotFoundException:
                status = StatusCodes.Status404NotFound;
                title = "Not Found";
                break;
            default: 
                status = StatusCodes.Status500InternalServerError;
                title = "Something Went Wrong";
                break;
        }

        context.Response.StatusCode = status;
        await context.Response.WriteAsJsonAsync(new ProblemDetails{Title = title, Status = status}, token);

        return true;
    }
}