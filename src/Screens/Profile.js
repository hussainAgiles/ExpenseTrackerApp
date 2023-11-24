import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {imageBaseUrl} from '../API/Endpoints';
import colors from '../Constants/Colors';
import {screenNames} from '../Constants/constant';
import ProfileSkeleton from '../Skeleton/ProfileSkeleton';
import SignOut from './SignOut';

const Profile = () => {
  const [isLoading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [profileImage, setPorfileImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
  }, []);

  const fetchData = async () => {
    const userData = await AsyncStorage.getItem('User_Data');
    if (userData) {
      // Parse the user data from a string to an object (assuming it's stored as a JSON string)
      const userDataObj = JSON.parse(userData);
      const image = userDataObj.hr_employee.profile_pic;
      // console.log("Image url == ",image)
      // console.log("Image complete URL == ",imageBaseUrl+image)
      setPorfileImage(imageBaseUrl + userDataObj.hr_employee.profile_pic);
      setUserDetails(userDataObj);
      setLoading(false);
    }
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          {/* <Loader message="Please wait ..." /> */}
          <ProfileSkeleton />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{justifyContent:"center",alignItems:'center',paddingTop:'25%'}}>
            <Image
              style={styles.logo}
              source={
                profileImage
                  ? {uri: profileImage}
                  : require('../Images/UserProfile.jpg')
              }
            />
            <Text style={[styles.nameText]}>
              {userDetails && userDetails.hr_employee.full_name}
            </Text>
            <Text style={[styles.generalText]}>
              {userDetails && userDetails.hr_employee.fulllocation.county}
            </Text>
          </View>

          <View
            style={{
              padding: '5%',
              flexDirection: 'column',
              backgroundColor: colors.primary,
              position: 'relative',
              top: '15%',
            }}>
            <Text style={styles.LabelText}>Email</Text>
            <Text style={styles.fieldText}>
              {userDetails && userDetails.email}
            </Text>
            <Text style={styles.LabelText}>Phone</Text>
            <Text style={styles.fieldText}>
              {userDetails && userDetails.hr_employee.phone}
            </Text>
            <Text style={styles.LabelText}>Address</Text>
            <Text style={styles.fieldText}>
              {userDetails && userDetails.hr_employee.fulladdress}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screenNames.Edit_Password, {
                  email: userDetails.email,
                  userId: userDetails.id,
                });
              }}>
              <Text style={{color: '#fff'}}>Edit Password</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonContainer, {marginTop: 10}]}>
            <TouchableOpacity onPress={openModal}>
              <Text style={{color: '#fff'}}>Sign Out</Text>
            </TouchableOpacity>
            <SignOut isVisible={isModalVisible} onClose={closeModal} />
          </View>

          <View style={[styles.buttonContainer, {marginTop: 10}]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ComparisionScreen');
              }}>
              <Text style={{color: '#fff'}}>Compare Transaction </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    borderRadius: 60,
    height: 110,
    width: 110,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'white',
  },
  nameText: {
    paddingTop: '5%',
    fontFamily: 'EduSABeginner-Bold',
    fontSize: 25,
  },
  LabelText: {
    paddingTop: 10,
    fontFamily: 'EduSABeginner-Bold',
    fontSize: 18,
  },
  generalText: {
    paddingTop: 7,
    fontFamily: 'EduSABeginner-Regular',
    fontSize: 15,
  },
  buttonContainer: {
    width: '90%',
    backgroundColor: '#03707a',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    position: 'static',
    top: '15%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'EduSABeginner-Medium',
  },
  fieldText: {
    paddingTop: 10,
    fontFamily: 'EduSABeginner-Regular',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    paddingHorizontal: 5,
  },
});
