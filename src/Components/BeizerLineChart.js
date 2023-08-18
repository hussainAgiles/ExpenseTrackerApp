import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width - 40;

const BeizerLineChart = ({categories}) => {
  // console.log('Categories in beizare === ', categories);
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
    labels: labels,
    datasets: [
      {
        data: amounts,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#E8F5E9',
    backgroundGradientTo: '#84FFFF',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: '2',
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    propsForVerticalLabels: {
      fontSize: 12,
      fontFamily: 'EduSABeginner-SemiBold',
    },
    propsForHorizontalLabels: {
      fontSize: 12,
      fontFamily: 'EduSABeginner-SemiBold',
    },
  };

  // const isDataAvailable = data && data.length > 0;

    return (
      <View style={styles.container}>
        <LineChart
          data={data}
          width={screenWidth} // from react-native
          height={250}
          yAxisLabel={rupeesSymbol}
          chartConfig={chartConfig}
          verticalLabelRotation={15}
          bezier
        />
      </View>
    );
};

export default BeizerLineChart;

const styles = StyleSheet.create({
  container: {
    width: 175,
    alignItems: 'center',
    // marginTop: 10,
  },
});
