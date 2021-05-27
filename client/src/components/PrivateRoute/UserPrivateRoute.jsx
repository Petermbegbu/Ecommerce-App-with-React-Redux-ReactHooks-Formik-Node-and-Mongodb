import React from "react";
import { connect } from "react-redux";
import {Route, Redirect} from "react-router-dom";
// import history from "../../history";


function UserPrivateRoute({ children, user, ...rest }) {
    
    
    return (
      <Route
        {...rest}

        render={({ location }) => 
            user ? (
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

export default connect(mapStateToProps)(UserPrivateRoute);  