import { useState } from "react"
import { Navbar } from "../Components/Navbar.jsx"
import "./HomePage.css"
import "./Components.css"
import "./RecipesPage.css"

const recipes = [
    {
        id: 1,
        emoji: "🥗",
        name: "University Power Bowl",
        category: "Lunch",
        tags: ["LUNCH", "MEDITERRANEAN"],
        time: "15 min",
        cost: "€3.50",
        servings: "1 serving",
    },
    {
        id: 2,
        emoji: "🍜",
        name: "Midnight Exam Ramen",
        category: "Dinner",
        tags: ["DINNER", "ASIAN FUSION"],
        time: "10 min",
        cost: "€2.20",
        servings: "1 serving",
    },
    {
        id: 3,
        emoji: "🥞",
        name: "Sunday Prep Pancakes",
        category: "Breakfast",
        tags: ["BREAKFAST", "CLASSIC"],
        time: "25 min",
        cost: "€1.80",
        servings: "4 servings",
    },
    {
        id: 4,
        emoji: "🍝",
        name: "Budget Batch Pasta",
        category: "Lunch",
        tags: ["LUNCH", "ITALIAN"],
        time: "20 min",
        cost: "€4.10",
        servings: "3 servings",
    },
    
]

const filters = ["All", "Breakfast", "Lunch", "Dinner"]

export default function Recipes() {
    const [activeFilter, setActiveFilter] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredRecipes = recipes.filter((recipe) => {
        const matchesFilter = activeFilter === "All" || recipe.category === activeFilter
        const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    return (
        <>
            <div className="Home">
                <Navbar />

                <div className="recipes-page">
                    <h1 className="recipes-title">What's on the menu, scrub?</h1>

                    <div className="recipes-controls">
                        <div className="recipes-filters">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    className={`filter-btn ${activeFilter === filter ? "filter-active" : ""}`}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        <div className="recipes-actions">
                            <input
                                type="text"
                                className="recipes-search"
                                placeholder="Search recipes..."
                                value={searchQuery.trimStart()}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="add-recipe-btn">Add recipe</button>
                        </div>
                    </div>

                    <div className="recipes-grid">
                        {filteredRecipes.map((recipe) => (
                            <div key={recipe.id} className="recipe-card">
                                <div className="recipe-card-image">
                                    <span className="recipe-emoji">{recipe.emoji}</span>
                                </div>
                                <div className="recipe-card-body">
                                    <div className="recipe-tags">
                                        {recipe.tags.map((tag) => (
                                            <span key={tag} className="recipe-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="recipe-name">{recipe.name}</h3>
                                    <div className="recipe-meta">
                                        <span>🕐 {recipe.time}</span>
                                        <span>💰 {recipe.cost}</span>
                                        <span>🍽️ {recipe.servings}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="recipe-card recipe-card-add">
                            <div className="recipe-add-content">
                                <span className="recipe-add-icon">+</span>
                                <p>Add New Recipe</p>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="recipes-footer">
                    <div className="footer-top">
                        <div className="footer-brand">Grubs4Scrubs</div>
                        <div className="footer-links">
                            <a href="#">Features</a>
                            <a href="#">Pricing</a>
                            <a href="#">About</a>
                        </div>
                        <div className="footer-links">
                            <a href="#">Privacy</a>
                            <a href="#">Terms</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        © 2024 Grubs4Scrubs. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    )
}


