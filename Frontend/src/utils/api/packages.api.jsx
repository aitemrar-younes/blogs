import { useAuth } from "../context/AuthContext.context";

const API_URL = 'http://127.0.0.1:9001/'
/* --------------------------------- */
class CustomError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "Error";
    this.status = status;
    this.data = data;
  }
}
/* --------------------------------- */
export async function RetrieveAPI(uri) {
  const response = await fetch(API_URL + uri);
  if (!response.ok)
    throw new Error(
      "Error while fetching the endPoint, status : ",
      response.status
    );
  return response.json();
}
/* --------------------------------- */
export const CUDAPI = async (uri, data, method) => {
    console.log('cudapi')
    const { isAuthenticated, logout } = useAuth();
    const authToken = localStorage.getItem("token");
    console.log(authToken)
    if (!authToken)
      throw new Error("No session...");
    const response = await fetch(API_URL + uri, {
      method: method, // [ POST, PUT, DELETE ]
      headers: {
        Authorization: `Token ${authToken}`,
        "Content-Type": "application/json",
      },
      body: data,
    });
    if ( response.status != 401){
      logout()
      //throw new Error("Error while Posting or Updating data in the Endpoint, status : ", response.status);
    }
    if (!response.ok && response.status != 400)
      throw new Error("Error while Posting or Updating data in the Endpoint, status : ", response.status);
    if (response.status == 400) {
      const data = await response.json();
      throw new CustomError("Error while Posting or Updating data in the Endpoint", response.status, data);
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
      throw new Error("Error while Posting or Updating data in the Endpoint, status : ", response.status);
    if (response.status == 400) {
      const data = await response.json();
      throw new CustomError("Error while Posting or Updating data in the Endpoint", response.status, data);
    }
    return response.json();
  };
  /* --------------------------------- */