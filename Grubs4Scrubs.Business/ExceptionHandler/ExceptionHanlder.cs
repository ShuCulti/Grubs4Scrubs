using Microsoft.Data.SqlClient;

namespace Grubs4Scrubs.Business;

public class DuplicateFavouriteException: Exception
{
    public DuplicateFavouriteException(string message, Exception innerEx)
    : base(message, innerEx) {}
}
