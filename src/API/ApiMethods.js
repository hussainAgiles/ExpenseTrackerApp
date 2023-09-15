import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from 'react-native-simple-toast';
import API from "./Api";


const POST = async(EndPoint,OnSuccess) =>{
  try {
    const response = await API.post(EndPoint);
    return OnSuccess(response);
  } catch (error) {
    handleErrorResponse(error);
  }
}


const POSTREQUEST = async(EndPoint,Request,OnSuccess) =>{
  try {
    const response = await API.post(EndPoint,Request);
    return OnSuccess(response);
  } catch (error) {
    handleErrorResponse(error);
  }
}

const GET = async(EndPoint,OnSuccess) =>{
  try {
    const response = await API.get(EndPoint);
    return OnSuccess(response);
  } catch (error) {
    handleErrorResponse(error);
  }
}

const handleErrorResponse = error => {
  // console.log(`error`, error);
  Toast.show(error);
};

export {POST, GET, POSTREQUEST};
