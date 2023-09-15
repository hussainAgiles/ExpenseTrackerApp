// This page contains all the api functions

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {URL_CONSTANTS} from '../API/Endpoints';

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
  console.log('request add ====', request);
  const bearer_token = await fetchBearerToken();
  try {
    const response = await axios.post(
      URL_CONSTANTS.add_Transaction,
      request,
      bearer_token,
    );
    // console.log("Add trnxn 1111 === ",response.data)
    console.log('Add trnxn === ', response.data.transaction_details);
    return response;
  } catch (error) {
    return error.response;
  }
  return false;
};

// Fetch Transaction History
export const fetchTransactionHistory = async request => {
  try {
    const bearer_Token = await fetchBearerToken();
    const Endpoints = `${URL_CONSTANTS.fetch_Transaction}`;
    const response = await axios.get(Endpoints, bearer_Token);
    // console.log("response fetch transaction history === ",response.data.transaction_details)
    return response.data.transaction_details;
  } catch (error) {
    return error.response;
  }
  return false;
};

// delete transaction
export const deleteTransaction = async request => {
  try {
    const bearer_Token = await fetchBearerToken();
    const Endpoints = `${URL_CONSTANTS.delete_Transaction}?id=${request}`;
    const response = await axios.post(Endpoints, bearer_Token);
    return response;
  } catch (error) {
    return error.response;
  }
  return false;
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
export const imageUpload = async request => {
  try {
    const bearer_Token = await fetchBearerToken();
    const Endpoints = `${URL_CONSTANTS.Upload_Image}`;
    let data = new FormData();
    const imageUri = 'file:///' + request.image.path.split('file:/').join('');
    const name = imageUri.split('/').pop();
    data.append('folder', request.folder);
    data.append('image', {
      uri: imageUri,
      name: name,
      type: request.image.mime,
    });
    const response = await axios.post(Endpoints, data, bearer_Token);
    // console.log("Response === ",response.data)
    return response.data;
  } catch (error) {
    // console.log("Response Error=== ",error)
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

// fetching token
const fetchBearerToken = async () => {
  try {
    // Retrieve the credentials
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
