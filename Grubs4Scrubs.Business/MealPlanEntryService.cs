

namespace Grubs4Scrubs.Business;

public class MealPlanEntryService: IMealPlanEntryService
{
    private readonly IMealPlanEntryRepository _mealPlanEntryRepository;
    public MealPlanEntryService(IMealPlanEntryRepository mealPlanEntryRepository)
    {
        _mealPlanEntryRepository = mealPlanEntryRepository;
    }

    public List<MealPlanEntry> GetAllMealPlanEntries()
    {
        return _mealPlanEntryRepository.GetAll();
    }

    public MealPlanEntry? GetMealPlanEntryById(int id)
    {
        return _mealPlanEntryRepository.GetById(id);
    }

    public void CreateMealPlanEntry(MealPlanEntry mealPlanEntry)
    {
        if (mealPlanEntry.Servings == 0)
        {
            throw new ArgumentException("Servings cannot be Empty");
        }

        if (mealPlanEntry.MealType == null)
        {
            throw new ArgumentException("MealType can't be null");
        }


        _mealPlanEntryRepository.Create(mealPlanEntry);
    }

    public void UpdateMealPlanEntry(MealPlanEntry mealPlanEntry)
    {
        _mealPlanEntryRepository.Update(mealPlanEntry);
    }

    public void DeleteMealPlanEntry(int id)
    {
        _mealPlanEntryRepository.Delete(id);
    }

}