import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDeviceOrientation} from '@react-native-community/hooks';
import fireStore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BarCharts from '../Components/BarCharts';
import BeizerLineChart from '../Components/BeizerLineChart';
import DateTypeSelection from '../Components/DateTypeSelection';
import DropdownComponent from '../Components/DropdownComponent';
import LineCharts from '../Components/LineCharts';
import Loader from '../Components/Loader';
import PieCharts from '../Components/PieCharts';
import {screenNames} from '../Constants/constant';
import {textColor} from '../Utils/CustomColors';

const screenWidth = Dimensions.get('window').width - 90;

export default function Home() {
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchTransactionCategryBased();
    }
    return () => {
      isMounted = false;
    };
  }, [transaction, categoryWiseTrxn]);

  useEffect(() => {
    fetchRecentTrxn();
  }, [transaction]);

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
      const percentage = Number((amount / totalAmount) * 100).toFixed(2);
      return {categoryData, amount, percentage};
    });

    // console.log("Category wise result ===",result)
    return result;
  };

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

  const fetchTransactionCategryBased = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');
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

  const handleDateFilter = (type, value) => {
    let filteredCategories = dateFilter(type, value, transaction);
    setCategoryWiseTrxn(calculateCategoryWiseExpense(filteredCategories));
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
              // console.log("Day Temp transaction ===",tempTransactions)
            }
            break;

          case 'Month':
            if (
              date.getMonth() === value.getMonth() &&
              date.getFullYear() === value.getFullYear()
            ) {
              total += Number(txn.amount);
              tempTransactions.push(txn);
              // console.log("Month Temp transaction ===",tempTransactions)
            }
            break;

          case 'Year':
            if (date.getFullYear() === value) {
              total += Number(txn.amount);
              tempTransactions.push(txn);
              // console.log("Temp year transaction ===",tempTransactions)
            }
            break;
        }
      }
      setTotal(total);
      transaction = tempTransactions;
      // if (tempTransactions.length > 0) result.push(transaction);
    }
    return transaction;
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

  // setting Charts constants
  const [chartType, setChartType] = useState('PieChart');
  const handleNext = () => {
    // Define an array of chart types
    const chartTypes = [
      'PieChart',
      'BeizerLineChart',
      'BarCharts',
      'LineCharts',
    ];

    // Get the current chart type index
    const currentIndex = chartTypes.indexOf(chartType);

    // Calculate the index for the next chart type
    const nextIndex = (currentIndex + 1) % chartTypes.length;

    // Set the next chart type
    setChartType(chartTypes[nextIndex]);
  };

  // Fetching Latest transaction

  const [value, setValue] = useState(null);
  const [backendData, setBackendData] = useState([]);

  const fetchRecentTrxn = async () => {
    // console.log("Fetching eachtime")
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    const collectionRef = fireStore().collection('Transaction');
    const querySnapshot = await collectionRef
      .where('user_id', '==', userId)
      .orderBy('transactionDate')
      .limit(5)
      .get();

    const recentTransactions = querySnapshot.docs.map(doc => doc.data());
    setRecentTransaction(recentTransactions);
    setLoading(false);
  };

  const handleChildResponse = response => {
    // console.log('Response ==== ', response);
    setRecentTransaction(response);
  };

  // Refresh Page

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader message="Please wait..." />
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* <Header /> */}
          <View style={[styles.dateContainer]}>
            <DateTypeSelection date={date} sendDateToHome={handleDateFilter} />
          </View>

          <View style={styles.chartAndButton}>
            <>
              {categoryWiseTrxn?.length === 0 ? (
                <View
                  style={{
                    flex: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>NO Data Available</Text>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '5%',
                    }}>
                    {chartType === 'PieChart' && (
                      <PieCharts categories={categoryWiseTrxn} total={total} />
                    )}
                    {chartType === 'BeizerLineChart' && (
                      <BeizerLineChart categories={categoryWiseTrxn} />
                    )}
                    {chartType === 'BarCharts' && (
                      <BarCharts categories={categoryWiseTrxn} total={total} />
                    )}
                    {chartType === 'LineCharts' && (
                      <LineCharts categories={categoryWiseTrxn} />
                    )}
                  </View>
                  <View
                    style={{
                      width: '20%',
                      height: 30,
                      position: 'relative',
                      left: screenWidth,
                      bottom: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity onPress={handleNext}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#000000',
                          fontSize: 18,
                          fontFamily: 'EduSABeginner-SemiBold',
                        }}>
                        {'Next >>'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
            <View
              style={{
                width: '90%',
                backgroundColor: '#03707a',
                borderRadius: 20,
                padding: 8,
                height: 40,
                marginLeft: '5%',
              }}>
              <TouchableOpacity
                onPress={handleButtonPress}
                style={{width: '90%', height: 30}}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 18,
                    fontFamily: 'EduSABeginner-Medium',
                  }}>
                  + Add Transaction
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Latest Transaction View */}

          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 10,
                  fontFamily: 'EduSABeginner-Medium',
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#616161',
                }}>
                Latest Transaction
              </Text>
              <DropdownComponent onResponse={handleChildResponse} />
            </View>
            <>
              {recentTransaction == '' ? (
                <View
                  style={{
                    flex: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>No Transactions to show</Text>
                </View>
              ) : (
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
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: 'EduSABeginner-Bold',
                            color: '#C70039',
                          }}>
                          {rupeesSymbol}
                          <Text
                            style={{
                              fontSize: 15,
                              color: '#000000',
                              fontFamily: 'EduSABeginner-Bold',
                            }}>
                            {item.amount}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateContainer: {
    flex: 1.5,
    backgroundColor: '#fff',
    marginTop: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  chartAndButton: {
    flex: 6,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: '2%',
    flexDirection: 'column',
    paddingBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  CategoryText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'EduSABeginner-SemiBold',
  },
  descText: {
    paddingTop: 5,
    fontSize: 14,
    color: '#000000',
    fontFamily: 'EduSABeginner-Regular',
  },
  card: {
    flex: 4,
    marginVertical: 5,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'black',
    padding: 10,
  },
  bottomCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  leftContent: {
    flexDirection: 'column',
    marginTop: 10,
  },
  navigationButtons: {
    color: textColor,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
