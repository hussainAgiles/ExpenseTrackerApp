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

  const handleTextChange = async (key, value) => {
    await setData({...data, [key]: value});
  };


  const checkValidation = () =>{
    if (
      data.firstname.length === 0 ||
      data.lastname.length === 0 ||
      data.email.length === 0
    ) {
      setErrMsg('All the fields are mandatory');
      return false;
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(data.email) === false) {
      setErrMsg('Incorrect email address');
      return false;
    }

    if (data.password.length < 6) {
      setErrMsg('Password must be of atleast 6 characters');
      return false;
    }
    if (data.password !== data.confirm_password) {
      setErrMsg('Passwords must match');
      return false;
    }
  
    return true;

  }

  const handleRegister = async () => {
    setIsLoading(true)

    if(checkValidation() === true){
      const uid = generateUUID();
      const response = await fireStore().collection('Users').add({Uuid :uid,
        ...data}).then(()=>{
        Alert.alert('success','You are Registered successfully',[{
          text:'ok',onPress:()=>{
            navigation.navigate(screenNames.DashBoard)
          }
        }])
      })
      setIsLoading(false);
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
          {errMsg.trim().length !== 0 && (
            <Text style={globalStyle.errorRegisteration}>{errMsg}</Text>
          )}
          <CustTextInput
            placeholderText="Last Name"
            iconType="form"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => handleTextChange('lastname',text)}
          />
          {errMsg.trim().length !== 0 && (
            <Text style={globalStyle.errorRegisteration}>{errMsg}</Text>
          )}
          <CustTextInput
            placeholderText="Email"
            iconType="mail"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={text => handleTextChange('email',text)}
          />
          {errMsg.trim().length !== 0 && (
            <Text style={globalStyle.errorRegisteration}>{errMsg}</Text>
          )}
          <CustTextInput
            placeholderText="Password"
            iconType="lock"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => handleTextChange('password',text)}
          />
          {errMsg.trim().length !== 0 && (
            <Text style={globalStyle.errorRegisteration}>{errMsg}</Text>
          )}
          <CustTextInput
            placeholderText="Confirm Password"
            iconType="lock"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => handleTextChange('confirm_password',text)}
          />
          {errMsg.trim().length !== 0 && (
            <Text style={globalStyle.errorRegisteration}>{errMsg}</Text>
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
