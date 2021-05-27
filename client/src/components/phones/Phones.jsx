import React from "react";
import { connect } from "react-redux";

import Layout from "../Layout/Layout";
import Card from "../card/Card"
import "./Phones.css";


const Phones = ({bestSellerPhones}) => {
    const title = "Phone Shop";

    return (
        <Layout title={title} description="Search and find phones of your choice" className="container">
            <h2 className="text-center">All Phones</h2>
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
    const {phones} = state;

    return {
        bestSellerPhones: phones.bestSellerPhones,
    }
}

export default connect(mapStateToProps)(Phones);