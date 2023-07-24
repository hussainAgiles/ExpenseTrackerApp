import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {deviceHeight} from '../Utils/Dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../Constants/constant';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <View>
            <Text style={{textAlign:"center"}}>DashBoard</Text>
        </View> */}
      <View
        style={{
          width: '90%',
          backgroundColor: '#03707a',
          borderRadius: 20,
          padding: 8,
          height: 40,
          marginLeft: '5%',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            name="arrow-left-thin"
            size={Sizes.h3}
            color={focused ? primaryColor : '#000000'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
});
