import {StyleSheet, Text, TouchableOpacity, View,FlatList} from 'react-native';
import React, {useState} from 'react';
import DateTypeSelection from '../Components/DateTypeSelection';
import PieChart from '../Components/PieChart';
import {primaryColor} from '../Utils/CustomColors';
import {Button} from 'react-native-paper';
import {screenNames} from '../Constants/constant';
import {useDeviceOrientation} from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({allCategories}) {
  const navigation = useNavigation()
  const [date, setDate] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const{portrait} = useDeviceOrientation()


  // const handleDateFilter = (type, value) => {
  //   if (allCategories === null) {
  //     setCategories(null);
  //     return;
  //   }
  //   let tempCategories = JSON.parse(JSON.stringify(allCategories));
  //   let filteredCategories = dateFilterHelper(type, value, tempCategories);
  //   let total = netExpense(filteredCategories);
  //   filteredCategories = filteredCategories.map((item, index) => {
  //     item.percentage = Math.round((item.totalExpense / total) * 100);
  //     return item;
  //   });
  //   setCategories(filteredCategories);
  //   setTotal(total);
  // };

  const handleButtonPress = () => {
    navigation.navigate(screenNames.AddTransactions,{
      name: 'Add Transaction',
      showFutureDates: false,
    });
  };

  const handleCategoryPress = value => {
    let category = [value];
    // let transactions = getAllTransactions(category);
    // navigation.navigate('AllTransactionsScreen', {
    //   transactions: transactions,
    // });
  };

  return (
    <View style={styles.container}>
       <View style={[styles.dateContainer, !portrait && {flex: 4}]}>
        <DateTypeSelection date={date}  />
      </View>
      
        <View style={styles.chartAndButton}>
          <PieChart categories={categories} total={total} />
          <Button
            icon="plus-thick"
            color={primaryColor}
            mode="contained"
            style={{width: '90%', padding: 2}}
            onPress={handleButtonPress}>
            Add Transaction
          </Button>
          {/* <TouchableOpacity onPress={()=>{
            navigation.navigate(screenNames.Login);
            AsyncStorage.removeItem('User_Token')
          }}>
            <Text>sign Out</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.dataContainer}>
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleCategoryPress(item)}>
              <Card item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateContainer: {
    flex: 2,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  chartAndButton: {
    flex: 7,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  dataContainer: {
    flex: 7,
    margin: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
