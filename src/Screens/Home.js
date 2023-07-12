import {StyleSheet, Text, TouchableOpacity, View,FlatList} from 'react-native';
import React, {useState,useEffect} from 'react';
import DateTypeSelection from '../Components/DateTypeSelection';
import PieChart from '../Components/PieChart';
import {primaryColor} from '../Utils/CustomColors';
import {Button} from 'react-native-paper';
import {categoryColors, screenNames} from '../Constants/constant';
import {useDeviceOrientation} from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../Components/Card';
import fireStore from '@react-native-firebase/firestore';
import toast from 'react-native-simple-toast'
import Header from '../Components/Header';


export default function Home({allCategories}) {
  useEffect(() => {
    fetchtransaction()
  }, [])
  const navigation = useNavigation()
  const [date, setDate] = useState(new Date());
  const [transaction, setTransaction] = useState([]);
  const [total, setTotal] = useState(0);
  const{portrait} = useDeviceOrientation()

  const capitalize = str => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };

  // 
  const fetchtransaction = async () => {
    const collectionRef = fireStore().collection('Transaction');
    const snapshot = await collectionRef.get();
    const fetcheddata = snapshot.docs.map(doc => doc.data());
    const totalExpense = netExpense(fetcheddata)
    // console.log("total Expense",totalExpense)
    setTransaction(fetcheddata)
    setTotal(totalExpense) 
  };

  const netExpense = categories => {
    // console.log("netExpense categories",categories)
    let sum = 0;
    for (let category of categories) sum = sum + category.amount;
    return sum;
  };



  // adding colors to Categories and making title first letter Capital
  const handleCategories = data => {
    data.map((item, index) => {
      data[index].title = capitalize(item.title);
      data[index].color = categoryColors[index % categoryColors.length];
    });
    return data;
  };

  const handleDateFilter = (type, value) => {
    console.log("Type in ",value)
    let filteredCategories = dateFilter(type, value, transaction);
  };

  const dateFilter = (type, value, transaction) => {
    let result = [];
  
    for (let category of transaction) {
      if (transaction === null) continue;
      let tempTransactions = [];
      let total = 0;
      for (let txn of transaction) {
        let date = new Date(txn.transactionDate);
        console.log("Date in filter ",date)
        switch (type) {
          case 'Day':
            if (date.toLocaleDateString() === value.toLocaleDateString()) {
              total += txn.amount;
              console.log("Total in day",total)
              // tempTransactions.push(txn);
              console.log("TempTransaction in Day",tempTransactions)
            }
            break;
          case 'Month':
            console.log("Month")
            if (
              date.getMonth() === value.getMonth() &&
              date.getFullYear() === value.getFullYear()
            ) {
              total += txn.amount;
              console.log("Total in month",total)
              // tempTransactions.push(txn);
              console.log("TempTransaction in month",tempTransactions)
            }
            break;
          case 'Year':
            console.log("yeaaar")
            if (date.getFullYear() === value) {
              total += txn.amount;
              console.log("Total in month",total)
              // tempTransactions.push(txn);
              console.log("TempTransaction",tempTransactions)
            }
            break;
        }
      }
      // category.amount = total;
      // transaction = tempTransactions;
      // if (tempTransactions.length > 0) result.push(transaction);
    }
    // console.log("Result ==== ",result)
    // return result;
  };


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
      <Header/>
       <View style={[styles.dateContainer, !portrait && {flex: 4}]}>
        <DateTypeSelection date={date} sendDateToHome={handleDateFilter} />
      </View>
      
        <View style={styles.chartAndButton}>
          {/* <PieChart categories={transaction} total={total} /> */}
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
          data={transaction}
          renderItem={({item}) => (
            <TouchableOpacity >
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
