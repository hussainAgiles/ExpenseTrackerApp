import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {textColor} from '../Utils/CustomColors';
import Loader from './Loader';
const screenWidth = Dimensions.get('window').width - 30;

const BarCharts = ({categories, total}) => {
  console.log("Dtata here === ",categories.percentage)
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
    backgroundGradientFrom: '#E3F2FD',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#42A5F5',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(54, 69, 79, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.4,
    useShadowColorFromDataset: false, // optional
    propsForVerticalLabels: {
      fontSize: 12,
      fontFamily: 'EduSABeginner-Bold',
    },
  };

  return (
    <>
      {(data?.length === 0) ? (
        <Text>No Data to display</Text>
      ) : (
        <View style={styles.container}>
          <BarChart
            data={data}
            width={screenWidth}
            height={265}
            yAxisLabel={rupeesSymbol}
            chartConfig={chartConfig}
            verticalLabelRotation={33}
          />
        </View>
      )}
    </>
  );
};

export default BarCharts;

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
