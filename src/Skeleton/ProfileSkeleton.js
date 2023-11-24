import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProfileSkeleton = () => {
  return (
    <ScrollView style={{flex: 1}}>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={{flexDirection: 'row'}}>
          <View style={{height: 200, width: '100%'}} />
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
       <View style={{justifyContent:"center",alignItems:'center',marginTop:'15%'}}>
        {/* <Text style={{height:150,width:150,borderRadius:75,position:'absolute',top:-135,left: 140,}}></Text> */}
        <Text style={{height:30,width:250,marginTop:'3%'}}></Text>
        <Text style={{height:30,width:150,marginTop:'3%'}}></Text>
       </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
       <View style={{marginTop:'7%',marginHorizontal:'8%'}}>
       <Text style={{height:30,width:150,marginVertical:'3%',}}></Text>
        <Text style={{height:30,width:350}}></Text>
       </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
       <View style={{marginVertical:'2%',marginHorizontal:'8%'}}>
       <Text style={{height:30,width:150,marginVertical:'3%',}}></Text>
        <Text style={{height:30,width:350}}></Text>
       </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
       <View style={{marginVertical:'2%',marginHorizontal:'8%'}}>
       <Text style={{height:30,width:150,marginVertical:'3%',}}></Text>
        <Text style={{height:30,width:350}}></Text>
       </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
       <View style={{marginVertical:'2%',marginHorizontal:'8%'}}>
       <Text style={{height:30,width:350,marginVertical:'3%',borderRadius:25}}></Text>
        <Text style={{height:30,width:350,borderRadius:25}}></Text>
       </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default ProfileSkeleton;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  profileView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '8%',
    position: 'absolute',
    top: '18%',
    left: '35%',
    backgroundColor: '#fff',
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
    height: 10,
    width: 150,
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
