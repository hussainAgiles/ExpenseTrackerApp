import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import Lottie from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native';
import { screenNames } from '../Constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
    
    const navigation = useNavigation()
    useEffect(() => {
        setTimeout(async() => {
         const fetchedToken = await AsyncStorage.getToken('User_Token')
            if(fetchedToken){
              navigation.navigate(screenNames.DashBoard)
            }else{
              navigation.navigate(screenNames.Login)
            }
        }, 4000);
    }, [])

    
    
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Lottie source={require('../../assets/Animation/ExpenseWallet.json')} autoPlay loop
        style={{width: 400, height: 400}}/>
    </View>
  )
}

const styles = StyleSheet.create({})