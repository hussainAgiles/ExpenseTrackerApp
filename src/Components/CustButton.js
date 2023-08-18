import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { deviceHeight} from '../Utils/Dimension';
import { primaryColor } from '../Utils/CustomColors';

const FormButton = ({title,onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: deviceHeight / 15,
    backgroundColor: primaryColor,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'EduSABeginner-SemiBold',
  },
});
