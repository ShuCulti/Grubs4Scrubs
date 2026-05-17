import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { LucideEuro, LucideUsers2, LucideClock3, LucideEdit3} from "lucide-react"
import { Navbar } from "../Components/Navbar.jsx"
import "./HomePage.css"
import "./Components.css"
import "./RecipesPage.css"
import { G4Sfooter } from "../Components/Footer.jsx"
import api from "../services/recipeservice.js"


const filters = ["All", "Breakfast", "Lunch", "Dinner"]

export default function Recipes() {
    const navigate = useNavigate()
    const {id} = useParams()
    
    const [showModal, setShowModal] = useState(false)
    const [newRecipe, setNewRecipe] = useState({
        title:"",
        description:"",
        prepTime:"",
        cookTime:"",
        servings:"",
        tag:"",
        estimatedBudget:"",
        category:"Breakfast",
        instructions:"",
        ingredients: "",
        tips:"",
        calories: "",
        protein: "",
        fats: "",
        carbs: "",
        imageUrl:"",
    })
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

    {/*Modal for adding new recipe*/}
    function handleSubmit(e){
        e.preventDefault()
        api.post("/Recipe", {
            ...newRecipe,
            prepTime: Number(newRecipe.prepTime),
            cookTime: Number(newRecipe.cookTime),
            servings: Number(newRecipe.servings),
            estimatedBudget: Number(newRecipe.estimatedBudget),
            calories: Number(newRecipe.calories) || 0,
            protein: Number(newRecipe.protein) || 0,
            carbs: Number(newRecipe.carbs) || 0,
            fats: Number(newRecipe.fats) || 0,
            ingredients: JSON.stringify(newRecipe.ingredients.split("\n").filter(i => i.trim() !== "")),
            instructions: JSON.stringify(newRecipe.instructions.split("\n").filter(i => i.trim() !== "").map(step => ({ title: step.split(":")[0].trim(), description: step.split(":")[1]?.trim() || "" }))),            
            })
            .then(()=> {
                setShowModal(false)
                setNewRecipe({ title:"", description:"", prepTime: "", cookTime: "", servings: "", tag: "", estimatedBudget: "", category: "Breakfast", instructions: "", ingredients: "", tips: "", imageUrl: ""})
                api.get("/Recipe").then(res => setRecipes(res.data))
            })
            .catch(err => console.error("Failed to add recipe", err))
            /* I could have used parseInt but I want to allow for decimal inputs for budget and time, just in case */
    }

    function handleEdit(id){
        e.preventDefault()
            api.put('/Recipe')
        
    }
    

    function handleDelete(){
        e.preventDefault()
        if(window.confirm('Are you sure you want to delete this recipe?')){
            api.delete(`/Recipe/${id}`)
            .then(()=> {
                api.get("/Recipe")
                .then(res => setRecipes(res.data))
                .catch(err => console.error("Failed to fetch recipes", err))
            })
            .catch(err => console.error("Failed to delete recipe", err))
        }

    } 
    

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
                            <button className="add-recipe-btn" onClick={()=> setShowModal(true) && console.log("setShowModal = true")}>Add recipe</button>
                        </div>
                    </div>

                    <div className="recipes-grid">
                        {filteredRecipes.map((recipe) => (
                            <div key={recipe.id} className="recipe-card" onClick={() => navigate(`/recipes/${recipe.id}`)}>
                                <div className="recipe-card-image">
                                    <span className="recipe-emoji">{recipe.emoji}</span>
                                    {recipe.imageUrl ? (<img className="recipe-card-image-img" src={recipe.imageUrl} alt={recipe.title} />) : null}
                                </div>
                                <div className="recipe-card-body">
                                    <div className="recipe-tags">
                                        {recipe.tag.split(",").map((tag) => (
                                            <span key={tag} className="recipe-tag">{tag.trim()}</span>
                                        ))}
                                    </div>
                                    <h3 className="recipe-name">{recipe.title}</h3>
                                    <div>
                                        
                                    </div>
                                    <div className="recipe-meta">
                                        <span> <LucideClock3 color = "white" size={20}/> {recipe.cookTime}</span>
                                        <span> <LucideEuro color = "white" size={20}/>  {recipe.estimatedBudget}</span>
                                        <span><LucideUsers2 color={'white'}size={20}/>  {recipe.servings}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="recipe-card recipe-card-add" onClick ={() => setShowModal(true)}>
                            <div className="recipe-add-content">
                                <span className="recipe-add-icon">+</span>
                                <p>Add New Recipe</p>
                            </div>
                        </div>
                    </div>
                </div>

                <G4Sfooter/>
            </div>
            {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Add New Recipe</h2>

                    <form className="modal-form" onSubmit={handleSubmit}>
                        
                        <div className="modal-field">
                             <label className= "modal-field-label" htmlFor="">Title:</label>
                            <input type="text" placeholder="Title" value={newRecipe.title} onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})} required />
                        </div>

                        <div className="modal-field">
                             <label className="modal-field-label" htmlFor="">Description: </label>
                            <input placeholder="Description" value={newRecipe.description} onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})} required />
                        </div>

                        <div className="modal-field">
                             <label className="modal-field-label" htmlFor="">Instructions:</label>
                            <textarea placeholder="Instructions" value={newRecipe.instructions} onChange={(e) => setNewRecipe({...newRecipe, instructions: e.target.value})} required />

                        </div>
                        
                        <div className="modal-field">
                             <label className="modal-field-label" htmlFor="">Ingredients: </label>
                            <textarea placeholder="Ingredients" value={newRecipe.ingredients} onChange={(e) => setNewRecipe({...newRecipe, ingredients: e.target.value})} required />

                        </div>

                        <div className="modal-field">
                             <label className="modal-field-label" htmlFor="">Tags:</label>
                            <input type="text" placeholder="Tags (comma separated)" value={newRecipe.tag} onChange={(e) => setNewRecipe({...newRecipe, tag: e.target.value})} />
                        </div>
                        
                        <div className="modal-field">
                            <label className="modal-field-label">Category: </label>
                            <select value={newRecipe.category} onChange={(e) => setNewRecipe({...newRecipe, category: e.target.value})}>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                            </select>
                        </div>
                        
                        <div className="modal-field">
                             <label className="modal-field-label">PrepTime: </label>
                            <input type="number" placeholder="Prep Time (min)" value={newRecipe.prepTime} onChange={(e) => setNewRecipe({...newRecipe, prepTime: e.target.value})} required />
                        </div>
                        
                        <div className="modal-field">
                             <label className="modal-field-label">CookTime: </label>
                            <input type="number" placeholder="Cook Time (min)" value={newRecipe.cookTime} onChange={(e) => setNewRecipe({...newRecipe, cookTime: e.target.value})} required />
                        </div >
                        
                        <div className="modal-field">
                             <label className="modal-field-label">Servings: </label>
                            <input type="number" placeholder="Servings" value={newRecipe.servings} onChange={(e) => setNewRecipe({...newRecipe, servings: e.target.value})} required />
                        </div>
                        
                        <div  className="modal-field">
                             <label className="modal-field-label">Estimated Budget: </label>
                            <input type="number" step="0.01" placeholder="Estimated Budget (€)" value={newRecipe.estimatedBudget} onChange={(e) => setNewRecipe({...newRecipe, estimatedBudget: e.target.value})} required />
                        </div>

                        <div className="modal-field">
                             <label className="modal-field-label">Tips: </label>
                            <input type="text" placeholder="Tips" value={newRecipe.tips} onChange={(e) => setNewRecipe({...newRecipe, tips: e.target.value})} />
                        </div>
                        
                        <div className="modal-field">
                             <label className="modal-field-label">Image: </label>
                            <input type="file" accept="image/*" onChange={(e) => {
                                const file = e.target.files[0]
                                if (file) {
                                    setNewRecipe({...newRecipe, imageUrl: "/" + file.name})
                                }
                            }} />
                        </div>

                        <div className="modal-buttons">
                            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            <button type="submit">Create Recipe</button>
                        </div>

                    </form>

                </div>
            </div>
        )}
        </>
    )
}


