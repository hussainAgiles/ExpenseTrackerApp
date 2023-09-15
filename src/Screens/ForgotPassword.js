import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import toast from 'react-native-simple-toast';
import CustButton from '../Components/CustButton';
import CustTextInput from '../Components/CustTextInput';
import Loading from '../Components/Loader';
import { screenNames } from '../Constants/constant';
import { handleForgotpassword } from '../Helpers/helpers';
import { primaryColor, textColor } from '../Utils/CustomColors';

const screenWidth = Dimensions.get('window').width - 90;

export default function ForgotPassword() {
  const navigation = useNavigation();
  let initialState = {email: ''};
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);
  const [errMsg, setErrMsg] = useState('');


  // handling the text change on TextInput
  const handleTextChange = async (key, value) => {
    setData({...data, [key]: value});
  };

  // handling Forgot password functionality.
  const handleSubmit = async () => {
    const request ={
      email : data.email
    }
    const response = await handleForgotpassword(request);
    if (response.status === 200) {
      navigation.navigate(screenNames.Otp_Verification,{email:data.email});
    } else {
      toast.show('Invalid Data', toast.CENTER);
    }
  };

 

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <Loading />
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <Image
            source={require('../../assets/Images/Unlock.jpg')}
            style={styles.logo}
          />
          <Text style={styles.text}>Recover Password</Text>
          <CustTextInput  
            placeholderText="Email"
            iconType="mail"
            onChangeText={text => handleTextChange('email', text)}
            keyboardType='email-address'
            onFocus={()=>{setErrMsg('')}}
            autoCapitalize='none'
          />
          <CustButton title="Recover" onPress={() => handleSubmit()} /> 
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'EduSABeginner-SemiBold',
    fontSize: 28,
    marginBottom: 10,
    color: textColor,
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 15,
  },
  navButtonText: {
    fontSize: 18,
    color: primaryColor,
    fontFamily: 'EduSABeginner-SemiBold',
    textDecorationLine:"underline"
  },
  rightIconStyle:{
    paddingRight:10
  },
  forgotPswText: {
    fontSize: 18,
    color: primaryColor,
    fontFamily: 'EduSABeginner-SemiBold',
    textDecorationLine:"underline"
  },
  forgotPassword: {
    margin: screenWidth-290,
  },
});
