import { useState, useEffect } from "react"
import { useParams, useNavigate} from "react-router"
import { Navbar } from "../Components/Navbar.jsx"
import { G4Sfooter } from "../Components/Footer.jsx"
import { Clock, Wallet, Users, ShoppingBasket, CookingPot, Lightbulb, CalendarPlus, Check, Heart, Share2 } from "lucide-react"
import "./HomePage.css"
import "./Components.css"
import "./RecipeViewPage.css"
import api from "../services/recipeService.js"

export default function RecipeView() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState(null)

    useEffect(()=> {
        api.get(`/Recipe/${id}`)
        .then(res => setRecipe(res.data))
        .catch(err => console.error("Failed to fetch recipe", err))
    }, [id])
    if (!recipe) {
        return (
            <div>Loading...</div>
        )
    }

    if (recipe) {
        return (
            <>
                <div className="Home">
                    <Navbar />
                    <RecipeViewPage recipe ={recipe}/>
                    <div className="Home-footer-wrapper"></div>
                        <G4Sfooter/>
                </div>
            </>
        )
    }
}


function RecipeViewPage({ recipe }) {
        const ingredients = recipe.ingredients ? JSON.parse(recipe.ingredients) : null
        const instructions = recipe.instructions? JSON.parse(recipe.instructions) : null
        const nutrition = recipe.nutrition ? JSON.parse(recipe.nutrition) : null
        const tips = recipe.tips
    return (
        <>
            <div className="RecipeView">
                <RecipeViewHero recipe={recipe} />

                <div className="RecipeView-content">
                    <aside className="RecipeView-sidebar">
                        {ingredients && <RecipeViewIngredients ingredients={ingredients} />}
                        {nutrition && <RecipeViewNutrition nutrition={nutrition} />}
                    </aside>
                    <article className="RecipeView-main">
                        {instructions && <RecipeViewInstructions instructions={instructions} />}
                        {tips && <RecipeViewTip tips={tips} />}
                    </article>
                </div>
            </div>
        </>
    )
}




function RecipeViewHero({ recipe}) {
    const tags = recipe.tag.split(",")

    return (
        <>
            <section className="RecipeView-hero">
                {recipe.imageUrl ? (
                    <img className="RecipeView-hero-img" src={recipe.imageUrl} alt={recipe.title} />
                ) : (
                    <div className="RecipeView-hero-emoji-bg">
                        <span className="RecipeView-hero-emoji">No Image</span>
                    </div>
                )}
                <div className="RecipeView-hero-overlay"></div>

                <div className="RecipeView-hero-actions">
                    <button className="RecipeView-hero-action-btn"><Heart size={18} /></button>
                    <button className="RecipeView-hero-action-btn"><Share2 size={18} /></button>
                </div>

                <div className="RecipeView-hero-content">
                    <div className="RecipeView-hero-tags">
                        {tags.map((tag) => (
                            <span key={tag} className="RecipeView-hero-tag">{tag.trim()}</span>
                        ))}
                    </div>
                    <h1 className="RecipeView-hero-title">{recipe.title}</h1>

                    <div className="RecipeView-hero-meta">
                        <div className="RecipeView-hero-meta-item">
                            <Clock className="RecipeView-hero-meta-icon RecipeView-hero-meta-icon-primary" size={20} />
                            <div>
                                <p className="RecipeView-hero-meta-label">Prep Time</p>
                                <p className="RecipeView-hero-meta-value">{recipe.prepTime} min</p>
                            </div>
                        </div>
                        <div className="RecipeView-hero-meta-item">
                            <Wallet className="RecipeView-hero-meta-icon RecipeView-hero-meta-icon-secondary" size={20} />
                            <div>
                                <p className="RecipeView-hero-meta-label">Cost</p>
                                <p className="RecipeView-hero-meta-value">€{recipe.estimatedBudget.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="RecipeView-hero-meta-item">
                            <Users className="RecipeView-hero-meta-icon RecipeView-hero-meta-icon-tertiary" size={20} />
                            <div>
                                <p className="RecipeView-hero-meta-label">Servings</p>
                                <p className="RecipeView-hero-meta-value">{recipe.servings} serving{recipe.servings > 1 ? "s" : ""}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="RecipeView-hero-cta">
                    <button className="RecipeView-hero-cta-btn">
                        <CalendarPlus size={18} />
                        Add to Meal Planner
                    </button>
                </div>
            </section>
        </>
    )
}

function RecipeViewIngredients({ ingredients }) {
    const [checked, setChecked] = useState([])

    function toggleIngredient(index) {
        setChecked((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        )
    }

    return (
        <>
            <div className="RecipeView-ingredients">
                <h2 className="RecipeView-ingredients-title">
                    <ShoppingBasket className="RecipeView-ingredients-title-icon" size={22} />
                    Ingredients
                </h2>
                <ul className="RecipeView-ingredients-list">
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className="RecipeView-ingredients-item" onClick={() => toggleIngredient(index)}>
                            <div className={`RecipeView-ingredients-checkbox ${checked.includes(index) ? "RecipeView-ingredients-checkbox-done" : ""}`}>
                                {checked.includes(index) && <Check size={14} />}
                            </div>
                            <span className={`RecipeView-ingredients-name ${checked.includes(index) ? "RecipeView-ingredients-name-done" : ""}`}>{ingredient}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

function RecipeViewNutrition({ nutrition }) {
    const nutritionItems = [
        { label: "Calories", value: nutrition.calories },
        { label: "Protein", value: nutrition.protein },
        { label: "Fats", value: nutrition.fats },
        { label: "Carbs", value: nutrition.carbs },
    ]

    return (
        <>
            <div className="RecipeView-nutrition">
                <h3 className="RecipeView-nutrition-title">Nutritional Info</h3>
                <div className="RecipeView-nutrition-grid">
                    {nutritionItems.map((item) => (
                        <div key={item.label} className="RecipeView-nutrition-item">
                            <p className="RecipeView-nutrition-label">{item.label}</p>
                            <p className="RecipeView-nutrition-value">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

function RecipeViewInstructions({ instructions }) {
    return (
        <>
            <div className="RecipeView-instructions">
                <h2 className="RecipeView-instructions-title">
                    <CookingPot className="RecipeView-instructions-title-icon" size={22} />
                    Instructions
                </h2>
                <div className="RecipeView-instructions-steps">
                    {instructions.map((step, index) => (
                        <div key={index} className="RecipeView-step">
                            <div className="RecipeView-step-number">
                                {String(index + 1).padStart(2, "0")}
                            </div>
                            <div className="RecipeView-step-content">
                                <h3 className="RecipeView-step-title">{step.title}</h3>
                                <p className="RecipeView-step-desc">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

function RecipeViewTip({ tip }) {
    return (
        <>
            <div className="RecipeView-tip">
                <div className="RecipeView-tip-glow"></div>
                <div className="RecipeView-tip-content">
                    <Lightbulb className="RecipeView-tip-icon" size={22} />
                    <div>
                        <h4 className="RecipeView-tip-title">Scholar's Tip</h4>
                        <p className="RecipeView-tip-desc">{tip}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
