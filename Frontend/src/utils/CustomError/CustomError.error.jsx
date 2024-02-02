//import { useAuth } from "../context/AuthContext.context";

class CustomError extends Error {
    constructor(message=null, status=null, data=null) {
        super(message);
        this.name = "Error";
        this.status = status;
        this.data = data;
        
        /* if (status == 401) {
            console.log('its 401 and should logout');
            const { logout } = useAuth();
            console.log('logout confirmed');
            logout();
        } */
    }
}
export default CustomError;