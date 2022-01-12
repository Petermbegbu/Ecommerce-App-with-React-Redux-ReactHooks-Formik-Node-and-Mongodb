import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";

import "./CategoryBar.css";

const CategoryBar = ({categories}) => {

    return (
        <div className="card mb-5">
            <h4 className="card-header">Categories</h4>
            <ul className="list-group">
                {
                    categories && categories.map((category, i) => (
                        <li key={i}>
                            <Link className="nav-link" to={`/${category.name}`}>{category.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}


const mapStateToProps = (state) => {
    const {categories} = state;

    return {
        categories: categories.allCategories,
    }
}

export default connect(mapStateToProps)(CategoryBar);