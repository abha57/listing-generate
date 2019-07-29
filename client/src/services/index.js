import axios from "axios";
import auth0Client from 'auth';


export const makeApiCall = formData =>
  axios
    .post("http://localhost:3001/api/uploadFiles", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
       // 'Authorization': `Bearer ${auth0Client.getIdToken()}`
      }
    })
    .then(function(response) {
      console.log("response in post", response);
      const { data } = response;
      return data;
    })
    .catch(function(error) {
      console.log("response in post error", error);
    });