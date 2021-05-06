import React from "react";
import { connect } from "react-redux";
import Layout from "../Layout/Layout";

const Home = ({user}) => {
    const title = user ? `Welcome ${user.name} !` : "You are not Signed In";

    return (
        <Layout title={title} description="Node React E-Commerce App">

        </Layout>
    )
}

const mapStateToProps = (state) => {
    const {user} = state.auth;
    return {
        user
    }
}

export default connect(mapStateToProps)(Home);