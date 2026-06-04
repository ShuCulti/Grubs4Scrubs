using Grubs4Scrubs.Business;

public interface IMealPlanEntryRepository
{
    List<MealPlanEntry> GetAll();
    List<MealPlanEntry> GetByUserIdAndDateRange(int UserId, DateTime start, DateTime end);
    MealPlanEntry? GetById(int id);
    void Create(MealPlanEntry mealPlanEntry);
    void Update(MealPlanEntry mealPlanEntry);
    void Delete(int id);
}