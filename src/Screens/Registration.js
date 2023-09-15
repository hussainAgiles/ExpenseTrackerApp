import fireStore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import toast from 'react-native-simple-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustButton from '../Components/CustButton';
import CustTextInput from '../Components/CustTextInput';
import Loading from '../Components/Loader';
import {globalStyle, screenNames} from '../Constants/constant';
import {primaryColor} from '../Utils/CustomColors';

export default function Registration() {
  const navigation = useNavigation();
  // Generating Unique UserId

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
  };

  let initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirm_password: '',
  };
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [firstnameErr, setFirstnameErr] = useState(null);
  const [lastnameErr, setLastnameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [conpasswordError, setConfirmPasswordError] = useState(null);

  const handleTextChange = async (key, value) => {
    setData({...data, [key]: value});
  };

  const validation = () => {
    if (data.firstname === '') {
      setFirstnameErr('First Name cannot be empty');
      return false;
    }

    if (data.lastname === '') {
      setLastnameErr(' Last Name cannot be empty');
      return false;
    }

    if (data.email === '') {
      setEmailErr('Email cannot be empty');
      return false;
    }
    if (data.email !== '') {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(data.email) === false) {
        setEmailErr('Incorrect email address');
        return false;
      }
    }

    if (data.password === '') {
      setPasswordError('Password cannot be empty');
      return false;
    }

    if (data.confirm_password === '') {
      setConfirmPasswordError('Cannot be empty');
      return false;
    }

    if (data.password !== data.confirm_password) {
      setConfirmPasswordError('Confirm password does not match');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (Boolean(validation())) {
      // console.log("hello")
      const uid = generateUUID();
      const response = await fireStore()
        .collection('Users')
        .add({Uuid: uid, ...data})
        .then(() => {
          toast.show('You are Registered successfully', toast.CENTER);
          navigation.replace(screenNames.DashBoard);
        });
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
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={text => handleTextChange('firstname', text)}
            onFocus={() => {
              setFirstnameErr(null);
            }}
          />
          {firstnameErr !== 0 && (
            <View style={{alignItems: 'flex-start'}}>
              <Text style={globalStyle.errorRegisteration}>{firstnameErr}</Text>
            </View>
          )}
          <CustTextInput
            placeholderText="Last Name"
            iconType="form"
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={text => handleTextChange('lastname', text)}
            onFocus={() => {
              setLastnameErr(null);
            }}
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
            onChangeText={text => handleTextChange('email', text)}
            onFocus={() => {
              setEmailErr(null);
            }}
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
            onChangeText={text => handleTextChange('password', text)}
            onFocus={() => {
              setPasswordError(null);
            }}
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
            onFocus={() => {
              setConfirmPasswordError(null);
            }}
            onChangeText={text => handleTextChange('confirm_password', text)}
          />
          {conpasswordError !== 0 && (
            <Text style={globalStyle.errorRegisteration}>
              {conpasswordError}
            </Text>
          )}
          <CustButton title="Register" onPress={handleRegister} />
          <View style={{flexDirection:"row",marginVertical:10}}>
            <Text style={{fontFamily: 'EduSABeginner-SemiBold', fontSize: 18}}>
              Have an account ?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(screenNames.Register)}
              style={styles.forgotButton}>
              <Text style={styles.navButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
    fontFamily: 'EduSABeginner-SemiBold',
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
    fontFamily: 'EduSABeginner-SemiBold',
    textDecorationLine: 'underline',
  },
  forgotButton: {
    marginHorizontal: 5,
  },
});
