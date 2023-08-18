import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import CustTextInput from '../Components/CustTextInput';
import CustButton from '../Components/CustButton';
import {primaryColor, textColor} from '../Utils/CustomColors';
import {screenNames, globalStyle} from '../Constants/constant';
import {useNavigation} from '@react-navigation/native';
import Loading from '../Components/Loader';
import fireStore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toast from 'react-native-simple-toast'

export default function Login() {
  const navigation = useNavigation();
  let initialState = {email: '', password: ''};
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [data, setData] = useState(initialState);

  const emailRef = React.useRef(null);
  const passRef = React.useRef(null)

  // handling the text change on TextInput
  const handleTextChange = async (key, value) => {
    setData({...data, [key]: value});
  };

  // handling Login functionality.
  const handleSubmit = async () => {
    if (data.email == '' || data.password == '') {
      setErrMsg('All the fields are mandatory');
      setLoading(false);
      return;
    } else {
      const usersCollection = await fireStore().collection('Users')
      usersCollection.where('email','==',data.email).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
          toast.show('User not found',toast.CENTER)
          return;
        }

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          AsyncStorage.setItem('userId',user.Uuid)
          if (user.password === data.password) {
            const userToken = user.Uuid
            AsyncStorage.setItem('User_Token', userToken);
            navigation.navigate(screenNames.DashBoard)
          } else {
            toast.show('Invalid Password',toast.CENTER)
          }
        });
      })

      .catch((error) => {
        console.log('Error getting user:', error);
      });

    }
  };

  useLayoutEffect(() => {
    emailRef.current?.focus();
  }, []);

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
            // ref={emailRef}
            
            placeholderText="Email"
            iconType="mail"
            onChangeText={text => handleTextChange('email', text)}
            // autoFocus={true}
            // onSubmitEditing={() => {
            //   passRef.current.focus();
            // }}
            keyboardType='email-address'
            onFocus={()=>{setErrMsg('')}}
          />
          <CustTextInput
            // ref={passRef}
            placeholderText="Password"
            iconType="lock"
            onChangeText={text => handleTextChange('password', text)}
            secureTextEntry={true}
            onFocus={()=>{setErrMsg('')}}
          />
          {errMsg.trim().length !== 0 && (
            <Text style={globalStyle.error}>{errMsg}</Text>
          )}
          <CustButton title="Sign In" onPress={() => handleSubmit()} />
          <TouchableOpacity
            onPress={() => navigation.navigate(screenNames.Register)}
            style={styles.forgotButton}>
            <Text style={styles.navButtonText}>
              Don't have an acount ? Create here
            </Text>
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
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: primaryColor,
    fontFamily: 'EduSABeginner-SemiBold',
    textDecorationLine:"underline"
  },
});
