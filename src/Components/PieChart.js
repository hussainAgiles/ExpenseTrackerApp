import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import Pie from 'react-native-pie';
import {textColor} from '../Utils/CustomColors';

const PieChart = ({categories, total}) => {
  // console.log('Pie chart === ', categories);
  const rupeesSymbol = '\u20B9';
  const gaugeText = `${rupeesSymbol}${total}`;
  // const [peiData, setPieData] = useState([]);

  let data = [];
  let color = ['#C70039', '#44CD40', '#404FCD', '#EBD22F', '#EC407A'];
  if (categories !== null) {
    categories?.map((item, index) => {
      data.push({
        percentage: Number(item.percentage),
        color: color[index % color.length],
      });
    });
  }

  const modifiedData = data?.map(item => {
    // console.log("this is the item",item)
    const newItem = {};
    Object.keys(item).forEach(key => {
      // Remove all double quotes from the key
      const newKey = key.replace(/"/g, ''); 
      newItem[newKey] = item[key];
    });
    return newItem;
  });
  // console.log("dtaydyayt ===",modifiedData)

  // const series = [123, 321, 123, 789, 537];
  // const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];

  return (
    <View style={styles.container}>
      <Pie
       radius={90}
       innerRadius={50}
       sections={modifiedData}
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
