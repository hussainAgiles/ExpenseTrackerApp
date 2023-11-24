import {StyleSheet, Text, View,ScrollView} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const TransactionSkeleton = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{width: 180, height: 30, marginVertical: 10}}></Text>
            <Text style={{width: 180, height: 30}}></Text>
          </View>
          <Text
            style={{
              width: 120,
              height: 30,
              marginLeft: 50,
              alignSelf: 'center',
            }}></Text>
        </View>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={{flexDirection: 'row',marginTop:20}}>
          <Text style={{width: 40, height: 80,marginHorizontal:5}}></Text>
          <Text style={{width: 280, height: 80,marginHorizontal:5}}></Text>
          <Text
            style={{
              width: 40,
              height: 80,
            }}></Text>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={{flexDirection: 'row',marginTop:20}}>
          <Text style={{width: 40, height: 80,marginHorizontal:5}}></Text>
          <Text style={{width: 280, height: 80,marginHorizontal:5}}></Text>
          <Text
            style={{
              width: 40,
              height: 80,
            }}></Text>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={{flexDirection: 'row',marginTop:20}}>
          <Text style={{width: 40, height: 80,marginHorizontal:5}}></Text>
          <Text style={{width: 280, height: 80,marginHorizontal:5}}></Text>
          <Text
            style={{
              width: 40,
              height: 80,
            }}></Text>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={{flexDirection: 'row',marginTop:20}}>
          <Text style={{width: 40, height: 80,marginHorizontal:5}}></Text>
          <Text style={{width: 280, height: 80,marginHorizontal:5}}></Text>
          <Text
            style={{
              width: 40,
              height: 80,
            }}></Text>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={{flexDirection: 'row',marginTop:20}}>
          <Text style={{width: 40, height: 80,marginHorizontal:5}}></Text>
          <Text style={{width: 280, height: 80,marginHorizontal:5}}></Text>
          <Text
            style={{
              width: 40,
              height: 80,
            }}></Text>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={{flexDirection: 'row',marginTop:20}}>
          <Text style={{width: 40, height: 80,marginHorizontal:5}}></Text>
          <Text style={{width: 280, height: 80,marginHorizontal:5}}></Text>
          <Text
            style={{
              width: 40,
              height: 80,
            }}></Text>
        </View>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder borderRadius={4} backgroundColor="#ccc" speed={800}>
        <View style={{flexDirection: 'row',marginTop:20}}>
          <Text style={{width: 40, height: 50,marginHorizontal:5}}></Text>
          <Text style={{width: 280, height: 50,marginHorizontal:5}}></Text>
          <Text
            style={{
              width: 40,
              height: 50,
            }}></Text>
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

export default TransactionSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  CalendarView: {
    width: '40%',
    height: 30,
    backgroundColor: '#BDBDBD',
  },
  showDateInfo: {
    backgroundColor: '#BDBDBD',
    width: '95%',
    height: 30,
    borderRadius: 5,
    alignSelf: 'center',
  },
  chartAndButton: {
    flex: 6,
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    flexDirection: 'column',
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#03707a',
    paddingTop: 40,
  },
  addTransButtn: {
    width: '90%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#BDBDBD',
    alignSelf: 'center',
  },
  card: {
    flex: 8,
    backgroundColor: '#ccc',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'black',
    padding: 10,
  },
  latestTrxn: {
    width: '35%',
    height: 30,
    backgroundColor: '#BDBDBD',
  },
  latestDetails: {
    height: 90,
    backgroundColor: '#BDBDBD',
    marginVertical: 10,
    flexDirection: 'row',
  },
  ExportView: {
    flex: 2,
    backgroundColor: '#ccc',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'black',
    padding: 20,
  },
  searchBar: {
    backgroundColor: '#BDBDBD',
    width: '78%',
    height: 70,
  },
  dateText: {
    backgroundColor: '#BDBDBD',
    width: '10%',
    height: 70,
  },
});
