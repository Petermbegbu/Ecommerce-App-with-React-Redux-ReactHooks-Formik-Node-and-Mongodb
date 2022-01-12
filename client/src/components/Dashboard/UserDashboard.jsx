import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import Layout from "../Layout/Layout";

const UserDashboard = ({user}) => {
    const title = user ? `${user.name}` : "";

    return (
        <Layout title="Dashboard" description={`Welcome ${title}!`} className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="card mb-5">
                        <h4 className="card-header">User Links</h4>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link className="nav-link" to="/checkout">My Cart</Link>
                            </li>
                            <li className="list-group-item">
                                <Link className="nav-link" to="/profile/update">Update Profile</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="card mb-5">
                        <h4 className="card-header">User information</h4>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <b className="pr-3">Name:</b>
                                {user ? user.name : "None"}
                            </li>
                            <li className="list-group-item">
                                <b className="pr-3">Email:</b>
                                {user ? user.email : "None"}
                            </li>
                            <li className="list-group-item">
                                <b className="pr-3">Role:</b>
                                {user ? user.isAdmin ? "Admin" : "Registered User" : "None"}
                            </li>
                        </ul>
                    </div>

                    <div className="card mb-5">
                        <h4 className="card-header">Purchase History</h4>
                        <ul className="list-group">
                            <li className="list-group-item">History</li>
                        </ul>
                    </div>
                </div>

            </div>

            
        </Layout>
    )
}

const mapStateToProps = (state) => {
    const {user} = state.auth;
    return {
        user
    }
}

export default connect(mapStateToProps)(UserDashboard);