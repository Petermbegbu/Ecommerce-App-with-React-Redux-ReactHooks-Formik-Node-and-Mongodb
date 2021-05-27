import React from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";

import {logOutAction} from "../../redux/actionCreators/authCreators";
import "./Menu.css";

const Menu = ({history, logOutAction, isSignedIn, user}) => {

    const logout = async () => {
        const res = await axios({
            method: "get",
            url: "/api/logout"
        })

        if(res.data.message === "success"){
            logOutAction();
            history.push("/signin")
        }
    } 

    // checking active page
    const isActive = (path) => {
        if(history.location.pathname === path){
            return {color: "yellow"}
        }
    }

    const renderMenu = () => {
        if (isSignedIn) {
            return (
                <React.Fragment>
                    {user && user.isAdmin === true && (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive("/admin/adminDashboard")} to="/admin/adminDashboard">Dashboard</Link>
                        </li>
                    )}

                    {user && user.isAdmin === false && (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive("/user/userDashboard")} to="/user/userDashboard">Dashboard</Link>
                        </li>
                    )}
                    
                    <li className="nav-item">
                        <span className="nav-link logout" onClick={() => logout()}>Log Out</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link">{user.email}</span>
                    </li>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive("/signin")} to="/signin">Signin</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive("/signup")} to="/signup">Signup</Link>
                    </li>
                </React.Fragment>
            )
        }
    }


    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                {/* <!-- Brand --> */}
                <Link className="navbar-brand" to="/">LOGO</Link>

                <ul className="navbar-nav menu">
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive("/")} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive("/books")} to="/books">Books</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive("/phones")} to="/phones">Phones</Link>
                    </li>
                    
                    {renderMenu()}
                </ul>
            </nav>

        </div>
    )
 }

 const mapStateToProps = (state)=> {
     const {isSignedIn, user} = state.auth;

     return {
        isSignedIn: isSignedIn,
        user
     }
 }


 export default connect(mapStateToProps, {logOutAction})(withRouter(Menu));