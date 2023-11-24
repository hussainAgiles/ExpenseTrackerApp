import React from 'react';
import {View, StyleSheet, Dimensions,Image,Text} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
export const SKELETON_SPEED = 1500;
export const SKELETON_BG = '#dddddd';
export const SKELETON_HIGHLIGHT = '#e7e7e7';
export const MAX_RATING_DEVIATION = 200;
const {width, height} = Dimensions.get('window');

const ExampleSkel = () => (
  <SkeletonPlaceholder borderRadius={4}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 20}}>
          <Image style={{width: 120, height: 20}} src={require('../Images/Gold.png')} />
          <Text style={{marginTop: 6, fontSize: 14, lineHeight: 18}}>Hello world</Text>
        </View>
      </View>
    </SkeletonPlaceholder>
);

const styles = StyleSheet.create({
  skeltonImageView: {
    width: width / 5,
    margin: 8,
    borderWidth: 0,
    height: height / 11,
  },
  skeltonMainView: {
    width: width / 1.4,
    margin:8,
    borderWidth: 0,
    height: height / 16,
    elevation: 5,
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: {height: 0, width: 0},
    borderRadius: 5,
    // height: globals.screenHeight * 0.24,
  },
  skeltonChangePasswordView: {
    width: '96%',
    margin: 8,
    borderWidth: 0,
    borderRadius: 5,
    height: height * 0.13,
    elevation: 5,
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: {height: 0, width: 0},
  },
});

export default ExampleSkel;