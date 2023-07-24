import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDeviceOrientation } from '@react-native-community/hooks';
import fireStore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTypeSelection from '../Components/DateTypeSelection';
import Loader from '../Components/Loader';
import PieChart from '../Components/PieChart';
import { categoryColors, screenNames } from '../Constants/constant';

export default function Home() {
  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      fetchTransactionCategryBased();
    }
    return () =>{
      isMounted =false
    }
   
  }, [transaction]);

  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      fetchRecentTrxn();
    }
    return () =>{
      isMounted =false
    }
    
  }, [transaction,categoryWiseTrxn]);

  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [transaction, setTransaction] = useState([]);
  const [categoryWiseTrxn, setCategoryWiseTrxn] = useState();
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
    // console.log('Total amount spent', totalExpense);
    return total;
  };

  const calculateCategoryWiseExpense = categories => {
    const categoryTotals = categoriseAmount(categories);
    return categoryTotals;
  };

  const categoriseAmount = categories => {
    const categoryTotals = {};
    let totalAmount = 0;

    categories.forEach(expense => {
      const {category_name, amount} = expense;
      totalAmount += Number(amount);
      categoryTotals[category_name] =
        (categoryTotals[category_name] || 0) + Number(amount);
    });

    // Calculating percentage CategoryWise transaction
    const result = Object.keys(categoryTotals).map(categoryData => {
      const amount = categoryTotals[categoryData];
      const percentage = ((amount / totalAmount) * 100).toFixed(2);
      return {categoryData, amount, percentage};
    });

    // console.log("Category wise result ===",result)
    return result;
  };

  const fetchTransactionCategryBased = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    // console.log("User Id ====",userId)
    const collectionRef = fireStore().collection('Transaction');
    const snapShot = await collectionRef
      .where('user_id', '==', userId)
      .orderBy('category_name')
      .get();
    const fetcheddata = snapShot.docs.map(doc => doc.data());
    const totalExpense = calculateTotalExpense(fetcheddata);
    const categoryWiseExpense = calculateCategoryWiseExpense(fetcheddata);
    // console.log('categoryWiseExpense ==== ', categoryWiseExpense);
    setCategoryWiseTrxn(categoryWiseExpense);
    setTransaction(fetcheddata);
    setTotal(totalExpense);
    setLoading(false);
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
        const timeStamp = txn.transactionDate;
        const miliseconds =
          timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000;
        let date = new Date(miliseconds);
        switch (type) {
          case 'Day':
            if (date.toLocaleDateString() === value.toLocaleDateString()) {
              total += Number(txn.amount);
              tempTransactions.push(txn);
            }
            break;

          case 'Month':
            if (
              date.getMonth() === value.getMonth() &&
              date.getFullYear() === value.getFullYear()
            ) {
              total += Number(txn.amount);
              tempTransactions.push(txn);
            }
            break;

          case 'Year':
            if (date.getFullYear() === value) {
              total += Number(txn.amount);
              tempTransactions.push(txn);
            }
            break;
        }
      }
      setTotal(total);
      transaction = tempTransactions;
      if (tempTransactions.length > 0) result.push(transaction);
    }
    return result;
  };

  const handleButtonPress = () => {
    navigation.navigate(screenNames.AddTransactions, {
      name: 'Add Transaction',
      showFutureDates: false,
    });
  };

  // Recent transaction

  const rupeesSymbol = '\u20B9';
  const [recentTransaction, setRecentTransaction] = useState();

  const fetchRecentTrxn = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    const collectionRef = fireStore().collection('Transaction');
    const querySnapshot = await collectionRef
      .where('user_id', '==', userId)
      .orderBy('transactionDate','asc')
      .limit(5)
      .get();

    const recentTransactions = querySnapshot.docs.map(doc => doc.data());
    setRecentTransaction(recentTransactions);
    setLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader message="Please wait..." />
      ) : (
        <View style={styles.container}>
          {/* <Header /> */}
          <View style={[styles.dateContainer]}>
            <DateTypeSelection date={date} sendDateToHome={handleDateFilter} />
          </View>

          <View style={styles.chartAndButton}>
            <PieChart categories={categoryWiseTrxn} total={total} />
            {/* <Button
              icon="plus-thick"
              color={primaryColor}
              mode="contained"
              style={{width: '90%', padding: 2}}
              onPress={handleButtonPress}>
              Add Transaction
            </Button> */}
            <View
              style={{
                width: '90%',
                backgroundColor: '#03707a',
                borderRadius: 20,
                padding: 8,
                height: 40,
                marginLeft: '5%',
              }}>
              <TouchableOpacity onPress={handleButtonPress} style={{ width: '90%',height: 30,}}>
                <Text style={{textAlign: 'center', color: '#fff',fontSize:18}}>
                  + Add Transaction
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={{fontSize: 20, fontWeight: 800, marginLeft: 10}}>
              Latest Transaction
            </Text>
            <FlatList
              data={recentTransaction}
              renderItem={({item}) => (
                <View style={styles.bottomCardContent}>
                  <View style={styles.leftContent}>
                    <Text style={styles.CategoryText}>
                      {item.category_name}
                    </Text>
                    <Text style={styles.descText}>{item.note}</Text>
                  </View>
                  <View
                    style={{flexDirection: 'column', justifyContent: 'center'}}>
                    <Text
                      style={{fontSize: 15, fontWeight: 800, color: '#C70039'}}>
                      {rupeesSymbol}
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 800,
                          color: '#000000',
                        }}>
                        . {item.amount}
                      </Text>
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </>
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
  CategoryText: {
    fontSize: 18,
    color: '#000000',
  },
  descText: {
    fontSize: 15,
    color: '#000000',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  leftContent: {
    flexDirection: 'column',
    marginTop: 10,
  },
});
