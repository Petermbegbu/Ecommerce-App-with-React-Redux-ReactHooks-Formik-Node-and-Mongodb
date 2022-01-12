import React, {useState, useEffect} from "react";
import { connect } from "react-redux";

import DisplayProducts from "../displayProducts/DisplayProducts";
import {getPaginatedBooksAction} from "../../redux/actionCreators/productCreators";
import SideBar from "../sideBar/SideBar";
import Layout from "../Layout/Layout";
import "./Books.css";


const Books = ({paginatedBooks, totalPages, bookSearchValue, getPaginatedBooksAction}) => {
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [found, setFound] = useState("");
    const order = "desc";
    const sortBy = "updatedAt";
    const category = "books";

    const nextPage = () => {
        setSkip(skip + limit);
        setPageNo(pageNo + 1);
    }

    const previousPage = () => {
        setSkip(skip - limit);
        setPageNo(pageNo - 1);
    } 


    const actions = async () => {
        await getPaginatedBooksAction(sortBy, order, limit, skip, bookSearchValue)
    }

    useEffect(() => {
        actions();
    }, [skip, limit])

    // if(bookSearchValue && totalPages > 1){
    //     setFound(`Found ${totalPages} Products`);
    // }
    
    // if(bookSearchValue && totalPages < 1){
    //     setFound(`Found ${totalPages} Products`);
    // }

    const title = "Book Shop";

    return (
        <Layout title={title} description="Search and find books of your choice" className="container-fluid px-5">
            <div className="row my-5">
                <div className="col-md-3">
                    <SideBar pageName="Books" limit={limit} skip={skip} category={category}/>
                </div>
                <div className="col-md-9">
                    <h2 className="text-center">All Books</h2>
                    <DisplayProducts products={paginatedBooks} col="4"/>

                    <div className="d-flex justify-content-around">
                        {
                            skip === 0 ? null : 
                                <button onClick={previousPage} className="btn btn-info">Previous Page</button>
                        },

                        {
                            pageNo === totalPages ? null :
                                <button onClick={nextPage} className="btn btn-secondary">Next Page</button>
                        }
                    </div>
                </div>
            </div>

        </Layout>
    )
}

const mapStateToProps = (state) => {
    const {books} = state;

    return {
        paginatedBooks: books.paginatedBooks,
        totalPages: books.totalPages,
        bookSearchValue: books.bookSearchValue
    }
}

export default connect(mapStateToProps, {getPaginatedBooksAction})(Books);