import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Navbar } from "../Components/Navbar.jsx"
import "./HomePage.css"
import "./Components.css"
import "./RecipesPage.css"
import { G4Sfooter } from "../Components/Footer.jsx"
import api from "../services/recipeservice.js"


const filters = ["All", "Breakfast", "Lunch", "Dinner"]

export default function Recipes() {
    const navigate = useNavigate()

    const [recipes, setRecipes] = useState([]);

    useEffect(()=> {
        api.get("/Recipe")
        .then(res=> setRecipes(res.data))
        .catch(err => console.error("Failed to fetch recipes", err))
    }, [])

    const [activeFilter, setActiveFilter] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredRecipes = recipes.filter((recipe) => {
        const matchesFilter = activeFilter === "All" || recipe.category === activeFilter
        const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    return (
        <>
            <div className="recipesPage">
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
                            <div key={recipe.id} className="recipe-card" onClick={() => navigate(`/recipes/${recipe.id}`)}>
                                <div className="recipe-card-image">
                                    <span className="recipe-emoji">{recipe.emoji}</span>
                                </div>
                                <div className="recipe-card-body">
                                    <div className="recipe-tags">
                                        {recipe.tag.split(",").map((tag) => (
                                            <span key={tag} className="recipe-tag">{tag.trim()}</span>
                                        ))}
                                    </div>
                                    <h3 className="recipe-name">{recipe.title}</h3>
                                    <div className="recipe-meta">
                                        <span>🕐 {recipe.cookTime}</span>
                                        <span>💰 {recipe.estimatedBudget}</span>
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

                <G4Sfooter/>
            </div>
        </>
    )
}


