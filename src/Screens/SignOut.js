import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {screenNames} from '../Constants/constant';

const SignOut = ({}) => {
  const navigation = useNavigation();
  useEffect(() => {
    setLogoutModalVisible(true);
  }, []);

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const onLogout = () => {
    // Implement your logout logic here
    // For example, clear user session, remove tokens, etc.
    AsyncStorage.removeItem('User_Token');
    AsyncStorage.removeItem('userId');
    setLogoutModalVisible(false);
    navigation.replace(screenNames.Login);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isLogoutModalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              color: '#000000',
              fontSize: 13,
              textAlign: 'center',
              fontFamily: 'Lato-Regular',
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
                <Text style={styles.textStyle}>LOG OUT</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setLogoutModalVisible(false);
                  navigation.navigate(screenNames.Home)
                }}>
                <Text style={styles.textStyle}>CANCEL</Text>
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
        fontSize: 16,
        fontFamily: "Lato-Regular",
    },

});
