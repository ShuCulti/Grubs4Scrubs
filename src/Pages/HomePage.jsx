import "react"
import "./HomePage.css"
import "./Components.css"
import { useNavigate } from "react-router"
import {LayoutDashboardIcon, PizzaIcon, LucideShoppingCart, Calendar1Icon}from "lucide-react"
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
    return(
    <>
        <div className="Home3Sections-container">
            <div className="Home3Sections">
                67
            </div>
            <div className="Home3Sections">
            
            </div>
            <div className="Home3Sections">
            </div>
        </div>
    </>
    )
}

function HomeFeatured(){
    return(
        <>
        <div className="HomeFeatured-background">
            <div className="">

            </div>
        </div>
        </>
    )
}

function HomeCreateAccountTab(){
    return(
        <>
            <div className="HomeCreate-Account">
                <div>

                </div>
            </div>
        </>
    )
}