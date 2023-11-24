import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {StackedBarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 30;

const StackedBarCharts = () => {
  const chartConfig = {
    backgroundGradientFrom: '#E3F2FD',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#42A5F5',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(54, 69, 79, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.,
    useShadowColorFromDataset: false, // optional
    propsForVerticalLabels: {
      fontSize: 12,
      fontFamily: 'EduSABeginner-Bold',
    },
  };

  const data = {
    labels: ['Test1', 'Test2'],
    legend: ['L1', 'L2', 'L3'],
    data: [
      [60, 60, 60],
      [30, 30, 60],
    ],
    barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
  };

  return (
    <View>
      <StackedBarChart
        width={screenWidth}
        data={data}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default StackedBarCharts;

const styles = StyleSheet.create({});
