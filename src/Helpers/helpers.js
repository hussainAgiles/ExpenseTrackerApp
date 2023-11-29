// This page contains all the api functions

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { URL_CONSTANTS, baseUrl } from '../API/Endpoints';
import mime from 'mime';

// login
export const handleLogin = async request => {
  try {
    const response = await axios.post(URL_CONSTANTS.login_URL, request);
    return response;
  } catch (error) {
    return error.response;
  }
};

// For forgot password :
export const handleForgotpassword = async request => {
  try {
    // URL for forgot password
    const response = await axios.post(URL_CONSTANTS.reset_Password, request);
    return response;
  } catch (error) {
    return error.response;
  }
};

// Verifying otp and Change Password
export const handlechangePassword = async request => {
  try {
    // URL for forgot password
    const response = await axios.post(URL_CONSTANTS.change_password, request);
    return response;
  } catch (error) {
    return error.response;
  }
};

// Fetching all the categories
export const fetchCategories = async () => {
  try {
    const bearer_Token = await fetchBearerToken();
    const response = await axios.get(
      URL_CONSTANTS.fetch_Category,
      bearer_Token,
    );

    return response;
  } catch (error) {
    return error.response;
  }
  return false;
};

// Add Category
export const createCategory = async request => {
  const bearer_token = await fetchBearerToken();
  try {
    const response = await axios.post(
      URL_CONSTANTS.create_Category,
      request,
      bearer_token,
    );
    return response;
  } catch (error) {
    return error.response;
  }
  return false;
};

// fetching Categories for update
export const fetchCategoryDetails = async request => {
  const bearer_token = await fetchBearerToken();
  const Endpoints = `${URL_CONSTANTS.update_Category}?slug=${request}`;
  try {
    const response = await axios.get(Endpoints, bearer_token);
    return response;
  } catch (error) {
    return error.response;
  }
  return false;
};

// Add transacton
export const add_Transaction = async request => {
  const bearer_token = await fetchBearerToken();
  try {
    const response = await axios.post(
      URL_CONSTANTS.add_Transaction,
      request,
      bearer_token,
    );
    return response;
  } catch (error) {
    return error.response;
  }
  return false;
};

// Fetch Transaction History
export const fetchTransactionHistory = async () => {
  try {
    const bearer_Token = await fetchBearerToken();
    const Endpoints = `${URL_CONSTANTS.fetch_Transaction}`;
    const response = await axios.get(Endpoints, bearer_Token);
    return response.data.transaction_details;
  } catch (error) {
    return error.response;
  }
  return false;
};

// delete transaction
export const handleDelete = async (request) => {
  console.log("delete === ",request)
  return new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('User_Token');
    axios({
      method: "post",
      url: `http://192.168.2.126:8000/api/delete_transaction`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        id: request,
      },
    }).then((response) => {
      resolve(response);
    })
      .catch((error) => {
        reject(error);
      });
  });

};

// Update Transaction
export const UpdateTransaction = async request => {
  try {
    const bearer_Token = await fetchBearerToken();
    const Endpoints = `${URL_CONSTANTS.update_Transaction}?slug=${request}`;
    const response = await axios.get(Endpoints, bearer_Token);
    return response.data.transaction_details;
  } catch (error) {
    return error.response;
  }
  return false;
};

// Uploading Image
export const imageUpload = async payloadRequest => {
  try {
    const bearer_Token = await fetchBearerToken();
    const Endpoints = `${URL_CONSTANTS.upload_Image}`;
    let formData = new FormData();
    formData.append('image', JSON.stringify(payloadRequest.image.base64));
    formData.append('folder', 'ExpenseBills');
    formData.append('extension', 'png');
    formData.append('filename', 'icon');
    const response = await axios.post(Endpoints, formData, bearer_Token);
    return response.data;
  } catch (error) {
    return error;
  }
  return false;
};

// Uploading image from Gallery (Multiple images)
export const multiImageUpload = async payloadRequest => {
  // console.log('Payload in helpers multi ===== ', payloadRequest.imageload);
  try {
    const bearer_Token = await fetchBearerToken();
    const Endpoints = `${URL_CONSTANTS.multiImage}`;
    const imageDataJSON = payloadRequest.imageload;
    let formData = new FormData();
    for (let i = 0; i < payloadRequest.imageload.length; i++) {
      const imagePath = payloadRequest.imageload[i].path;
      const newImageUri = 'file:/' + imagePath.split('file:/').join('');

      formData.append('image_data[]', {
        uri: newImageUri,
        name: imagePath.split('/').pop(),
        type: 'image/jpeg', // You may need to determine the correct MIME type
      });
    }
    formData.append('folder', 'ExpenseBills');
    formData.append('extension', 'png');
    formData.append('filename', 'icon');
    const response = await axios.post(Endpoints, formData, bearer_Token);
    return response.data;
  } catch (error) {
    return error;
  }
  return false;
};

// download Excel Sheet
export const downloadExcelSheet = async request => {
  try {
    const bearer_Token = await fetchBearerToken();
    const Endpoints = `${URL_CONSTANTS.download_Excel}?start_date=${request.start_Date}&end_date=${request.end_Date}`;
    const response = await axios.get(Endpoints, bearer_Token);
    // console.log("Downloading ==== ",response.data.$transaction_excel_date)
    return response.data.transaction_excel_data;
  } catch (error) {
    // console.log("Eroorrr ==== ",error)
    return error;
  }
  return false;
};

// edit password from profile page

export const changePassword = async(request) =>{
  // console.log("received === ",request)
  const bearer_Token = await fetchBearerToken();
  const response = await axios.post(URL_CONSTANTS.edit_password, request,bearer_Token);
  // console.log("response",response)
  return response;
}

// fetching token
const fetchBearerToken = async () => {
  try {
    // fetching access token
    const token = await AsyncStorage.getItem('User_Token');

    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
    } else {
      console.log('No token stored');
    }
  } catch (error) {
    console.log("token couldn't be accessed!", error);
  }
  return false;
};

const SimpleBearerToken = async () => {
  try {
    // Retrieve the credentials
    const acesstoken = await AsyncStorage.getItem('User_Token');

    if (acesstoken) {
      return {
        headers: {
          Authorization: `Bearer ${acesstoken}`,
          'Content-Type': 'application/json',
        },
      };
    } else {
      console.log('No token stored');
    }
  } catch (error) {
    console.log("token couldn't be accessed!", error);
  }
  return false;
};
