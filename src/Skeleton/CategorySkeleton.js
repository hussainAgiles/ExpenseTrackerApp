import {StyleSheet, ScrollView, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CategorySkeleton = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SkeletonPlaceholder borderRadius={4} backgroundColor='#ccc'>
      <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',padding:20,borderBottomWidth:0.75,}}>
        <View style={styles.searchBar}></View>
        <View style={styles.dateText}></View>
      </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor='#ccc'>
      <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',padding:20,borderBottomWidth:0.75,}}>
        <View style={styles.searchBar}></View>
        <View style={{width:50,height:60,marginHorizontal:5}}></View>
      </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor='#ccc'>
      <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',padding:20,borderBottomWidth:0.75,}}>
        <View style={styles.searchBar}></View>
        <View style={{width:50,height:60,marginHorizontal:5}}></View>
      </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor='#ccc'>
      <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',padding:20,borderBottomWidth:0.75,}}>
        <View style={styles.searchBar}></View>
        <View style={{width:50,height:60,marginHorizontal:5}}></View>
      </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor='#ccc'>
      <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',padding:20,borderBottomWidth:0.75,}}>
        <View style={styles.searchBar}></View>
        <View style={{width:50,height:60,marginHorizontal:5}}></View>
      </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor='#ccc'>
      <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',padding:20,borderBottomWidth:0.75,}}>
        <View style={styles.searchBar}></View>
        <View style={{width:50,height:60,marginHorizontal:5}}></View>
      </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor='#ccc'>
      <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',padding:20,borderBottomWidth:0.75,}}>
        <View style={styles.searchBar}></View>
        <View style={{width:50,height:60,marginHorizontal:5}}></View>
      </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor='#ccc'>
      <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',padding:20,borderBottomWidth:0.75,}}>
        <View style={styles.searchBar}></View>
        <View style={{width:50,height:60,marginHorizontal:5}}></View>
      </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor='#ccc'>
      <View style={{ flexDirection: 'row',
            justifyContent: 'space-between',padding:20,borderBottomWidth:0.75,}}>
        <View style={styles.searchBar}></View>
        <View style={{width:50,height:60,marginHorizontal:5}}></View>
      </View>
      </SkeletonPlaceholder>
      
    </ScrollView>
  );
};

export default CategorySkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar:{
    backgroundColor: '#BDBDBD',
    width: '85%',
    height: 60,
  },
  dateText: {
    backgroundColor: '#BDBDBD',
    width: 60,
    height:60,
    borderRadius: 30,
    marginLeft:5
  },
});
