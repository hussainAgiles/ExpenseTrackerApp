import {ScrollView, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import CustTextInput from '../Components/CustTextInput';
import CustButton from '../Components/CustButton';
import { primaryColor } from '../Utils/CustomColors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';

export default function Registration() {
  const navigation= useNavigation();
  return (
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
      />
      <CustTextInput
        placeholderText="Last Name"
        iconType="form"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <CustTextInput
        placeholderText="Email"
        iconType="mail"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <CustTextInput
        placeholderText="Password"
        iconType="lock"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <CustTextInput
        placeholderText="Confirm Password"
        iconType="lock"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />
      <CustButton title="Register" />
      <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.navButtonText}>Have an account? Sign In</Text>
          </TouchableOpacity>
    </ScrollView>
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
