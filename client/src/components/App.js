import React, {useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import Home from "./Home/Home";
import Signin from "./auth/Signin.jsx";
import Signup from "./auth/Signup.jsx";
import Books from "./books/Books";
import Phones from "./phones/Phones";
import {getCurrentUserAction} from "../redux/actionCreators/authCreators";
import {getCategoriesAction} from "../redux/actionCreators/categoryCreators";
import {bestSellerBooksAction, bestSellerPhonesAction} from "../redux/actionCreators/productCreators";
import UserDashboard from "./Dashboard/UserDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";
import UserPrivateRoute from "./PrivateRoute/UserPrivateRoute";
import AdminPrivateRoute from "./PrivateRoute/AdminPrivateRoute";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";


const App = ({getCurrentUserAction, getCategoriesAction, bestSellerBooksAction, bestSellerPhonesAction}) => {

  const getData = async () => {
    await getCurrentUserAction();
    await getCategoriesAction();
    await bestSellerBooksAction("sold", "desc", 6);
    await bestSellerPhonesAction("sold", "desc", 6);
  }

  useEffect(() => {
    getData();
  }, []);

  return(
    <BrowserRouter>      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/phones" component={Phones} />

        <UserPrivateRoute exact path="/user/userDashboard">
          <UserDashboard />
        </UserPrivateRoute>

        <AdminPrivateRoute exact path="/admin/adminDashboard">
          <AdminDashboard />
        </AdminPrivateRoute>

        <AdminPrivateRoute exact path="/create/category">
          <AddCategory />
        </AdminPrivateRoute>

        <AdminPrivateRoute exact path="/create/product">
          <AddProduct />
        </AdminPrivateRoute>

      </Switch>
    </BrowserRouter>
      
  )
}

export default connect(null, 
  {getCurrentUserAction, 
    getCategoriesAction, 
    bestSellerBooksAction, 
    bestSellerPhonesAction})(App);
