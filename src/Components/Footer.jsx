import "react"
import "../Pages/HomePage.css"
import "../Pages/Components.css"
import { useNavigate } from "react-router"

export function G4Sfooter(){
    const navigate = useNavigate("")

    const footerLinks = [
        {id: 1, name: "Features", link: "/Grubs4Scrubs/features"},
        {id: 2, name: "Pricing", link: "/Grubs4Scrubs/features"},
        {id: 3, name: "About", link: "/Grubs4Scrubs/features"},
        {id: 4, name: "Privacy Policy", link: "/Grubs4Scrubs/features"},
        {id: 5, name: "Terms of Service", link: "/Grubs4Scrubs/features"},
        {id: 6, name: "Cookie Settings", link: "/Grubs4Scrubs/features"},
        {id: 7, name: "Contact Us", link: "/Grubs4Scrubs/features"}
    ]

    return(
        <>
            <hr className="footer-line"/>
            <div className="footer">
                <div className="footer-title-container">
                    <h2 className="footer-title">Grubs</h2>
                        <h2 className="footer-title-4" >4</h2>
                            <h2 className="footer-title-Scrubs">Scrubs</h2>
                </div>
                <div className="footer-links">
                    <span className="footer-copy-right"> © 2024 Grubs4Scrubs. Built for the midnight oil. </span>
                    {footerLinks.map((footerLink)=> (
                        <div className="footer-links-a" key = {footerLink.id}>
                            <span className = " " onClick={()=> navigate(footerLink.link)} >{footerLink.name} </span>
                        </div>
                    ))}
                    
                </div>
            </div>
        </>
    )
}