import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

const OnBoarding = () => {
  return (
      <Onboarding
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('../../assets/Images/education.png')} style={{height:'50%',width:'50%'}}  />,
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
            
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('../Images/Gold.png')} style={{height:'50%',width:'50%'}}/>,
            title: 'Gold Screen',
            subtitle: 'Done with React Native Gold Swiper',
          },
        ]}
      />
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
