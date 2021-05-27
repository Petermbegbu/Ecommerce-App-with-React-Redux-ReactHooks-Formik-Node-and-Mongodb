import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import { signInAction } from "../../redux/actionCreators/authCreators";
import { connect } from "react-redux";
import Layout from "../Layout/Layout";
import "./auth.css";

const Signin = (props) => {

    const SigninForm = () => (
        <Formik initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={onSubmit}
                validateOnMount
        >
            {
                ({isValid, isSubmitting}) => {
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
                                <label htmlFor="email">Email</label>
                                <Field type="text" id="email" name="email" className="form-control"/>
                                <ErrorMessage name="email">
                                    {errMessage => <div className="error">{errMessage}</div>}
                                </ErrorMessage>
                             </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field type="password" id="password" name="password" className="form-control"/>
                                <ErrorMessage name="password">
                                    {errMessage => <div className="error">{errMessage}</div>}
                                </ErrorMessage>  
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary" 
                                disabled={!(isValid) || isSubmitting}
                            >
                                Sign In
                            </button>
                        </Form>
                    )
                }
            }
        </Formik>
    )

    const initialValues =  {
        name: "",
        email: "",
        password: ""
    };

    const onSubmit = async (values, onSubmitProps) => {

        // try{
        const response = await axios({
            method: "post",
            url: "/api/Signin",
            data: {
                name: values.name,
                email: values.email,
                password: values.password
            }
        })

        const {data} = response;

        if(data.errorMessages){
            const {name, email, password} = data.errorMessages;

            onSubmitProps.setFieldError("name", name)
            onSubmitProps.setFieldError("email", email)
            onSubmitProps.setFieldError("password", password)
        } else {
            //runs after submit is successful
            if(data.user){
                const { user } = data;

                onSubmitProps.resetForm();
                props.signInAction(user);

                user.isAdmin ? 
                props.history.push("/admin/adminDashboard") :
                props.history.push("/user/userDashboard")
            }
        }   
        
        onSubmitProps.setSubmitting(false);
        
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is Required!"),
        email: Yup.string().required("Email is Required!").email("Invalid Email Format!"),
        password: Yup.string().required("Password is Required!")
    })

    return (
        <Layout title="Signin" description="Signin to Node React E-Commerce App" className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    {SigninForm()}
                </div>
            </div>
        </Layout>
    )
}



export default connect(null, {signInAction})(withRouter(Signin));