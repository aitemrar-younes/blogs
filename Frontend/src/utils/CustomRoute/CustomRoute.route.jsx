import { Route } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import Home from "../../Pages/Home/Home";

export const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Login/>
        )
      }
    />
  );
  
export  const PublicRoute = ({ component: Component, isAuthenticated, restricted, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && restricted ? (
          <Home />
        ) : (
          <Component {...props} />
        )
      }
    />
  );