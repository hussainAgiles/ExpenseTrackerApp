import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Pie from 'react-native-pie';
import {textColor} from '../Utils/CustomColors';

const PieChart = ({categories, total}) => {
  console.log("categorybdfjdsjj === ",categories)
  const rupeesSymbol = '\u20B9';
  const gaugeText = `${rupeesSymbol}${total}`;

  let data = [];
  // if (categories !== null) {
  //   data = categories.map(item => {
  //     console.log("Items === ",item)
  //     // let obj = {};
  //     // obj.key = item.key;
  //     // obj.value = item.amount;
  //     // return obj;
  //   });
  // }

  return (
    <View style={styles.container}>
      <Pie
        radius={90}
        innerRadius={50}
        sections={[
          {
            percentage: 1.28,
            color: '#C70039',
          },
          {
            percentage: 95.19,
            color: '#44CD40',
          },
          {
            percentage: 2.00,
            color: '#404FCD',
          },
          {
            percentage: 0.95,
            color: '#EBD22F',
          },

        ]}
        dividerSize={2}
        backgroundColor="#ddd"
      />
        <View style={styles.gauge}>
          <Text style={styles.gaugeText}>{gaugeText} </Text>
        </View>
    </View>
  );
};

export default PieChart;

const styles = StyleSheet.create({
  container: {
    width: 175,
    alignItems: 'center',
    // marginTop: 10,
  },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: textColor,
    fontSize: 24,
    fontWeight: '500',
  },
});
