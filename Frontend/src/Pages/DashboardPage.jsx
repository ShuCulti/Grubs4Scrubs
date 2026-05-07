import { useState } from "react"
import { Navbar } from "../Components/Navbar.jsx"
import { G4Sfooter } from "../Components/Footer.jsx"
import { Wallet, Bookmark, Calendar, ShoppingCart, ChevronLeft, ChevronRight, Plus, Lightbulb, Check } from "lucide-react"
import "./HomePage.css"
import "./Components.css"
import "./DashboardPage.css"


const mealPlanData = [
    { day: "MON", mealType: "Breakfast", name: "Overnight Oats", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAobz8w4YFurV16OumiVkOri_aKbcGXGTj-wmU76fMOio9em0XKiaFBbvHdVqO6Lo7G5GuTrfAkDtZcIXDaOARn1B1-oRXOnwscEHdQWmOR-o9VAAOpghh0PVunBb1DIQvV7jkoD2oU3m-S3heKk1Lou0Pe473VxEdXUH5X-F8wByMibmtsAcMVPnUE3NlhZ5MNk8XTUTlamxUZG_cUOMDQWgF4mWnqT5IF0vx2LlNA7g7_bbcMg383t44J9Qqzl9qtVF3eMDcyzxi0" },
    { day: "TUE", mealType: "Lunch", name: "Spicy Tuna Wrap", img: null },
    { day: "WED", mealType: "Dinner", name: "Creamy Pesto Pasta", img: null },
    { day: "THU", mealType: "Breakfast", name: "Banana Pancakes", img: null },
    { day: "FRI", mealType: "Dinner", name: "Budget Stir Fry", img: null },
    { day: "SAT", mealType: null, name: null, img: null },
    { day: "SUN", mealType: null, name: null, img: null },
]

const shoppingData = {
    Produce: [
        { id: 1, name: "Baby Spinach (200g)", done: false },
        { id: 2, name: "Red Onion (2 large)", done: false },
        { id: 3, name: "Bananas (1 bunch)", done: true },
    ],
    Pantry: [
        { id: 4, name: "Whole Wheat Pasta", done: false },
        { id: 5, name: "Oat Milk (1L)", done: false },
    ]
}


export default function Dashboard() {
    return (
        <>
            <div className="Home">
                <Navbar />
                <DashboardPage />
                <div className="Home-footer-wrapper">
                    <G4Sfooter />
                </div>
            </div>
        </>
    )
}

function DashboardPage() {
    return (
        <>
            <div className="Dashboard">
                <DashboardHeader />
                <DashboardMetrics />

                <div className="Dashboard-main">
                    <div className="Dashboard-main-left">
                        <DashboardMealPlan />
                        <DashboardFeatured />
                    </div>
                    <div className="Dashboard-main-right">
                        <DashboardShoppingList />
                    </div>
                </div>
            </div>
        </>
    )
}

function DashboardHeader() {
    return (
        <>
            <div className="Dashboard-header">
                <h1 className="Dashboard-header-title">Welcome back, Alex</h1>
                <p className="Dashboard-header-desc">Here's your week at a glance</p>
            </div>
        </>
    )
}

function DashboardMetrics() {
    const metrics = [
        { id: 1, label: "Weekly Budget", value: "$42.50", sub: "/ $50 limit", Icon: Wallet, accent: "primary" },
        { id: 2, label: "Saved Recipes", value: "24", sub: null, Icon: Bookmark, accent: "secondary" },
        { id: 3, label: "Meals Planned", value: "5/7", sub: "days set", Icon: Calendar, accent: "tertiary" },
        { id: 4, label: "Shopping Items", value: "18", sub: "remaining", Icon: ShoppingCart, accent: "primary" },
    ]

    return (
        <>
            <div className="Dashboard-metrics">
                {metrics.map((metric) => (
                    <div key={metric.id} className={`Dashboard-metric-card ${metric.id === 1 ? "Dashboard-metric-card-highlight" : ""}`}>
                        <div className="Dashboard-metric-top">
                            <span className="Dashboard-metric-label">{metric.label}</span>
                            <metric.Icon className={`Dashboard-metric-icon Dashboard-metric-icon-${metric.accent}`} size={20} />
                        </div>
                        <div className="Dashboard-metric-value">
                            {metric.value}
                            {metric.sub && <span className="Dashboard-metric-sub">{metric.sub}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

function DashboardMealPlan() {
    return (
        <>
            <div className="Dashboard-mealplan">
                <div className="Dashboard-mealplan-header">
                    <h2 className="Dashboard-mealplan-title">Weekly Meal Plan</h2>
                    <div className="Dashboard-mealplan-nav">
                        <button className="Dashboard-mealplan-nav-btn"><ChevronLeft size={16} /></button>
                        <button className="Dashboard-mealplan-nav-btn"><ChevronRight size={16} /></button>
                    </div>
                </div>

                <div className="Dashboard-mealplan-grid">
                    {mealPlanData.map((day) => (
                        <DashboardDayColumn key={day.day} day={day} />
                    ))}
                </div>
            </div>
        </>
    )
}

function DashboardDayColumn({ day }) {
    if (!day.mealType) {
        return (
            <>
                <div className="Dashboard-day">
                    <span className="Dashboard-day-label">{day.day}</span>
                    <div className="Dashboard-day-card Dashboard-day-card-empty">
                        <Plus className="Dashboard-day-add-icon" size={20} />
                    </div>
                </div>
            </>
        )
    }

    const accentClass =
        day.mealType === "Breakfast" ? "Dashboard-day-card-breakfast" :
        day.mealType === "Lunch" ? "Dashboard-day-card-lunch" :
        "Dashboard-day-card-dinner"

    return (
        <>
            <div className="Dashboard-day">
                <span className="Dashboard-day-label">{day.day}</span>
                <div className={`Dashboard-day-card ${accentClass}`}>
                    <div className="Dashboard-day-card-content">
                        <span className={`Dashboard-day-tag Dashboard-day-tag-${day.mealType.toLowerCase()}`}>{day.mealType}</span>
                        <h4 className="Dashboard-day-name">{day.name}</h4>
                    </div>
                    {day.img && (
                        <div className="Dashboard-day-img-container">
                            <img className="Dashboard-day-img" src={day.img} alt={day.name} />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

function DashboardFeatured() {
    return (
        <>
            <div className="Dashboard-featured">
                <div className="Dashboard-featured-pick">
                    <div className="Dashboard-featured-pick-text">
                        <span className="Dashboard-featured-pick-badge">Student Pick</span>
                        <h3 className="Dashboard-featured-pick-title">Cheap Eats: $2 Chili</h3>
                        <p className="Dashboard-featured-pick-desc">Batch cook 5 meals for under ten dollars this weekend.</p>
                        <button className="Dashboard-featured-pick-btn">Get Recipe</button>
                    </div>
                    <div className="Dashboard-featured-pick-img-container">
                        <img className="Dashboard-featured-pick-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUB5tfLDpbCjxQc4bvQm7qk5jDmaDrM8hFeKnqiM3ARhXBezXvrER1kOrhQfSGpV5dFp1YIG4JwO_pgNqMt--6CgWlisYy0uVS-VdDx2l_pVVhjzKAK-EZ0NIcrJFbqfTr65S_q8_DYqBr2Sq0FecbG7DuMQ9o38gkMsgRRIWvIDnsjHxYSQhwQ7zh9PZ74WuAEKhqI8-gum1rWxh88UEZIJh_3OWwWP5Fk8KYyJU3sR-gqFxfX7BMPDVbGOmQrZcHEM1cqz_HKYpC" alt="A bowl of hot spicy chili" />
                    </div>
                </div>

                <div className="Dashboard-featured-tip">
                    <div className="Dashboard-featured-tip-icon-box">
                        <Lightbulb className="Dashboard-featured-tip-icon" size={28} />
                    </div>
                    <h3 className="Dashboard-featured-tip-title">Did you know?</h3>
                    <p className="Dashboard-featured-tip-desc">Planning 5 days a week saves the average student $120 a month.</p>
                </div>
            </div>
        </>
    )
}

function DashboardShoppingList() {
    const [items, setItems] = useState(shoppingData)

    function toggleItem(category, id) {
        setItems((prev) => ({
            ...prev,
            [category]: prev[category].map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        }))
    }

    return (
        <>
            <div className="Dashboard-shopping">
                <div className="Dashboard-shopping-header">
                    <h2 className="Dashboard-shopping-title">Shopping List</h2>
                    <a href="/shopping-list" className="Dashboard-shopping-link">View full list</a>
                </div>

                <div className="Dashboard-shopping-sections">
                    {Object.entries(items).map(([category, categoryItems]) => (
                        <div key={category} className="Dashboard-shopping-section">
                            <h4 className="Dashboard-shopping-section-label">{category}</h4>
                            <ul className="Dashboard-shopping-list">
                                {categoryItems.map((item) => (
                                    <li key={item.id} className="Dashboard-shopping-item" onClick={() => toggleItem(category, item.id)}>
                                        <div className={`Dashboard-shopping-checkbox ${item.done ? "Dashboard-shopping-checkbox-done" : ""}`}>
                                            {item.done && <Check size={14} />}
                                        </div>
                                        <span className={`Dashboard-shopping-item-name ${item.done ? "Dashboard-shopping-item-done" : ""}`}>{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="Dashboard-shopping-total">
                    <div className="Dashboard-shopping-total-box">
                        <div className="Dashboard-shopping-total-header">
                            <span className="Dashboard-shopping-total-label">Estimated Total</span>
                            <span className="Dashboard-shopping-total-value">$18.45</span>
                        </div>
                        <div className="Dashboard-shopping-progress">
                            <div className="Dashboard-shopping-progress-fill"></div>
                        </div>
                        <p className="Dashboard-shopping-total-note">Based on local supermarket average prices</p>
                    </div>
                </div>
            </div>
        </>
    )
}
