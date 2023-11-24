import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {screenNames} from '../Constants/constant';

const SignOut = ({isVisible,onClose}) => {
  const navigation = useNavigation();
  // useEffect(() => {
  //   setLogoutModalVisible(true);
  // }, []);

  // const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const onLogout = async() => {
    // Implement your logout logic here
    // For example, clear user session, remove tokens, etc.
    await AsyncStorage.removeItem('User_Token');
    await AsyncStorage.removeItem('userId');
    navigation.replace(screenNames.Login);
  };

  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
              textAlign: 'center',
              fontFamily:'EduSABeginner-SemiBold'
            }}>
            Are you sure you want to Logout?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              marginBottom: -20,
              justifyContent: 'center',
            }}>
            <View>
              <TouchableOpacity style={{marginRight: 20}} onPress={onLogout}>
                <Text style={[styles.textStyle,{color:"#388E3C"}]}>Log Out</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={onClose}>
                <Text style={[styles.textStyle,{color:"#C70039"}]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SignOut;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {

        backgroundColor:'#fff',
        borderRadius: 8,
        padding: 25,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    textStyle: {
        color: '#000000',
        marginTop: 4,
        marginBottom: 0,
        fontSize: 18,
        fontFamily:'EduSABeginner-Medium'
    },

});
