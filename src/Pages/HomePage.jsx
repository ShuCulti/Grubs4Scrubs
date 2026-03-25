import "react"
import "./HomePage.css"
import "./Components.css"
import { useNavigate } from "react-router"
import {LayoutDashboardIcon, PizzaIcon, LucideShoppingCart, Calendar1Icon}from "lucide-react"
import {CalendarIcon,ShoppingBasketIcon,ForkKnifeIcon,} from "lucide-react"
import {Navbar} from "../Components/Navbar.jsx"
import Searchbar  from "../Components/Searchbar.jsx"

export default function Home(){
    return(
        <>
        <div className="Home">
            <div>
                <Navbar/>
                <HomeBoard/>
                
            </div>
        </div>
        </>
    )
}

function HomeBoard(){
    return(
        <>
        <div className="HomeBoard">
            <span className="HomeBoard-title">
                Eat Good and Save Good
            </span>
            <p className="HomeBoard-title-desc">
                Enjoy quality dishes and desserts at your budget and cooking level
                </p>
                <div>
                    <Searchbar/>
                </div>
                <HomeBoardDecor/>
                <Home3Sections/>
                <HomeFeatured/>
                <HomeCreateAccountTab/>
        </div>
        </>
    )
}

function HomeBoardDecor(){
    return(
        <>
            <div className="HomeBoard-food">
                <img src="Adobe Express - file.png" alt="delicious burger" />
            </div>
            <div className="HomeBoard-food-holder">
                <img src="burger-holder-hand.png" alt="hand" />
            </div>
        </>
    )
}

function Home3Sections(){
    return(
        <>
        <div>
            <span className="Home3Sections-text">How It Works</span>
        </div>
        <div>
            <hr className="Home3Sections-line"/>
        </div>
            <Home3SectionsDiv/>
        </>
    )
}


function Home3SectionsDiv(){
    const Home3SectionsDivs = [
    {id: 1, Name: "Plan", Icon: <CalendarIcon/>, Description: "Select your dietary preferences and weekly budget. We'll handle the logistics of variety."},
    {id: 2, Name: "Shop", Icon: <ShoppingBasketIcon/>, Description: "Auto-generated smart grocery lists tailored to your local stores' cheapest prices."},
    {id: 3, Name: "Cook", Icon: <ForkKnifeIcon/>, Description: "Step-by-step instructions designed for small kitchens and limited equipment."}

]
    return(
    <>
        <div className="Home3Sections-container">
            {Home3SectionsDivs.map((Home3SectionsDiv)=> (
                <div key = {Home3SectionsDiv.id} className="Home3Sections">
                    <div className="Home3Sections-icon-box">
                        <div className="Home3Sections-icon">{Home3SectionsDiv.Icon}</div>
                    </div>
                    <div className="Home3Sections-title">{Home3SectionsDiv.Name}</div>
                    <div className="Home3Sections-description">{Home3SectionsDiv.Description}</div>
                </div>
            ))}
            <div></div>
        </div>
    </>
    )
}

function HomeFeatured(){
    const navigate = useNavigate();

    const featuredRecipes = [
        {id: 1, img: "unipowerbowl.png", tag: "Breakfast", title: "University Power Bowl", time: 15, cost: 3.50},
        {id: 2, img: "midnightexamramen.png", tag: "Lunch", title: "Midnight Exam Ramen", time: 10, cost: 2.00},
        {id: 3, img: "FWstirfry.png", tag: "Dinner", title: "Finals Week Stir-Fry", time: 20, cost: 4.50},
    ]
    return(
        <>
        <div className="HomeFeatured-background">
            <div className="HomeFeatured-title-container">
                <h1 className="HomeFeatured-title">Feautured Recipes </h1>
                <span className="HomeFeatured-title-description">Tried and tested by the midnight oil crowd.</span>
            </div>
            <div className="HomeFeatured-ViewAllRecipes" onClick={()=> navigate("/recipes")}>View all recipes ➜</div>
            <div className="HomeFeatured-recipes-container">
                {featuredRecipes.map((featuredRecipe)=>(
                    <div className="HomeFeatured-recipes">
                        <img className= "HomeFeatured-recipes-img" src={featuredRecipe.img} alt="Feautured Recipe" />
                        <div className="HomeFeatured-recipes-body">
                            <h3 className="HomeFeatured-recipes-title">{featuredRecipe.title}</h3>
                            
                            <div className="HomeFeatured-recipes-tags">
                                <span className="HomeFeatured-recipes-tag">{featuredRecipe.tag}</span>
                                <span className="HomeFeatured-recipes-tag">€{featuredRecipe.cost.toFixed(2)}</span>
                                 <div className="HomeFeatured-recipes-meta">
                                    <span>{featuredRecipe.time} min</span>
                                </div>
                            </div>
                            
                            </div>
                    </div>
                    
                ))}
            </div>
        </div>
        </>
    )
}

function HomeCreateAccountTab(){
    return(
        <>
            <div className="HomeCreate-Account-background">
                <div>

                </div>
            </div>
        </>
    )
}