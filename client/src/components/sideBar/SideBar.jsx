import React from "react";
import CategoryBar from "../categoryBar/CategoryBar";
import SearchBar from "../search/SearchBar"; 

const SideBar = ({pageName, limit, skip, category}) => {

    return (
        <div>
            <SearchBar pageName={pageName} limit={limit} skip={skip} category={category} />
            <CategoryBar />
        </div>
    )
}

export default SideBar;