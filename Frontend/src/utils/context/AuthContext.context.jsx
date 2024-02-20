import React, { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // initialy must be false but for testing it might be set to true
  const [account, setAccount] = useState(null); // it will hold data about the user
  const [loading, setLoading] = useState(true);

    /*    
        Here must be a process that checks if there is a token stored in localBrowser and then checks its validity
        if so it will set isAuthenticated and add account variable so we dont search again again for user info 
        otherwise it will be false and only pages and functionnalities authorized to have
    */

    useEffect(() => {
        // Check token validity with the server
        const checkTokenValidity = async () => {
            setLoading(true)
            const token = localStorage.getItem('token');
            if (token) {
                // Send a request to the server to validate the token
                try {
                    // connect to the server using token and check its validity
                    // if so store account detail
                    const API_URL = 'http://127.0.0.1:9001/'
                    const response = await fetch(API_URL + 'api/account/alive/', {
                        method: 'GET',
                        headers: { authorization : `Token ${token}`, }
                    });
                    if ( response.ok ){
                        // if response is ok store the account detail
                        const data = await response.json()
                        setAccount(data)
                        setIsAuthenticated(true)
                    }
                    else{
                        // otherwise set it to null
                        setAccount(null)
                        setIsAuthenticated(false)
                    }
                } catch (error) {
                    setAccount(null)
                    setIsAuthenticated(false)
                    // set isAuth to false due to an error not handled
                } finally {
                    // any way maybe set the loading to false which tells that the process
                    // has stoped
                }
            } else {
                setAccount(null)
                setIsAuthenticated(false)
                // setLoading(false);
            }
            setLoading(false)
        };
    
        checkTokenValidity();
    }, [forceUpdate]);
    
    const login = (data) => {
        localStorage.setItem('token',data)
        setIsAuthenticated(!isAuthenticated)
        setForceUpdate(!forceUpdate)
    }
    const logout = () => {
        // i need api call here to delete the token from server also not only in client side
        localStorage.removeItem('token');
        setIsAuthenticated(!isAuthenticated);
        setForceUpdate(!forceUpdate)
    };

  return (
    <AuthContext.Provider value={{ login, logout, account, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
