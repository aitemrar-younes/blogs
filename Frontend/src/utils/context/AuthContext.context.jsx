// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // initialy must be false but for testing it might be set to true
  const [loading, setLoading] = useState(true);
    /*    
        Here must be a process that checks if there is a token stored in localBrowser and then checks its validity
        if so it will set isAuthenticated and add account variable so we dont search again again for user info 
        otherwise it will be false and only pages and functionnalities authorized to have
    */

    useEffect(() => {

        // Check token validity with the server
        const checkTokenValidity = async () => {
            localStorage.setItem('token','898fcd78f01c12893a9b14fc1f28d2821664a2a4')
            const token = localStorage.getItem('token');
            if (token) {
                // Send a request to the server to validate the token
                try {
                    // Replace 'YOUR_SERVER_ENDPOINT' with the actual endpoint to validate the token on your server
                    const response = await fetch('YOUR_SERVER_ENDPOINT/validate-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    });
        
                    if (response.ok) {
                    setIsAuthenticated(true);
                    } else {
                    setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error('Error validating token:', error);
                    setIsAuthenticated(false);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
    
        //checkTokenValidity();
    }, []);
    
    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
