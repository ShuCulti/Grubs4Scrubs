using Microsoft.Data.SqlClient;

namespace Grubs4Scrubs.Business;

public class DuplicateUserException: Exception
{
    public DuplicateUserException(string message, Exception innerEx)
    : base(message,innerEx) {}
}

public class DuplicateFavouriteException: Exception
{
    public DuplicateFavouriteException(string message, Exception innerEx)
    : base(message, innerEx) {}
}

public class RecipeForeignKeyNotFoundException: Exception
{
    public RecipeForeignKeyNotFoundException(string message, Exception innerEx)
    : base(message, innerEx) {}
}

public class FavouriteForeignKeyNotFoundException: Exception
{
    public FavouriteForeignKeyNotFoundException(string message, Exception innerEx)
    : base(message, innerEx)
    {
        
    }
}

public class ShoppingItemForeignKeyNotFoundException: Exception
{
    public ShoppingItemForeignKeyNotFoundException(string message, Exception innerEx)
    : base(message,innerEx)
    {
        
    }
}

public class MealPlanEntryNotFoundException: Exception
{
    public MealPlanEntryNotFoundException(string message, Exception innerEx)
    : base(message,innerEx)
    {
        
    }
}

public class ValidationException: ArgumentException
{
    public ValidationException(string message)
    : base(message)
    {
        
    }
}




