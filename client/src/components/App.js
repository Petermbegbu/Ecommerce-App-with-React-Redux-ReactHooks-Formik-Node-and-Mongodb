import React, {useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";

import Home from "./Home/Home";
import Signin from "./auth/Signin.jsx";
import Signup from "./auth/Signup.jsx";
import {getCurrentUserAction} from "../redux/actionCreators/authCreators";
import history from "../history";


const App = ({getCurrentUserAction}) => {

  const getUser = async () => {
    const res = await axios({
      method: "get",
      url: "/api/currentUser",
    })

    if(res.data.user){
      const {user} = res.data;
      getCurrentUserAction(user);
      return;
    }

    history.push("/signin")
  }

  useEffect(() => {
    getUser();
  });

  return(
    <BrowserRouter>      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
      
  )
}

export default connect(null, {getCurrentUserAction})(App);
