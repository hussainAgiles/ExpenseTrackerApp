import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import { primaryColor } from '../Utils/CustomColors';

const Loading = ({message}) => {
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <ActivityIndicator size="large" color={primaryColor} />
      {message !== undefined && (
        <Text style={{color: '#A5A5A5'}}>{message}</Text>
      )}
    </View>
  );
};

export default Loading;
