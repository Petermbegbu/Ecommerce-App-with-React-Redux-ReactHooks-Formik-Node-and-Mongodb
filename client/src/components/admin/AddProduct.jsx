import React, {useState, useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as Yup from "yup";
import axios from "axios";

import Layout from "../Layout/Layout";
import "./Admin.css";

const AddProduct = ({user}) => {

    const [categoryValues, setCategoryValues] = useState([])
    const [adminUsers, setAdminUsers] = useState([])
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    
    const productForm = () => (
        <Formik initialValues={initialValues} 
            validationSchema={validationSchema} 
            onSubmit={onSubmit}
            validateOnMount
        >
            {
                ({isValid, isSubmitting, setFieldValue}) => {
                    return (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field type="text" id="name" name="name" className="form-control"/>
                                <ErrorMessage name="name">
                                    {errMessage => <div className="error">{errMessage}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="form-group">
                                <input type="file" 
                                    id="image" name="image" 
                                    accept=".jpg, .png, .jpeg"
                                    onChange={e => setFieldValue("image", e.target.files[0])}
                                />
                                <ErrorMessage name="image">
                                    {errMessage => <div className="error">{errMessage}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <Field 
                                    as="textarea" id="description"
                                    name="description" className="form-control"
                                />
                                <ErrorMessage name="description">
                                    {errMessage => <div className="error">{errMessage}</div>}
                                </ErrorMessage>  
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <Field 
                                    type="number" 
                                    id="price" name="price" 
                                    className="form-control"
                                />
                                <ErrorMessage name="price">
                                    {errMessage => <div className="error">{errMessage}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <Field as="select" id="category" name="_category" className="form-control">
                                    <option value="">Select Category</option>
                                    {
                                        categoryOptions.map((option, i) => (
                                            <option key={i} value={option._id}>
                                                {option.name}
                                            </option>
                                        ))
                                    }
                                </Field>
                                <ErrorMessage name="category">
                                    {errMessage => <div className="error">{errMessage}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <Field 
                                    type="number" 
                                    id="quantity" name="quantity" 
                                    className="form-control"
                                />
                                <ErrorMessage name="quantity">
                                    {errMessage => <div className="error">{errMessage}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="form-group">
                                <label htmlFor="shipping">Shipping Product</label>
                                <Field as="select" id="shipping" name="shipping" className="form-control">
                                    {
                                        shippingOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.key}
                                            </option>
                                        ))
                                    }
                                </Field>
                                <ErrorMessage name="shipping">
                                    {errMessage => <div className="error">{errMessage}</div>}
                                </ErrorMessage>
                            </div>

                            <div className="form-group">
                                <label htmlFor="adminUser">Admin User</label>
                                <Field as="select" id="adminUser" name="_user" className="form-control">
                                    <option value="">Select Admin User</option>
                                    {
                                        adminUsersOptions.map((option, i) => (
                                            <option key={i} value={option._id}>
                                                {option.name}
                                            </option>
                                        ))
                                    }
                                </Field>
                                <ErrorMessage name="_user">
                                    {errMessage => <div className="error">{errMessage}</div>}
                                </ErrorMessage>
                            </div>


                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                disabled={!(isValid) || isSubmitting}
                            >
                                Create Product
                            </button>
                        </Form>
                    )
                }
            }
        </Formik>
    )

    const initialValues =  {
        name: "",
        image: "",
        description: "",
        quantity: "",
        price: "",
        _category: "",
        shipping: false,
        _user: "",
    };

    const onSubmit = async (values, onSubmitProps) => {
        setLoading(true);
        setSuccess(false);
        setError(false);

        // const config = {
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     }
        // }
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("image", values.image);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("_category", values._category);
        formData.append("quantity", values.quantity);
        formData.append("_user", values._user);


        const response = await axios.post("/api/create-product", formData )

        const {data} = response;

        if(data.errorMessages){
            const {name, image, description, price, _category, quantity} = data.errorMessages;

            onSubmitProps.setFieldError("name", name)
            onSubmitProps.setFieldError("image", image)
            onSubmitProps.setFieldError("description", description)
            onSubmitProps.setFieldError("price", price)
            onSubmitProps.setFieldError("_category", _category)
            onSubmitProps.setFieldError("quantity", quantity)
            setLoading(false);
            setSuccess(false);
            setError(true);
        } else {
            //runs after submit is successful
            if(data.product) {
                onSubmitProps.resetForm();
                setLoading(false);
                setSuccess(true);
            }
        }
        
        onSubmitProps.setSubmitting(false);
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Product name is Required!"),
        image: Yup.string().required("Upload an Image!"),
        description: Yup.string().required("Please add Description!"),
        price: Yup.number().required("Please add Price!"),
        _category: Yup.string().required("Please select Category!"),
        quantity: Yup.number().required("Please add Quantity!"),
        shipping: Yup.boolean().required("Is it a shipping product?"),
        _user: Yup.string().required("Please select Admin User!"),
    })

    const getCategories = async () => {
        try {
            const res = await axios.get("/api/categories");
            setCategoryValues(res.data);
        } catch(error) {
            console.log("Categories error", error);
        }
    }

    const getAdminUsers = async () => {
        try {
            const res = await axios.get("/api/adminUsers");
            setAdminUsers(res.data);
        } catch(error) {
            console.log("AdminUsers error", error);
        }
    }

    useEffect(() => {
        getCategories();
        getAdminUsers();
    }, [])
    
    const categoryOptions = categoryValues;
    const adminUsersOptions = adminUsers;
    
    const shippingOptions = [
        {key: "No", value: false},
        {key: "Yes", value: true},
    ]
    
    const showLoading = () => {
        if(loading){
            return <h5>Loading....</h5>
        } else {
            return null
        }
    }

    const notification = () => {
        if(success) {
            return <h5 className="text-success">Product Created succesfully</h5>
        } else if (error){
            return <h5 className="text-danger">Product Not Created</h5>
        } else {
            return null;
        }
    }

    const adminName = user ? `${user.name}` : "";

    return (
        <Layout title="Add New Product" description={`Hello ${adminName}`} className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    {notification()}
                    {productForm()}
                    {showLoading()}
                </div>
            </div>

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

export default connect(mapStateToProps)(withRouter(AddProduct)); 