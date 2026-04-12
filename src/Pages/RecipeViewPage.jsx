import { useState } from "react"
import { useParams, useNavigate } from "react-router"
import { Navbar } from "../Components/Navbar.jsx"
import { G4Sfooter } from "../Components/Footer.jsx"
import { Clock, Wallet, Users, ShoppingBasket, CookingPot, Lightbulb, CalendarPlus, Check, Heart, Share2 } from "lucide-react"
import "./HomePage.css"
import "./Components.css"
import "./RecipeViewPage.css"


const recipesData = [
    {
        id: 1,
        title: "Midnight Exam Ramen",
        description: "A steaming bowl of gourmet instant ramen with soft boiled egg and green onions. The ultimate late-night study fuel.",
        prepTime: 5,
        cookTime: 10,
        servings: 1,
        tag: "Dinner,Asian Fusion",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3gKe9-SDMs0zJ2LlVpaCWGZyus1YjLShreSaKVreDr8SjDGfEwdtGfTdyPQ2WgQCi8WBCRdzcG9z9uywQOyYW5nfcmzwgKc8tCnKO4Vl7GvA7MyOXdhtjq7svcMps6X1ioRW_74Gf3OiRPkJRitQF9sd8cLsMDrxxIaVkjw86SbIjpPmTpkRqf0BoV9bpNhQfBXc5aZjPISOcfoQvw9eDNZqrzaJbi2aVmKN1VjDOqp90k7bjwrjF7FMyJYxzEOPwYUmb4uPMTjON",
        emoji: "🍜",
        estimatedBudget: 2.20,
        category: "Dinner",
        ingredients: [
            "1 pack instant ramen",
            "1 fresh egg",
            "Chopped green onions",
            "Sriracha (to taste)",
            "1 tsp unsalted butter"
        ],
        instructions: [
            { title: "Boil the Base", desc: "Boil 500ml of water in a small pot. For extra flavor, you can use 400ml water and 100ml chicken stock if available." },
            { title: "Noodle Fusion", desc: "Add the instant noodles and the seasoning packet. Stir gently to break up the noodles. Let them cook for about 1 minute until they start to soften." },
            { title: "The Perfect Poach", desc: "Lower the heat. Carefully crack an egg into the center of the pot. Do not stir! Let it poach in the hot broth for exactly 2 minutes for a runny yolk." },
            { title: "Final Flourish", desc: "Pour the ramen into a bowl. Top with a generous amount of chopped green onions, a pat of butter, and a beautiful spiral of Sriracha." }
        ],
        nutrition: { calories: "480 kcal", protein: "14g", fats: "18g", carbs: "62g" },
        tip: "Add a slice of American cheese on top and let it melt into the broth for a creamy, restaurant-style finish on a student budget."
    },
    {
        id: 2,
        title: "University Power Bowl",
        description: "A hearty breakfast bowl packed with oats, fruits, and protein to fuel your morning lectures.",
        prepTime: 5,
        cookTime: 15,
        servings: 1,
        tag: "Breakfast,Healthy",
        imageUrl: "",
        emoji: "🥣",
        estimatedBudget: 3.50,
        category: "Breakfast",
        ingredients: [
            "1/2 cup rolled oats",
            "1 banana (sliced)",
            "1 tbsp peanut butter",
            "1 tbsp honey",
            "Handful of blueberries",
            "Splash of oat milk"
        ],
        instructions: [
            { title: "Cook the Oats", desc: "Cook rolled oats with water or milk according to packet directions. Aim for a thick, creamy consistency." },
            { title: "Build Your Bowl", desc: "Transfer oats to a bowl. Arrange sliced banana and blueberries on top in neat sections." },
            { title: "Add the Goods", desc: "Drizzle peanut butter and honey over the top. Add a splash of cold oat milk around the edges for contrast." }
        ],
        nutrition: { calories: "420 kcal", protein: "12g", fats: "14g", carbs: "65g" },
        tip: "Prep overnight oats the night before in a mason jar for a zero-effort morning."
    },
    {
        id: 3,
        title: "Finals Week Stir-Fry",
        description: "A quick and budget-friendly veggie stir-fry that's ready in under 20 minutes.",
        prepTime: 10,
        cookTime: 20,
        servings: 2,
        tag: "Dinner,Quick",
        imageUrl: "",
        emoji: "🍳",
        estimatedBudget: 4.50,
        category: "Dinner",
        ingredients: [
            "1 pack stir-fry noodles",
            "1 bell pepper (sliced)",
            "1 carrot (julienned)",
            "2 cloves garlic (minced)",
            "2 tbsp soy sauce",
            "1 tbsp sesame oil",
            "Handful of beansprouts"
        ],
        instructions: [
            { title: "Prep the Veg", desc: "Slice the bell pepper, julienne the carrot, and mince the garlic. Have everything ready before you start cooking." },
            { title: "Heat and Sear", desc: "Heat sesame oil in a wok or large pan over high heat. Add garlic and stir for 30 seconds until fragrant." },
            { title: "Stir-Fry", desc: "Add the vegetables and toss constantly for 3-4 minutes. They should be bright and still have a bite." },
            { title: "Noodle Up", desc: "Add the noodles and soy sauce. Toss everything together for 2 minutes. Top with beansprouts and serve immediately." }
        ],
        nutrition: { calories: "380 kcal", protein: "10g", fats: "12g", carbs: "58g" },
        tip: "Leftover stir-fry reheats great. Pack it for lunch tomorrow and save yourself another meal's budget."
    }
]


export default function RecipeView() {
    const { id } = useParams()
    const navigate = useNavigate()

    const recipe = recipesData.find((r) => r.id === Number(id))

    if (!recipe) {
        return (
            <>
                <div className="Home">
                    <Navbar />
                    <div className="RecipeView">
                        <h1 className="RecipeView-notfound-title">Recipe not found</h1>
                        <p className="RecipeView-notfound-desc">That recipe doesn't seem to exist.</p>
                        <button className="RecipeView-notfound-btn" onClick={() => navigate("/recipes")}>Back to Recipes</button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="Home">
                <Navbar />
                <RecipeViewPage recipe={recipe} />
                <div className="Home-footer-wrapper">
                    <G4Sfooter />
                </div>
            </div>
        </>
    )
}

function RecipeViewPage({ recipe }) {
    return (
        <>
            <div className="RecipeView">
                <RecipeViewHero recipe={recipe} />

                <div className="RecipeView-content">
                    <aside className="RecipeView-sidebar">
                        <RecipeViewIngredients ingredients={recipe.ingredients} />
                        <RecipeViewNutrition nutrition={recipe.nutrition} />
                    </aside>
                    <article className="RecipeView-main">
                        <RecipeViewInstructions instructions={recipe.instructions} />
                        <RecipeViewTip tip={recipe.tip} />
                    </article>
                </div>
            </div>
        </>
    )
}

function RecipeViewHero({ recipe }) {
    const tags = recipe.tag.split(",")

    return (
        <>
            <section className="RecipeView-hero">
                {recipe.imageUrl ? (
                    <img className="RecipeView-hero-img" src={recipe.imageUrl} alt={recipe.title} />
                ) : (
                    <div className="RecipeView-hero-emoji-bg">
                        <span className="RecipeView-hero-emoji">{recipe.emoji}</span>
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
                                <p className="RecipeView-step-desc">{step.desc}</p>
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
