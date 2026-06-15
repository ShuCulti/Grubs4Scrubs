import { useState, useEffect } from "react"
import { useParams, useNavigate} from "react-router"
import { Navbar } from "../Components/Navbar.jsx"
import { G4Sfooter } from "../Components/Footer.jsx"
import { Clock, Wallet, Users, ShoppingBasket, ShoppingCart, CookingPot, Lightbulb, CalendarPlus, Check, Heart, Share2, Trash, Pencil} from "lucide-react"
import "./HomePage.css"
import "./Components.css"
import "./RecipeViewPage.css"
import "./RecipesPage.css"
import api from "../services/recipeService.js"

export default function RecipeView() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [recipe, setRecipe] = useState(null)
    const [user, setUser] = useState({
        id: "",
        email: "",
        passwordHash: "",
        googleId: "",

    })
    const [showEditModal, setShowEditModal] = useState(false)
    const [editRecipe, setEditRecipe] = useState(null)

    const [favourites, setFavourites] = useState({
        UserId: "",
        RecipeId: "",
    });

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
                    <RecipeViewPage recipe={recipe} onDelete={handleDelete} onEdit={handleStartEdit} 
                    onAddToShoppingList={handleAddToShoppingList} onAddFavourite = {handleAddFavourite}/>
                    {showEditModal && (
                        <RecipeEditModal
                            editRecipe={editRecipe}
                            setEditRecipe={setEditRecipe}
                            onSubmit={handleEditSubmit}
                            onClose={() => setShowEditModal(false)}
                        />
                    )}
                    <div className="Home-footer-wrapper"></div>
                        <G4Sfooter/>
                </div>
            </>
        )
    }

    function handleAddToShoppingList() {
        if (!recipe.ingredients) return
        const ingredients = JSON.parse(recipe.ingredients)
        const promises = ingredients.map(ingredient =>
            api.post("/ShoppingItem", {
                name: ingredient,
                quantity: "1",
                price: 0,
                isChecked: false,
            })
        )
        Promise.all(promises)
            .then(() => alert("Ingredients added to your shopping list!"))
            .catch(err => console.error("Failed to add to shopping list", err))
    }

    function handleDelete(){
        if(window.confirm('Are you sure you want to delete this recipe?')){
            api.delete(`/Recipe/${id}`)
            .then(()=> navigate("/recipes"))
            .catch(err => console.error("Failed to delete recipe", err))
        }
    }

        function handleAddFavourite(){
        api.post("/Favourite",
            {
                UserId: recipe.UserId,
                RecipeId: recipe.Id,
            }).then(()=>
                api.get("/Favourite"))
                .then(res => setFavourites(res.data))

            .catch(err => console.error("Couldn't add Favourite", err))
    }

    function handleStartEdit() {
        const ingredients = recipe.ingredients ? JSON.parse(recipe.ingredients) : []
        const instructions = recipe.instructions ? JSON.parse(recipe.instructions) : []

        setEditRecipe({
            title: recipe.title,
            description: recipe.description,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            servings: recipe.servings,
            tag: recipe.tag,
            imageUrl: recipe.imageUrl,
            estimatedBudget: recipe.estimatedBudget,
            category: recipe.category,
            ingredients: ingredients.join("\n"),
            instructions: instructions.map(s => `${s.title}: ${s.description}`).join("\n"),
            tips: recipe.tips,
            calories: recipe.calories,
            protein: recipe.protein,
            carbs: recipe.carbs,
            fats: recipe.fats,
        })
        setShowEditModal(true)
    }

    function handleEditSubmit(e) {
        e.preventDefault()
        api.put(`/Recipe/${id}`, {
            id: Number(id),
            title: editRecipe.title,
            description: editRecipe.description,
            prepTime: Number(editRecipe.prepTime) || 0,
            cookTime: Number(editRecipe.cookTime) || 0,
            servings: Number(editRecipe.servings) || 1,
            tag: editRecipe.tag,
            imageUrl: editRecipe.imageUrl,
            estimatedBudget: Number(editRecipe.estimatedBudget) || 0,
            category: editRecipe.category,
            ingredients: JSON.stringify(editRecipe.ingredients.split("\n").filter(i => i.trim() !== "")),
            instructions: JSON.stringify(editRecipe.instructions.split("\n").filter(i => i.trim() !== "").map(step => ({
                title: step.split(":")[0]?.trim() || "",
                description: step.split(":").slice(1).join(":").trim() || ""
            }))),
            tips: editRecipe.tips,
            calories: Number(editRecipe.calories) || 0,
            protein: Number(editRecipe.protein) || 0,
            carbs: Number(editRecipe.carbs) || 0,
            fats: Number(editRecipe.fats) || 0,
        })
            .then(() => {
                setShowEditModal(false)
                api.get(`/Recipe/${id}`).then(res => setRecipe(res.data))
            })
            .catch(err => console.error("Failed to update recipe", err))
    }
}

