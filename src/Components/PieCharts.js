import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {textColor} from '../Utils/CustomColors';
import { categoryColors, screenNames } from '../Constants/constant';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width - 10;

const PieCharts = ({categories, total}) => {
  // console.log('Categories in pie chart === ', categories);

  const navigation = useNavigation();
  const rupeesSymbol = '\u20B9';
  const gaugeText = `${rupeesSymbol} ${total}`;
  // const [peiData, setPieData] = useState([]);

  let data = [];
  // let color = ['#C70039', '#44CD40', '#404FCD', '#EBD22F', '#EC407A'];
  if (categories !== null) {
    categories?.map((item, index) => {
      data.push({
        value: Number(item.percentage),
        text: item.categoryData,
        color: categoryColors[index % categoryColors.length]
      });
    });
  }

  const modifiedData = data?.map(item => {
    const newItem = {};
    Object.keys(item).forEach(key => {
      // Remove all double quotes from the key
      const newKey = key.replace(/"/g, '');
      newItem[newKey] = item[key];
    });
    return newItem;
  });

  const renderLengend = ({item,index}) => {
    return (
      <View key={index} style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
        <View style={[styles.color, {backgroundColor: item.color}]} />
        <Text>{item.text}</Text>
      </View>
    );
  };

  const handlePieSelect = (item) =>{
    // console.log("Items ===== ",item)
    navigation.navigate(screenNames.Details,{Details:item})
  }

  return (
    <>
      {modifiedData.length === 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{textAlign: 'center'}}>No Data to Display</Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row'}}>
          <View style={styles.container}>
            <PieChart
              data={modifiedData}
              donut={true}
              textSize={10}
              textColor="black"
              focusOnPress={true}
              showValuesAsLabels={true}
              labelsPosition="outward"
              innerCircleColor="lightblue"
              onPress={item=>{handlePieSelect(item)}}
            />
            <View style={styles.gauge}>
              <Text style={styles.gaugeText}>{gaugeText} </Text>
            </View>
          </View>

          <FlatList
            data={data}
            renderItem={renderLengend}
            key={item => item.index}
            contentContainerStyle={{padding:'10%'}}
            
          />
        </View>
      )}
    </>
  );
};

export default PieCharts;

const styles = StyleSheet.create({
  container: {
    width: '70%',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft:30
  },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: textColor,
    fontSize: 20,
    fontFamily: 'EduSABeginner-SemiBold',
  },
  color: {
    marginRight:10,
    width: 7,
    height: 7,
    borderRadius: 15 / 2,
  },
});
