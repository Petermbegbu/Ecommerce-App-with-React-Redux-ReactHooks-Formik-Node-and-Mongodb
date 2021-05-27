import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";

import Layout from "../Layout/Layout";
import Card from "../card/Card"
import "./Books.css";


const Books = ({bestSellerBooks}) => {
    const sideBar = () => (
        <div className="">
            <div className="card mb-5">
                <h4 className="card-header">Categories</h4>
                <ul className="list-group">
                    <li className="">
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="">
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                </ul>
            </div>
        </div>
    );


    const bookList = () => (
        <div>
            <h2 className="text-center">All Books</h2>
            <div className="row p-5">
                {
                    bestSellerBooks.map(product => (
                        <Card key={product._id} product={product} />
                    ))
                }
            </div>
        </div>
    )


    const title = "Book Shop";

    return (
        <Layout title={title} description="Search and find books of your choice" className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    {sideBar()}
                </div>
                <div className="col-md-9">
                    {bookList()}
                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    const {books} = state;

    return {
        bestSellerBooks: books.bestSellerBooks,
    }
}

export default connect(mapStateToProps)(Books);