import React from "react";
import {Link} from "react-router-dom"
import "./loginform.css"

const LoginPage = () => {
    return(
        <div className="cover">
            <h1>Login</h1>
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/> 
            <div>
                <button>
                    <Link to="/" className="button-link">
                        login
                    </Link>
                </button>
            </div> 
            <div>
                 <button>
                    <Link to="/RegisterPage" className="button-link">
                        Register
                    </Link>
                </button>
            </div>
        </div>
    )
}
export default LoginPage;