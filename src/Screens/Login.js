import AsyncStorage from '@react-native-async-storage/async-storage';
import fireStore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import toast from 'react-native-simple-toast';
import CustButton from '../Components/CustButton';
import CustTextInput from '../Components/CustTextInput';
import Loading from '../Components/Loader';
import {globalStyle, screenNames} from '../Constants/constant';
import {primaryColor, textColor} from '../Utils/CustomColors';
import {setClientToken} from '../API/Api';
import {handleLogin} from '../Helpers/helpers';

const screenWidth = Dimensions.get('window').width - 90;

export default function Login() {
  const navigation = useNavigation();
  let initialState = {email: '', password: ''};
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [data, setData] = useState(initialState);

  const emailRef = React.useRef(null);
  const passRef = React.useRef(null);
  const [secureText, setSecureText] = useState(true);
  const [disable, setDisable] = useState(false);

  // handling the text change on TextInput
  const handleTextChange = async (key, value) => {
    setData({...data, [key]: value});
  };

  // handling Login functionality.
  const handleSubmit = async () => {
    const request = {
      email: data.email,
      password: data.password,
    };
    if (data.email == '' || data.password == '') {
      setErrMsg('All fields are mandatory');
      setLoading(false);
      return;
    } else {
      // setDisable(true)
      const response = await handleLogin(request);
      if (response.status === 200) {
        AsyncStorage.setItem('User_Token', response.data.access_token);
        navigation.replace(screenNames.DashBoard);
      } else {
        toast.show(response.data.message, {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    }
  };

  useLayoutEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSecureText = () => {
    setSecureText(!secureText);
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
            source={require('../../assets/Images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.text}>Expense Tracker</Text>
          <CustTextInput
            placeholderText="Email"
            iconType="mail"
            onChangeText={text => handleTextChange('email', text)}
            keyboardType="email-address"
            onFocus={() => {
              setErrMsg('');
            }}
            autoCapitalize="none"
          />
          <CustTextInput
            autoCapitalize="none"
            placeholderText="Password"
            iconType="lock"
            onChangeText={text => handleTextChange('password', text)}
            secureTextEntry={secureText}
            onFocus={() => {
              setErrMsg('');
            }}
            rightIcon={secureText ? 'visibility-off' : 'visibility'}
            rightIconOnPress={handleSecureText}
            rightIconStyle={styles.rightIconStyle}
          />
          {errMsg.trim().length !== 0 && (
            <Text style={globalStyle.error}>{errMsg}</Text>
          )}
          {}
          <CustButton
            title="Sign In"
            onPress={() => handleSubmit()}
            disabled={disable}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontFamily:'EduSABeginner-SemiBold',fontSize:18}}>Don't have an account ?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(screenNames.Register)}
              style={styles.forgotButton}>
              <Text style={styles.navButtonText}>Create here</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(screenNames.Forgot_Password)}
              style={styles.forgotPassword}>
              <Text style={styles.forgotPswText}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
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
    marginHorizontal: 5,
  },
  navButtonText: {
    fontSize: 18,
    color: primaryColor,
    fontFamily: 'EduSABeginner-SemiBold',
    textDecorationLine: 'underline',
  },
  rightIconStyle: {
    paddingRight: 10,
  },
  forgotPswText: {
    fontSize: 18,
    color: primaryColor,
    fontFamily: 'EduSABeginner-SemiBold',
    textDecorationLine: 'underline',
  },
  forgotPassword: {
    margin: screenWidth - 290,
  },
  placeholderText :{
    fontFamily:"EduSABeginner-Regular",
    fontSize:16
  }
});
