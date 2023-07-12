import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustTextInput from '../Components/CustTextInput';
import CustButton from '../Components/CustButton';
import {primaryColor} from '../Utils/CustomColors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import fireStore from '@react-native-firebase/firestore';
import Loading from '../Components/Loader';
import { globalStyle, screenNames } from '../Constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userNameErrMsg } from '../Utils/ErrorStrings';
import toast from 'react-native-simple-toast'


export default function Registration() {
  
  const navigation = useNavigation();
  const generateUUID = () => {
    let uuid = '';
  
    for (let i = 0; i < 16; i++) {
      const randomHex = Math.floor(Math.random() * 8).toString(8);
      uuid += randomHex;
      if (i === 7 || i === 11 || i === 14) {
        uuid += '-';
      }
    }
    
    return uuid;
  }

  let initialState = {firstname:'',lastname:'',email: '', password: '',confirm_password:''};
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg,setErrMsg] = useState('');
  

  const [firstnameErr,setFirstnameErr] = useState(null)
  const [lastnameErr,setLastnameErr] = useState(null)
  const [emailErr,setEmailErr] = useState(null)
  const [passwordError,setPasswordError] = useState(null)
  const [conpasswordError,setConfirmPasswordError] = useState(null)


  const handleTextChange = async (key, value) => {
    await setData({...data, [key]: value});
  };


  const validation =()=>{
    // if(data.firstname == '' || data.lastname == ''|| data.email == '' || data.password == ''|| data.confirm_password == ''){
    //   toast.show('Please enter the details')
    // }

    if(data.firstname === ''){
      setFirstnameErr("First name cannot be empty")
    }

    if(data.lastname === ''){
      setLastnameErr(" lastname cannot be empty")
    }

    if(data.email === ''){
      setEmailErr("email cannot be empty")
    }

    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    // if (reg.test(data.email) === false) {
    //   setEmailErr('Incorrect email address');
    //   return false;
    // }

    if(data.password === ''){
      setPasswordError("password cannot be empty")
    }

    if(data.confirm_password === ''){
      setConfirmPasswordError("cannot be empty")
    }


  }

  // const validateEmail = (email) => {
  //   const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //   if (regex.test(email) === false) {
  //     setEmailErr('Invalid format of  email address');
  //     return false;
  //   }
   
  // };

  const checkValidation = () =>{
    if (data.firstname.length === 0) {
      setFirstnameErr('Please enter firstname');
      return false;
    }

    if (data.lastname.length === 0) {
      setLastnameErr('Please enter your lastname');
      return false;
    }

    if (data.email.length === 0) {
      setEmailErr('Please enter your email');
      return false;
    }



    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(data.email) === false) {
      setEmailErr('Incorrect email address');
      return false;
    }

    if (data.password.length === 0) {
      setPasswordError('Password must be of atleast 6 characters');
      return false;
    }
    if (data.password !== data.confirm_password) {
      setConfirmPasswordError('Passwords must match');
      return false;
    }
  
    return true;

  }

  const handleRegister = async () => {
    if(Boolean(validation())){
      // console.log("hello")
      const uid = generateUUID();
      const response = await fireStore().collection('Users').add({Uuid :uid,
        ...data}).then(()=>{
          toast.show('You are Registered successfully', toast.CENTER);
          navigation.navigate(screenNames.DashBoard);
      })
    }
  };


  return (
    <>
      {isLoading ? (
        <View>
          <Loading />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <AntDesign name="adduser" size={25} color={primaryColor} />
            <Text style={styles.text}>Create an account</Text>
          </View>
          <CustTextInput
            placeholderText="First Name"
            iconType="form"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => handleTextChange('firstname',text)}
          />
          {firstnameErr !== 0 && (
            <Text style={globalStyle.errorRegisteration}>{firstnameErr}</Text>
          )}
          <CustTextInput
            placeholderText="Last Name"
            iconType="form"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => handleTextChange('lastname',text)}
          />
          {lastnameErr !== 0 && (
            <Text style={globalStyle.errorRegisteration}>{lastnameErr}</Text>
          )}
          <CustTextInput
            placeholderText="Email"
            iconType="mail"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={text => handleTextChange('email',text)}
          />
          {emailErr !== 0 && (
            <Text style={globalStyle.errorRegisteration}>{emailErr}</Text>
          )}
          <CustTextInput
            placeholderText="Password"
            iconType="lock"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => handleTextChange('password',text)}
          />
          {passwordError !== 0 && (
            <Text style={globalStyle.errorRegisteration}>{passwordError}</Text>
          )}
          <CustTextInput
            placeholderText="Confirm Password"
            iconType="lock"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => handleTextChange('confirm_password',text)}
          />
          {conpasswordError !== 0 && (
            <Text style={globalStyle.errorRegisteration}>{conpasswordError}</Text>
          )}
          <CustButton title="Register" onPress={handleRegister} />
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.navButtonText}>Have an account? Sign In</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 25,
    marginLeft: 5,
    color: primaryColor,
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: primaryColor,
    fontFamily: 'Lato-Regular',
  },
});
