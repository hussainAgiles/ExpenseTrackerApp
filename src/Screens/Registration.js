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

export default function Registration() {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = async (key, value) => {
    await setData({...data, [key]: value});
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const response = await fireStore().collection('Users').add(data).then(()=>{
      Alert.alert('success','You are Registered successfully',[{
        text:'ok',onPress:()=>{
          navigation.navigate('Login')
        }
      }])
    })
    setIsLoading(false);
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
          <CustTextInput
            placeholderText="Last Name"
            iconType="form"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => handleTextChange('lastname',text)}
          />
          <CustTextInput
            placeholderText="Email"
            iconType="mail"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={text => handleTextChange('email',text)}
          />
          <CustTextInput
            placeholderText="Password"
            iconType="lock"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => handleTextChange('password',text)}
          />
          <CustTextInput
            placeholderText="Confirm Password"
            iconType="lock"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => handleTextChange('confirm_password',text)}
          />
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
