import "react"
import "./HomePage.css"
import "./Components.css"
import { useNavigate } from "react-router"
import {LayoutDashboardIcon, PizzaIcon, LucideShoppingCart, Calendar1Icon}from "lucide-react"
import {Navbar} from "../Components/Navbar.jsx"


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
                    <input className="HomeBoard-search">
                    
                    </input>
                </div>
                <HomeBoardDecor/>
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