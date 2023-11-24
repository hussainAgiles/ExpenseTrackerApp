import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeSkeleton = () => {
  return (
    <ScrollView style={styles.container}>
      <SkeletonPlaceholder
        style={styles.dateContainer}
        borderRadius={4}
        speed={800}
        backgroundColor="#ccc">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingHorizontal: 10,
          }}>
          <View style={styles.dateText}></View>
          <View style={styles.dateText}></View>
          <View style={styles.dateText}></View>
        </View>
        <Text style={styles.showDateInfo}></Text>
      </SkeletonPlaceholder>
      <SkeletonPlaceholder style={styles.dateContainer}
        borderRadius={4}
        speed={800}
        backgroundColor="#ccc">
        <View style={styles.chartAndButton}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={styles.chart}></View>
            <View style={styles.gaugeView}></View>
          </View>
          <View style={styles.addTransButtn}></View>
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

export default HomeSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  dateContainer: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  dateText: {
    backgroundColor: '#BDBDBD',
    width: '25%',
    height: 30,
    borderRadius: 10,
  },
  showDateInfo: {
    backgroundColor: '#BDBDBD',
    width: '95%',
    height: 30,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  chartAndButton: {
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    flexDirection: 'column',
    paddingBottom: 10,
    borderWidth: 0.5,
    paddingTop: 40,
  },
  chart: {
    backgroundColor: '#BDBDBD',
    width: 230,
    borderRadius: 110,
    height: 230,
  },
  gaugeView: {
    width: 100,
    height: 180,
    backgroundColor: '#BDBDBD',
    top: 20,
  },
  addTransButtn: {
    width: '90%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#BDBDBD',
    alignSelf: 'center',
    marginTop:'5%'
  },
  card: {
    flex: 4,
    backgroundColor: '#ccc',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'black',
    padding: 20,
  },
  latestTrxn: {
    width: '35%',
    height: 30,
    backgroundColor: '#BDBDBD',
  },
  latestDetails: {
    height: 30,
    backgroundColor: '#BDBDBD',
    marginVertical: 10,
  },
});
