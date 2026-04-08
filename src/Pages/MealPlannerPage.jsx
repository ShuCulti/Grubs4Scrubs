import { useState } from "react"
import { Navbar } from "../Components/Navbar.jsx"
import { Plus } from "lucide-react"
import "./HomePage.css"
import "./Components.css"
import "./MealPlannerPage.css"


const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const mealTypes = ["Breakfast", "Lunch", "Dinner"]

const sampleMeals = {
    Mon: { Breakfast: { name: "Power Bowl", emoji: "🥣", cost: 2.50 }, Lunch: null, Dinner: { name: "Stir-Fry", emoji: "🍳", cost: 4.50 } },
    Tue: { Breakfast: null, Lunch: { name: "Exam Ramen", emoji: "🍜", cost: 2.00 }, Dinner: null },
    Wed: { Breakfast: { name: "Toast & Eggs", emoji: "🍞", cost: 1.80 }, Lunch: null, Dinner: { name: "Pasta Bake", emoji: "🍝", cost: 3.20 } },
    Thu: { Breakfast: null, Lunch: { name: "Wrap", emoji: "🌯", cost: 3.00 }, Dinner: null },
    Fri: { Breakfast: null, Lunch: null, Dinner: { name: "Pizza Night", emoji: "🍕", cost: 5.00 } },
    Sat: { Breakfast: { name: "Pancakes", emoji: "🥞", cost: 2.00 }, Lunch: null, Dinner: null },
    Sun: { Breakfast: null, Lunch: { name: "Sunday Roast", emoji: "🍗", cost: 6.00 }, Dinner: null },
}


export default function MealPlanner() {
    const [activeDay, setActiveDay] = useState("Mon")

    const totalCost = Object.values(sampleMeals).reduce((sum, dayMeals) => {
        return sum + Object.values(dayMeals).reduce((daySum, meal) => {
            return daySum + (meal ? meal.cost : 0)
        }, 0)
    }, 0)

    const totalMeals = Object.values(sampleMeals).reduce((count, dayMeals) => {
        return count + Object.values(dayMeals).filter(meal => meal !== null).length
    }, 0)

    return (
        <>
            <div className="Home">
                <Navbar />
                <MealPlannerPage
                    activeDay={activeDay}
                    setActiveDay={setActiveDay}
                    totalCost={totalCost}
                    totalMeals={totalMeals}
                />
            </div>
        </>
    )
}

function MealPlannerPage({ activeDay, setActiveDay, totalCost, totalMeals }) {
    return (
        <>
            <div className="MealPlanner">
                <MealPlannerHeader totalCost={totalCost} totalMeals={totalMeals} />
                <MealPlannerDayTabs activeDay={activeDay} setActiveDay={setActiveDay} />
                <MealPlannerGrid activeDay={activeDay} />
                <MealPlannerWeekOverview />
            </div>
        </>
    )
}

function MealPlannerHeader({ totalCost, totalMeals }) {
    return (
        <>
            <div className="MealPlanner-header">
                <div className="MealPlanner-header-text">
                    <h2 className="MealPlanner-header-title">Meal Planner</h2>
                    <p className="MealPlanner-header-desc">Plan your meals for the week ahead</p>
                </div>
                <div className="MealPlanner-header-stats">
                    <div className="MealPlanner-header-stat">
                        <span className="MealPlanner-header-stat-label">Weekly Total</span>
                        <span className="MealPlanner-header-stat-value">€{totalCost.toFixed(2)}</span>
                    </div>
                    <div className="MealPlanner-header-stat">
                        <span className="MealPlanner-header-stat-label">Meals Planned</span>
                        <span className="MealPlanner-header-stat-value">{totalMeals}/21</span>
                    </div>
                </div>
            </div>
        </>
    )
}

function MealPlannerDayTabs({ activeDay, setActiveDay }) {
    return (
        <>
            <div className="MealPlanner-daytabs">
                {days.map((day) => (
                    <button
                        key={day}
                        className={`MealPlanner-daytab ${activeDay === day ? "MealPlanner-daytab-active" : ""}`}
                        onClick={() => setActiveDay(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </>
    )
}

function MealPlannerGrid({ activeDay }) {
    const dayMeals = sampleMeals[activeDay]

    return (
        <>
            <div className="MealPlanner-grid">
                {mealTypes.map((mealType) => (
                    <MealPlannerSlot
                        key={mealType}
                        mealType={mealType}
                        meal={dayMeals[mealType]}
                    />
                ))}
            </div>
        </>
    )
}

function MealPlannerSlot({ mealType, meal }) {
    if (!meal) {
        return (
            <>
                <div className="MealPlanner-slot MealPlanner-slot-empty">
                    <span className="MealPlanner-slot-type">{mealType}</span>
                    <div className="MealPlanner-slot-add">
                        <span className="MealPlanner-slot-add-icon"><Plus size={24} /></span>
                        <p>Add {mealType}</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="MealPlanner-slot">
                <span className="MealPlanner-slot-type">{mealType}</span>
                <div className="MealPlanner-slot-content">
                    <span className="MealPlanner-slot-emoji">{meal.emoji}</span>
                    <h3 className="MealPlanner-slot-name">{meal.name}</h3>
                    <span className="MealPlanner-slot-cost">€{meal.cost.toFixed(2)}</span>
                </div>
            </div>
        </>
    )
}

function MealPlannerWeekOverview() {
    return (
        <>
        <div className="MealPlanner-overview">
            <h4 className="MealPlanner-overview-title">Week at a Glance</h4>
            <div className="MealPlanner-overview-grid">
                {days.map((day) => (
                <div key={day} className="MealPlanner-overview-day">
                <span className="MealPlanner-overview-day-label">{day}</span>
                <div className="MealPlanner-overview-day-meals">
                {mealTypes.map((mealType) => {
                    const meal = sampleMeals[day][mealType]
                    return (
                    <div
                        key={mealType}
                        className={`MealPlanner-overview-dot ${meal ? "MealPlanner-overview-dot-filled" : ""}`}
                        title={meal ? `${mealType}: ${meal.name}` : `${mealType}: empty`}
                    ></div>
                        )
                    })}
                </div>
                </div>
                ))}
            </div>
        </div>
        </>
    )
}
