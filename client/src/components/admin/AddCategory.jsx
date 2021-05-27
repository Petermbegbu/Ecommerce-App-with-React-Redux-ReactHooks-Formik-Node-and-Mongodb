import React, {useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";

import Layout from "../Layout/Layout";

const AddCategory = ({user}) => {
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setError("");

        setCategoryName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(categoryName) {
            //Make request to API
            const res = await axios.post("/api/create-category", {name: categoryName});
            const {data} = res;

            if(data.category){
                setError("");
                setSuccess(true);
            } else if (data.errorMessages) {
                const {name} = data.errorMessages;
                setError(name);
            } else {
                return;
            }

        } else {
            setError("Category is Required");
        }
    }

    const notification = () => {
        if(success) {
            return <h4 className="text-success">{categoryName} was created succesfully</h4>
        } else if (error){
            return <h4 className="text-danger">{error}</h4>
        } else {
            return;
        }
    }


    const categoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div>{notification()}</div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" 
                    className="form-control" 
                    onChange={handleChange} 
                    value={categoryName}
                    autoFocus
                />
            </div>

            <button className="btn btn-primary">Create Category</button>
        </form>
    );

    const adminName = user ? `${user.name}` : "";

    return (
        <Layout title="Add New Category" description={`Hello ${adminName}`} className="container">
            {categoryForm()}

            <div className="mt-5">
                <Link to="/admin/adminDashboard">Back to Dashboard</Link>
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

export default connect(mapStateToProps)(AddCategory); 