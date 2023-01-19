import React from "react";
import logo from './images/Free_Sample_By_Wix-4.jpg';
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 


// Here, we display our Navbar
export default function Navbar() {
 return (
   <div className="greenBoy">
     <nav className="navbar navbar-expand-lg">
       <NavLink className="navbar-brand" to="/">
       <img style={{"width" : 55 + '%'}} src={logo}></img>
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li>
                <NavLink className="nav-link" to="/">
                    Home
                </NavLink>
           </li>
		   <li>
				<NavLink className="nav-link" to="/items">
					Items
				</NavLink>
		   </li>
		   <li>
				<NavLink className="nav-link" to="/accounts">
					Accounts
				</NavLink>
		   </li>
			<li>
				<NavLink className="nav-link" to="/lists">
					Lists
				</NavLink>
			</li>
      <li>
        <NavLink className="nav-link" to="/settings">
          Settings
        </NavLink>
      </li>

         </ul>
       </div>
     </nav>
   </div>
 );
}