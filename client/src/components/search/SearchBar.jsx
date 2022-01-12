import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {searchProductAction} from "../../redux/actionCreators/productCreators";
import "./SearchBar.css";

const SearchBar = ({pageName, limit, skip, category, searchProductAction}) => {
    const [search, setSearch] = useState("");
    const order = "desc";
    const sortBy = "updatedAt";
    const categoryName = category;

    const handleChange = (e) => {
        setSearch(e.target.value);
        searchProductAction(sortBy, order, limit, skip, search, categoryName);
    }

    useEffect(() => {
        searchProductAction(sortBy, order, limit, skip, search, categoryName);
    }, [])

    useEffect(() => {
        searchProductAction(sortBy, order, limit, skip, search, categoryName);
    }, [search])

    return (
        <div className="mb-5 form-group">
            <input 
                type="text" 
                value={search}
                className="form-control search" 
                placeholder={`Search ${pageName}`}
                onChange={handleChange}
            />
        </div>
    )
}

export default connect(null, {searchProductAction})(SearchBar);