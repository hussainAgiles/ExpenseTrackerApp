import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import DateTypeSelection from '../Components/DateTypeSelection';
import PieChart from '../Components/PieChart';
import {primaryColor} from '../Utils/CustomColors';
import {Button} from 'react-native-paper';
import {categoryColors, screenNames} from '../Constants/constant';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../Components/Card';
import fireStore from '@react-native-firebase/firestore';
import toast from 'react-native-simple-toast';
import Header from '../Components/Header';

export default function Home({allCategories}) {
  useEffect(() => {
    // fetchtransaction()
    fetchTransactionCategryBased();
  }, []);

  useEffect(() => {
    fetchRecentTrxn()
  }, [])
  
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [transaction, setTransaction] = useState([]);
  const [total, setTotal] = useState(0);
  const {portrait} = useDeviceOrientation();

  const capitalize = str => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };

  //

  // const fetchtransaction = async () => {
  //   const userId = await AsyncStorage.getItem('userId');
  //   const collectionRef = fireStore().collection('Transaction')
  //   .where('user_id', '==', userId);
  //   const snapshot = await collectionRef.get();
  //   const fetcheddata = snapshot.docs.map(doc => doc.data());
  //   console.log("Home fetched trxn ",fetcheddata)
  //   const totalExpense = calculateTotalExpense(fetcheddata)
  //   setTransaction(fetcheddata)
  //   setTotal(totalExpense)
  // };

  const calculateTotalExpense = categories => {
    // console.log('Calculating at Home === ', categories);
    let total = 0;
    categories.map((item, index) => {
      total = total + Number(item.amount);
    });
    const totalExpense = total;
    console.log('Total amount spent', totalExpense);
    return total;
  };

  const calculateCategoryWiseExpense = categories => {
    // const expenses = [{key:'1',sum:'100',category:'car'},{key:'2',sum:'200',category:'food'},{key:'3',sum:'300',category:'furniture'},
    // {key:'4',sum:'400',category:'food'},{key:'5',sum:'700',category:'car'},],

    // result = Object.values(categories.reduce((r, {category_name, amount}) =>
    //   (r[category_name] = {category_name, totalSum: (r[category_name]?.totalSum || 0)+ +amount, percentage: totalSum/100}, r), {}))

    const categoryTotals = categoriseAmount(categories);
    // console.log("Category Totals",categoryTotals)
    const totalExpense = Object.values(categoryTotals).reduce(
      (total, amount) => total + amount,
      0,
    );
    // console.log("totalexpenses ==== ",Number(totalExpense))
    const categoryPercentages = {};
    for (const category in categoryTotals) {
      const percentage = (categoryTotals[category] / totalExpense) * 100;
      categoryPercentages[category] = percentage.toFixed(2);
    }
    // console.log('Percentage results ', categoryPercentages);
    return categoryPercentages;

    //   console.log("Results expected",result)
    // return result;
  };

  const categoriseAmount = categories => {
    const categoryTotals = {};
    categories.forEach(expense => {
      const {category_name, amount} = expense;
      if (categoryTotals[category_name]) {
        categoryTotals[category_name] += Number(amount);
      } else {
        categoryTotals[category_name] = Number(amount);
      }
    });
    // console.log("Format returning === ",categoryTotals)
    return categoryTotals;
  };

  const fetchTransactionCategryBased = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const collectionRef = fireStore().collection('Transaction');
    const snapShot = await collectionRef
      .where('user_id', '==', userId)
      .orderBy('category_name')
      .get();
    const fetcheddata = snapShot.docs.map(doc => doc.data());
    // console.log('Home fetched trxn ', fetcheddata);
    const totalExpense = calculateTotalExpense(fetcheddata);
    const categoryWiseExpense = calculateCategoryWiseExpense(fetcheddata);
    // console.log('categoryWiseExpense ==== ', categoryWiseExpense);
    setTransaction(fetcheddata);
    setTotal(totalExpense);
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
    let filteredCategories = dateFilter(type, value, transaction);
  };

  const dateFilter = (type, value, transaction) => {
    let result = [];
    for (let category of transaction) {
      if (transaction === null) continue;
      let tempTransactions = [];
      let total = 0;
      for (let txn of transaction) {
        // console.log("txn ========== ",txn.transactionDate)
        const timeStamp = txn.transactionDate;
        const miliseconds =
          timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000;
        let date = new Date(miliseconds);
        // console.log('Date in filter ', date);
        switch (type) {
          case 'Day':
            if (date.toLocaleDateString() === value.toLocaleDateString()) {
              total += Number(txn.amount);
              // console.log('Total in day', total);
              tempTransactions.push(txn);
              // console.log('TempTransaction in Day', tempTransactions);
            }
            break;

          case 'Month':
            if (
              date.getMonth() === value.getMonth() &&
              date.getFullYear() === value.getFullYear()
            ) {
              total += Number(txn.amount);
              // console.log('Total in month', total);
              tempTransactions.push(txn);
              // console.log('TempTransaction in month', tempTransactions);
            }
            break;

          case 'Year':
            if (date.getFullYear() === value) {
              total += Number(txn.amount);
              // console.log('Total in year', total);
              tempTransactions.push(txn);
              // console.log('TempTransaction year wise', tempTransactions);
            }
            break;
        }
      }
      // console.log(
      //   'outside everything temptransaction value === ',
      //   tempTransactions,
      // );
      setTotal(total);
      // console.log('total outside for loop ', total);
      transaction = tempTransactions;
      if (tempTransactions.length > 0) result.push(transaction);
    }
    // console.log("Result ==== ",result)
    return result;
  };

  const handleButtonPress = () => {
    navigation.navigate(screenNames.AddTransactions, {
      name: 'Add Transaction',
      showFutureDates: false,
    });
  };

  // const handleCategoryPress = value => {
  //   let category = [value];
  //   // let transactions = getAllTransactions(category);
  //   // navigation.navigate('AllTransactionsScreen', {
  //   //   transactions: transactions,
  //   // });
  // };



  // Recent transaction

  const rupeesSymbol = '\u20B9';
  const [recentTransaction, setRecentTransaction] = useState();

  const fetchRecentTrxn =async () =>{
    const userId = await AsyncStorage.getItem('userId');
    const collectionRef = fireStore().collection('Transaction');
    const querySnapshot = await collectionRef
      .where('user_id', '==', userId)
      .orderBy('transactionDate')
      .limit(3)
      .get();

        const recentTransactions = querySnapshot.docs.map((doc) => doc.data());
        setRecentTransaction(recentTransactions);
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={[styles.dateContainer, !portrait && {flex: 4}]}>
        <DateTypeSelection date={date} sendDateToHome={handleDateFilter} />
      </View>

      <View style={styles.chartAndButton}>
        <PieChart categories={transaction} total={total} />
        <Button
          icon="plus-thick"
          color={primaryColor}
          mode="contained"
          style={{width: '90%', padding: 2}}
          onPress={handleButtonPress}>
          Add Transaction
        </Button>
      </View>
      <View style={styles.card}>
        <Text style={{fontSize:20,fontWeight:800,marginLeft:10}}>Latest Transaction</Text>
        <FlatList
          data={recentTransaction}
          renderItem={({item}) => (
           <View style={styles.bottomCardContent}>
            <View style={styles.leftContent}>
              <Text style={styles.CategoryText}>{item.category_name}</Text>
              <Text style={styles.descText}>{item.note}</Text>
            </View>
            <View style={{flexDirection:'column',justifyContent:"center"}}>
              <Text style={{fontSize:15,fontWeight:800,color:"#C70039"}}>{rupeesSymbol}<Text style={{fontSize:15,fontWeight:800,color:"#000000"}}>. {item.amount}</Text></Text>
            </View>
           </View>
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
  CategoryText:{
    fontSize:18,
    color:"#000000"
  },
  descText :{
    fontSize:15,
    color:"#000000"
  },
  card: {
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'black',
    // elevation: 3,
  },
  bottomCardContent: {
    flexDirection:'row',
    justifyContent:"space-between",
    borderBottomColor:"#000000",
    borderBottomWidth:1,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:10
  },
  leftContent :{
    flexDirection:'column',marginTop:10
  }
});
