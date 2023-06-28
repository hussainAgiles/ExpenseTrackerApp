import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState,useEffect} from 'react';
import CustTextInput from '../Components/CustTextInput';
import CustButton from '../Components/CustButton';
import {primaryColor} from '../Utils/CustomColors';
import {screenNames,globalStyle} from '../Constants/constant';
import {useNavigation} from '@react-navigation/native';
import Loading from '../Components/Loader';
import fireStore from '@react-native-firebase/firestore'

export default function Login() {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(''); 
  const [data,setData] = useState({})

  useEffect(() => {
    const firebaseData = fireStore().collection('Users').doc('Tca1k4Fm9nESkQa7W6yV')
    console.log("Dtata fetched == ",firebaseData)
  }, [])
  

  const handleTextChange = (key,value) =>{
    setData({...data,[key]:value})
  }


  const handleSubmit = ()=>{
    // setLoading(true)
   
    
  }

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
          <CustTextInput placeholderText="Email" iconType="mail" onChangeText={text => handleTextChange('email',text)}/>
          <CustTextInput placeholderText="Password" iconType="lock" onChangeText={text => handleTextChange('password',text)} secureTextEntry={true} />
          {errMsg.trim().length !== 0 && (
            <Text style={globalStyle.error}>{errMsg}</Text>
          )}
          <CustButton title="Sign In" onPress={handleSubmit}/>
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
    fontFamily: 'Lato-BlackItalic',
    fontSize: 28,
    marginBottom: 10,
    color: primaryColor,
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
    fontFamily: 'Lato-Regular',
  },
});
