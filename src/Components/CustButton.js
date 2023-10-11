import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { deviceHeight} from '../Utils/Dimension';
import { primaryColor } from '../Utils/CustomColors';
import { ActivityIndicator } from 'react-native-paper';

const FormButton = ({title,onPress,disabled}) => {
  return (
    <TouchableOpacity disabled={disabled} style={styles.buttonContainer} onPress={onPress}>
      {
        disabled === true ?
        <ActivityIndicator/> : <Text style={styles.buttonText}>{title}</Text>

      }
     {/* <Text style={styles.buttonText}>{title}</Text>  */}
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    backgroundColor: primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    padding:5
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 45,
    color: '#fff',
    fontFamily: 'EduSABeginner-SemiBold',
  },
});
