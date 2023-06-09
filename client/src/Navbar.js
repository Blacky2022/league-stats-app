import React from "react";
import {Link} from "react-router-dom"
import "./navCSS.css"

function NavBar(){
    return(
        <body>
            <header>
                <img class="logo" src="images/logo.svg" alt="projekt"/> 
                <nav>
                    <ul className="nav_links">
                        <li><Link to="/">LoginPage</Link></li>
                        <li><Link to="/ChampionStats">ChampionStats</Link></li>
                        <li><Link to="/UpdatePerformance">UpdatePerformance</Link></li>
                        <li><Link to="/WorldsPerformance">WorldsPerformance</Link></li>
                    </ul>
                </nav>
                <a class="cta" href="#"><button>Contact</button></a>
            </header>
        </body>
    )
}
export default NavBar;