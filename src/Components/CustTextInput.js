import { StyleSheet, View, TextInput,Text } from 'react-native';
import React from 'react';
import { deviceHeight, deviceWidth } from '../Utils/Dimension';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Sizes } from '../Constants/constant';

export default function CustTextInput({
  labelValue,
  placeholderText,
  onChangeText,
  iconType,
  autoCapitalize,
  autoCorrect,
  secureTextEntry,
  keyboardType,
  error,
  errorMessage
}) {
  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
          <AntDesign name={iconType} size={25} color="#03707a" />
        </View>
        <TextInput
          value={labelValue}
          style={styles.input}
          numberOfLines={1}
          placeholder={placeholderText}
          placeholderTextColor="#666"
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
      {error && (
        <View style={{ marginLeft: Sizes.medium, marginTop: -Sizes.base * 2 }}>
          <Text style={{fontSize:10, color:'red' }}>
            {errorMessage}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: deviceHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: deviceWidth / 1.5,
    height: deviceHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
