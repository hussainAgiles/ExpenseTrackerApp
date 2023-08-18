import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width-40;

const LineCharts = ({categories}) => {
  const rupeesSymbol = '\u20B9';
  const {labels, data: amounts} = categories.reduce(
    (accumulator, currentItem) => {
      accumulator.labels.push(currentItem.categoryData);
      accumulator.data.push(currentItem.amount);
      return accumulator;
    },
    {labels: [], data: []},
  );

  const data = {
    labels:labels,
    datasets: [
      {
        data: amounts,
      },
    ],
  };

 

//  const data = {
//     labels: ["Dining", "Groceries", "Travel"], // optional
//     data: [0.4, 0.6, 0.8]
//   };

  const chartConfig = {
    backgroundColor: '#C5CAE9',
    backgroundGradientFrom: '#B2EBF2',
    backgroundGradientTo: '#A7FFEB',
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(128,0,0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(54, 69, 79, ${opacity})`,
    strokeWidth: '2',
    barPercentage: 0.5,
    useShadowColorFromDataset: false ,// optional
    propsForVerticalLabels:{
      fontSize:12,
      fontFamily:'EduSABeginner-Bold'
    },
    propsForHorizontalLabels:{
      fontSize:12,
      fontFamily:'EduSABeginner-Bold'
    }
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={screenWidth}
        height={240}
        yAxisLabel={rupeesSymbol}
        chartConfig={chartConfig}
        verticalLabelRotation={15}
      />
    </View>
  );
};

export default LineCharts;

const styles = StyleSheet.create({
  container: {
    width: 175,
    alignItems: 'center',
  },
});
