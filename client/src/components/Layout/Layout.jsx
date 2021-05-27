import React from "react";
import Menu from "../Menu/Menu";
import "./Layout.css";

const Layout = ({title="Title", description="Description", className, children }) => {

    return (
        <div>
            <Menu />
            
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="bold">{description}</p>
            </div>
            <div className={className}>
                {children}
            </div>
        </div>
    )
}

export default Layout;