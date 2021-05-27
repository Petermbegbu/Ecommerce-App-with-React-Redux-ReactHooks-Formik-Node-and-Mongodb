import React from "react";
import { connect } from "react-redux";
import {Route, Redirect} from "react-router-dom";


function AdminPrivateRoute({ children, user, ...rest }) {
    
    
    return (
      <Route
        {...rest}

        render={({ location }) => 
            user && user.isAdmin === true? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: location }
                    }}
                />
            )
        }
      />
    );
}


const mapStateToProps = (state) => {
    const {user} = state.auth;
    return {
        user
    }
}

export default connect(mapStateToProps)(AdminPrivateRoute);  