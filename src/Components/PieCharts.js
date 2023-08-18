import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {textColor} from '../Utils/CustomColors';
import Loader from './Loader';

const screenWidth = Dimensions.get('window').width - 10;

const PieCharts = ({categories, total}) => {
  const rupeesSymbol = '\u20B9';
  const gaugeText = `${rupeesSymbol} ${total}`;
  // const [peiData, setPieData] = useState([]);

  let data = [];
  let color = ['#C70039', '#44CD40', '#404FCD', '#EBD22F', '#EC407A'];
  if (categories !== null) {
    categories?.map((item, index) => {
      data.push({
        value: Number(item.percentage),
        text: item.categoryData,
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

  // console.log('data in Pie chart ===', data);

  // const data=[ {value:50}, {value:80}, {value:90}, {value:70} ]

  return (
    <>
      {modifiedData.length === 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{textAlign: 'center'}}>No Data to Display</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <PieChart
            data={modifiedData}
            donut={true}
            labelsPosition="outward"
            textSize={6}
            textColor='#000000'
            focusOnPress={true}
            showValuesAsLabels={true}
          />
          <View style={styles.gauge}>
            <Text style={styles.gaugeText}>{gaugeText} </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default PieCharts;

const styles = StyleSheet.create({
  container: {
    width: 175,
    alignItems: 'center',
    // marginTop: 10,
  },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
    paddingTop: 10,
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: textColor,
    fontSize: 20,
    fontFamily: 'EduSABeginner-SemiBold',
  },
});
