import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const AddTranxnSkeleton = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={{flexDirection: 'column', marginHorizontal: 10}}>
          <Text style={{width: 100, height: 30, marginVertical: 10}}></Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.categorybox}></Text>
            <Text style={styles.categorybox}></Text>
            <Text style={styles.categorybox}></Text>
            <Text style={styles.categorybox}></Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.categorybox}></Text>
            <Text style={styles.categorybox}></Text>
            <Text style={styles.categorybox}></Text>
            <Text style={styles.categorybox}></Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.categorybox}></Text>
            <Text style={styles.categorybox}></Text>
            <Text style={styles.categorybox}></Text>
            <Text style={styles.categorybox}></Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.categorybox}></Text>
            <Text style={styles.categorybox}></Text>
            <Text style={styles.categorybox}></Text>
            <Text style={styles.categorybox}></Text>
          </View>
        </View>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={styles.containerBox}>
          <Text style={{width: 100, height: 30, marginHorizontal: 5}}></Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{width: 60, height: 60, marginVertical: 10}}></Text>
              <Text
                style={{
                  width: 60,
                  height: 60,
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}></Text>
            </View>
            <Text
              style={{
                width: 40,
                height: 40,
                marginVertical: 10,
                alignSelf: 'center',
              }}></Text>
          </View>
        </View>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={styles.containerBox}>
          <Text style={{width: 100, height: 30, marginHorizontal: 5}}></Text>
          <Text style={{width: 350, height: 50, marginVertical: 5}}></Text>
        </View>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={styles.containerBox}>
          <Text style={{width: 100, height: 30, marginHorizontal: 5}}></Text>
          <Text style={{width: 350, height: 50, marginVertical: 5}}></Text>
        </View>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={styles.imageConatiner}>
          <Text
            style={{
              width: 100,
              height: 30,
              marginHorizontal: 5,
              alignSelf: 'center',
            }}></Text>
          <Text
            style={{
              width: 40,
              height: 40,
              marginVertical: 5,
              marginHorizontal: 5,
            }}></Text>
          <Text
            style={{
              width: 40,
              height: 40,
              marginVertical: 5,
              marginHorizontal: 5,
            }}></Text>
        </View>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <Text
          style={{
            width: 350,
            height: 40,
            marginHorizontal: 5,
            alignSelf: 'center',
            borderRadius: 40,
            marginVertical: 10,
          }}></Text>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default AddTranxnSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  categorybox: {
    width: 90,
    height: 30,
    marginVertical: 10,
    borderRadius: 10,
  },
  containerBox: {
    flexDirection: 'column',
    marginTop: 20,
    marginHorizontal: 10,
  },
  imageConatiner: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 10,
  },
});
