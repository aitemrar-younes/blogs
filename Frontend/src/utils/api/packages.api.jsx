import CustomError from "../CustomError/CustomError.error";
const API_URL = 'http://127.0.0.1:9001/'

/* --------------------------------- */
export async function RetrieveAPI(uri) {
    const response = await fetch(API_URL + uri);
    if (!response.ok)
        throw new CustomError(
        "Error while fetching the endPoint, status : ",
        response.status
        );
    return response.json();
}

/* --------------------------------- */
export const CUDAPI = async (uri, data, method, restricted = true, isFormData= true) => {
    //const { isAuthenticated } = await useAuth();
    // i can't use that context here i couldnt solve it and i want to make things cleaner
    // by storing functionalities related to auth in to that context and avoid using localstorage directly from other functions
    const authorization = restricted ? `Token ${localStorage.getItem("token")}` : ''
    const content_type = isFormData ? {} : {'Content-Type': 'application/json'}
    const ready_data = isFormData ? data : JSON.stringify(data)

    const response = await fetch(API_URL + uri, {
        method: method, // [ POST, PUT, DELETE ]
        headers: {authorization, ...content_type},
        body: ready_data,
    });
    if ( response.status == 401){
        // in this case we are sure that our user is not logged in or has an expired token
        //so we log him out
        //logout()
        throw new CustomError("Unauthorized", response.status);
    }
    if (response.status == 400) {
        // if serializer is not valid it will return a list of error for each field
        // we need to send back this data to be able to display it 
        const data = await response.json();
        throw new CustomError("Error while Posting or Updating data in the Endpoint", response.status, data);
    }
    if (!response.ok){
        // this will cover the rest of errors
        throw new CustomError("Error while Posting or Updating data in the Endpoint", response.status);
    }
    return response.json();
};

/* --------------------------------- */
export const CUD_formData_noAuth_API = async (uri, formData, method) => {
    console.log(formData)
    const response = await fetch(API_URL + uri, {
        method: method, // [ POST, PUT, DELETE ]
        body: formData,
    });
    if (!response.ok && response.status != 400)
        throw new CustomError("Error while Posting or Updating data in the Endpoint, status : ", response.status);
    if (response.status == 400) {
        const data = await response.json();
        throw new CustomError("Error while Posting or Updating data in the Endpoint", response.status, data);
    }
    return response.json();
};
/* --------------------------------- */