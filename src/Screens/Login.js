import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustTextInput from '../Components/CustTextInput';
import CustButton from '../Components/CustButton';
import {primaryColor} from '../Utils/CustomColors';
import {screenNames, globalStyle} from '../Constants/constant';
import {useNavigation} from '@react-navigation/native';
import Loading from '../Components/Loader';
import fireStore from '@react-native-firebase/firestore';

export default function Login() {
  const navigation = useNavigation();
  let initialState = {email: '', password: ''};
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [data, setData] = useState(initialState);

  // useEffect(() => {
  //   getData()
  // }, [])

  // const getData =async() =>{
  //   const firebaseData = await fireStore().collection('Users').doc('Tca1k4Fm9nESkQa7W6yV').get()
  //   // console.log("Data fetched == ",firebaseData)
  // }

  const handleTextChange = async (key, value) => {
    setData({...data, [key]: value});
  };

  const handleSubmit = async () => {
    if (data.email == '' || data.password == '') {
      setErrMsg('All the fields are mandatory');
      setLoading(false);
      return;
    } else {
      const usersCollection = await fireStore().collection('Users')
      usersCollection.where('email','==',data.email).get().then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log('User not found');
          return;
        }

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          console.log("User",user)
          if (user.password === data.password) {
            // Perform whatever you want after login
            navigation.navigate(screenNames.DashBoard)
          } else {
            console.log('Invalid password');
          }
        });
      })

      .catch((error) => {
        console.log('Error getting user:', error);
      });

    }
    // navigation.navigate(screenNames.DashBoard)
    // const usersCollection = await fireStore().collection('Users').get()
    // .then(collectionSnapshot => {
    //     collectionSnapshot.forEach(documentSnapshot => {
    //             console.log(documentSnapshot.data().email +' '+documentSnapshot.data().password);
    //         });
    // });
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
          />
          <CustTextInput
            placeholderText="Password"
            iconType="lock"
            onChangeText={text => handleTextChange('password', text)}
            secureTextEntry={true}
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
