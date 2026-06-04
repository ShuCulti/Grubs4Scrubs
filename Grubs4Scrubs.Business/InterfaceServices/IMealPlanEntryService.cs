
namespace Grubs4Scrubs.Business;

public interface IMealPlanEntryService
{
    List<MealPlanEntry> GetAllMealPlanEntries();
    MealPlanEntry? GetMealPlanEntryById(int id);
    void CreateMealPlanEntry(MealPlanEntry mealPlanEntry);
    void UpdateMealPlanEntry(MealPlanEntry mealPlanEntry);
    void DeleteMealPlanEntry(int id);
}