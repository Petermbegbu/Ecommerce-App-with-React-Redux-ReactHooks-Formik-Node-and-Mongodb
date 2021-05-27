import React from "react";
import { connect } from "react-redux";

import Layout from "../Layout/Layout";
import Card from "../card/Card"
import "./Home.css";



const Home = ({user, bestSellerBooks, bestSellerPhones}) => {
    const title = user ? `Hello ${user.name}!` : "You are not Signed In";

    return (
        <Layout title={title} description="Node React E-Commerce App" className="container">
            <h2 className="text-center">Best Seller Books</h2>
            <div className="row p-5">
                {
                    bestSellerBooks.map(product => (
                        <Card key={product._id} product={product} />
                    ))
                }
            </div>
            
            <hr className="line"/>

            <h2 className="text-center">Best Seller Phones</h2>
            <div className="row p-5">
                {
                    bestSellerPhones.map(product => (
                        <Card key={product._id} product={product} />
                    ))
                }
            </div>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    const {auth, books, phones} = state;

    return {
        user: auth.user,
        bestSellerBooks: books.bestSellerBooks,
        bestSellerPhones: phones.bestSellerPhones,
    }
}

export default connect(mapStateToProps)(Home);