function RecipeViewPage({ recipe, onDelete, onEdit, onAddToShoppingList, onAddFavourite}) {
        const ingredients = recipe.ingredients ? JSON.parse(recipe.ingredients) : null
        const instructions = recipe.instructions? JSON.parse(recipe.instructions) : null
        const nutrition = recipe.nutrition ? JSON.parse(recipe.nutrition) : null
        const tips = recipe.tips

    return (
        <>
            <div className="RecipeView">
                <RecipeViewHero recipe={recipe} onDelete={onDelete} onEdit={onEdit} onAddToShoppingList={onAddToShoppingList} onAddFavourite = {onAddFavourite}/>

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




function RecipeViewHero({recipe, onDelete, onEdit, onAddToShoppingList, onAddFavourite}) {
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
                    <button className="RecipeView-hero-action-btn" onClick={onAddFavourite} ><Heart size={18} /></button>
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
                    <button className="RecipeView-hero-edit-btn" onClick={onEdit}><Pencil/></button>
                    <button className="RecipeView-hero-bin-btn" onClick={onDelete}><Trash/></button>
                    <button className="RecipeView-hero-cta-btn" onClick={onAddToShoppingList}>
                        <ShoppingCart size={18} />
                        Add to Shopping List
                    </button>
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

function RecipeEditModal({ editRecipe, setEditRecipe, onSubmit, onClose }) {
    return (
        <>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Edit Recipe</h2>
                    <form className="modal-form" onSubmit={onSubmit}>
                        <div className="modal-field">
                            <label className="modal-field-label">Title</label>
                            <input type="text" value={editRecipe.title} onChange={(e) => setEditRecipe({ ...editRecipe, title: e.target.value })} required />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Description</label>
                            <textarea value={editRecipe.description} onChange={(e) => setEditRecipe({ ...editRecipe, description: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Image URL</label>
                            <input type="text" value={editRecipe.imageUrl} onChange={(e) => setEditRecipe({ ...editRecipe, imageUrl: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Tags</label>
                            <input type="text" value={editRecipe.tag} onChange={(e) => setEditRecipe({ ...editRecipe, tag: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Category</label>
                            <input type="text" value={editRecipe.category} onChange={(e) => setEditRecipe({ ...editRecipe, category: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Prep Time</label>
                            <input type="number" value={editRecipe.prepTime} onChange={(e) => setEditRecipe({ ...editRecipe, prepTime: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Cook Time</label>
                            <input type="number" value={editRecipe.cookTime} onChange={(e) => setEditRecipe({ ...editRecipe, cookTime: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Servings</label>
                            <input type="number" value={editRecipe.servings} onChange={(e) => setEditRecipe({ ...editRecipe, servings: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Budget (€)</label>
                            <input type="number" step="0.01" value={editRecipe.estimatedBudget} onChange={(e) => setEditRecipe({ ...editRecipe, estimatedBudget: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Ingredients</label>
                            <textarea rows={5} value={editRecipe.ingredients} onChange={(e) => setEditRecipe({ ...editRecipe, ingredients: e.target.value })} placeholder="One ingredient per line" />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Instructions</label>
                            <textarea rows={5} value={editRecipe.instructions} onChange={(e) => setEditRecipe({ ...editRecipe, instructions: e.target.value })} placeholder="Step Title: Step description (one per line)" />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Tips</label>
                            <input type="text" value={editRecipe.tips} onChange={(e) => setEditRecipe({ ...editRecipe, tips: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Calories</label>
                            <input type="number" value={editRecipe.calories} onChange={(e) => setEditRecipe({ ...editRecipe, calories: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Protein</label>
                            <input type="number" value={editRecipe.protein} onChange={(e) => setEditRecipe({ ...editRecipe, protein: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Carbs</label>
                            <input type="number" value={editRecipe.carbs} onChange={(e) => setEditRecipe({ ...editRecipe, carbs: e.target.value })} />
                        </div>
                        <div className="modal-field">
                            <label className="modal-field-label">Fats</label>
                            <input type="number" value={editRecipe.fats} onChange={(e) => setEditRecipe({ ...editRecipe, fats: e.target.value })} />
                        </div>
                        <div className="modal-buttons">
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
