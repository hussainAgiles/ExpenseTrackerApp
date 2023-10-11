import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
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
import {handleLogin} from '../Helpers/helpers';
import {primaryColor, textColor} from '../Utils/CustomColors';

const screenWidth = Dimensions.get('window').width - 90;
const actualScreenWidth = Dimensions.get('screen').width;

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
    setDisable(true);
    const request = {
      auto_gen_emp_id: data.email,
      password: data.password,
    };
    if (data.email == '' || data.password == '') {
      setErrMsg('Field cannot be blank');
      setLoading(false);
      setDisable(false);
      return;
    } else {
      const response = await handleLogin(request);
      // console.log("response login == ",response.data);
      if (response.request.status === 200) {
        AsyncStorage.setItem('User_Token', response.data.access_token);
        navigation.replace(screenNames.DashBoard);
        console.log("Fetching Token after login", await AsyncStorage.getItem('User_Token'))
      } else {
        toast.show(response.data.message, toast.LONG);
      }
    }
    setDisable(false);
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
            placeholderText="Username"
            iconType="user"
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
          {disable === true ? (
            <View style={styles.buttonContainer}>
              <ActivityIndicator />
            </View>
          ) : (
            <CustButton title="Sign In" onPress={() => handleSubmit()} />
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: actualScreenWidth,
              paddingHorizontal: 20,
            }}>
            </View>
          {/* <Text style={{fontFamily: 'EduSABeginner-SemiBold', fontSize: 16}}>
              Don't have an account ?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(screenNames.Register)}
              style={styles.forgotButton}>
              <Text style={styles.navButtonText}>Create here</Text>
            </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate(screenNames.Forgot_Password)}
            style={styles.forgotPassword}>
            <Text style={styles.forgotPswText}>Forgot Password ?</Text>
          </TouchableOpacity>
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
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    backgroundColor: primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    padding: 5,
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
    marginVertical: 10,
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
    paddingTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily: 'EduSABeginner-Regular',
    fontSize: 16,
  },
});
