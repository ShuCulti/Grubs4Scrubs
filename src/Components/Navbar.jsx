import "react"
import "../Pages/HomePage.css"
import "../Pages/Components.css"
import { useNavigate } from "react-router"
import {LayoutDashboardIcon, PizzaIcon, LucideShoppingCart, Calendar1Icon}from "lucide-react"

const links = {GrubsLogoPath: "/", DashBoardIconPath: "/dashboard", RecipesIconPath:"/recipes", 
    MealPlannerIconPath: "/meal-planning", ShoppingListIconPath: "/shopping-list"}

export function Navbar(){
    const navigate = useNavigate()
    return(
        <>
        <nav className="Navbar">
            <GrubsLogo/>
            <DashBoardIcon/>
            <RecipesIcon/>
            <MealPlannerIcon/>
            <ShoppingListIcon/>
        </nav>
        </>

    )
}

function GrubsLogo(){
    const navigate = useNavigate()
    return(
        <>
        <div className="GrubsLogo" onClick = {()=> navigate("/")}>
            🍽
            <p className="GrubsLogo-text">
                Grubs
            </p>
            <p className="GrubsLogo-text GrubsLogo-text-4-colour">
                4
            </p>
            <p className="GrubsLogo-text GrubsLogo-text-Scrubs-colour">
            Scrubs
            </p>
        </div>
        </>
    )
}

function DashBoardIcon(){
    const navigate = useNavigate()
    return(
        <>
            <div className="DashBoardIcon" onClick={()=> navigate("/dashboard")}>
                <LayoutDashboardIcon/>
                <p className="NavbarIcons-Text">
                    Dashboard
                </p>
            </div>
        </>
    )
}

function RecipesIcon(){
    const navigate = useNavigate()
    return(
        <>
            <div className="RecipesIcon" onClick={()=> navigate("/recipes")}>
                <PizzaIcon/>
                <p className="NavbarIcons-Text">
                    Recipes
                </p>
            </div>
        </>
    )
}

function MealPlannerIcon(){
    const navigate = useNavigate()
    return(
        <>
            <div className="MealPlannerIcon" onClick={()=> navigate("/meal-planning")}>
                <Calendar1Icon/>
                <p className="NavbarIcons-Text">
                    Meal Planner
                </p>
            </div>

        </>
    )
}

function ShoppingListIcon(){
    const navigate = useNavigate()
    return(
        <>
            <div className="ShoppingListIcon" onClick = {()=> navigate("/shopping-list")}>
                <LucideShoppingCart/>
                <p className="NavbarIcons-Text">
                    Shopping List
                </p>
            </div>
        </>
    )
}

function ProfileLogo(){
    return(
        null
    )
}

function MrIncredible(){
    return(
        <>
        <div className="HomeDashBoard">
            Welcome Son
            <img src="https://i.imgflip.com/8b9jjf.jpg"alt="MrIncredy" ></img>
 
        </div>
        </>
    )
}