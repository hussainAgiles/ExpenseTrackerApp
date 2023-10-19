import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDeviceOrientation } from '@react-native-community/hooks';
import fireStore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import { screenNames } from '../Constants/constant';
import { textColor } from '../Utils/CustomColors';
import { fetchTransactionHistory } from '../Helpers/helpers';
// import * as ImagePicker from 'react-native-image-picker';
// import  storage  from '@react-native-firebase/storage';


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
  const { portrait } = useDeviceOrientation();
  const [disable, setDisable] = useState(false);

  const capitalize = str => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };

  // Calculating Amount category wise
  const calculateCategoryWiseExpense = categories => {
    const categoryTotals = categoriseAmount(categories);
    return categoryTotals;
  };

  const categoriseAmount = categories => {
    const categoryTotals = {};
    let totalAmount = 0;

    categories.forEach((expense) => {
      const { amount, categories_datails } = expense;
      const { longname } = categories_datails

      if (!categoryTotals[longname]) {
        categoryTotals[longname] = 0;
      }

      totalAmount += Number(amount);
      categoryTotals[longname] =
        (categoryTotals[longname] || 0) + Number(amount);
    });

    // console.log("category in total ==== ",categoryTotals)
    // Calculating percentage CategoryWise transaction
    const result = Object.keys(categoryTotals).map(categoryData => {
      const amount = categoryTotals[categoryData];
      const percentage = Number((amount / totalAmount) * 100).toFixed(2);
      return { categoryData, amount, percentage };
    });
    // console.log("Category wise result ===",result)
    return result;
  };

  const calculateTotalExpense = categories => {
    let total = 0;
    categories.map((item, index) => {
      total = total + Number(item.amount);
    });
    return total;
  };


  const fetchTransactionCategryBased = async () => {
    setLoading(true);
    const fetcheddata = await fetchTransactionHistory();
    const totalExpense = calculateTotalExpense(fetcheddata);
    // console.log("Total Expense ==== ",totalExpense)
    const categoryWiseExpense = calculateCategoryWiseExpense(fetcheddata);
    // console.log('categoryWiseExpense ==== ', categoryWiseExpense);
    setCategoryWiseTrxn(categoryWiseExpense);
    setTransaction(fetcheddata);
    setTotal(totalExpense);
    setLoading(false);
  };

  // handling date selection
  const handleDateFilter = (type, value) => {
    let filteredCategories = dateFilter(type, value, transaction);
    setCategoryWiseTrxn(calculateCategoryWiseExpense(filteredCategories));
  };

  // Calculating total amount for the date, month and year selected.
  const dateFilter = (type, value, transaction) => {
    let result = [];
    for (let category of transaction) {
      if (transaction === null) continue;
      let tempTransactions = [];
      let total = 0;
      for (let txn of transaction) {
        const timeStamp = txn.transaction_date;
        let date = new Date(timeStamp);
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
    setDisable(true)
    navigation.navigate(screenNames.AddTransactions, {
      name: 'Add Transaction',
      showFutureDates: false,
    });
    setDisable(false)
  };


  // Recent transaction

  const rupeesSymbol = '\u20B9';
  const [recentTransaction, setRecentTransaction] = useState();

  // setting Charts state value
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
    setLoading(true);
    const fetcheddata = await fetchTransactionHistory();
    fetcheddata.sort((a, b) => b.id - a.id)
    const latestTransactions = fetcheddata.slice(0, 5);
    setRecentTransaction(latestTransactions);
    setLoading(false);
  };

  const handleChildResponse = response => {
    setRecentTransaction(response);
  };

  // Refresh Page

  const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  // refreshControl={
  //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  // }

  return (
    <>
      {isLoading ? (
        <Loader message="Please wait..." />
      ) : (
        <View
          style={styles.container}
        >
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
                  <Text style={styles.regularText}>No Data Available</Text>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '3%',
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
              style={styles.addBtnView}>
              {disable === true ? (<ActivityIndicator size='small' color='#fff' style={{ alignItems: 'center', justifyContent: 'center' }} />) : (
                <TouchableOpacity
                  onPress={handleButtonPress}
                  style={{ width: '60%', height: 30 }}>
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
              )}
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
                style={[styles.regularText,{
                  borderBottomWidth: 0.5}]}>
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
                  <Text style={styles.regularText}>No Transactions to show</Text>
                </View>
              ) : (
                <FlatList
                  data={recentTransaction}
                  renderItem={({ item }) => (
                    <View key={item.id} style={styles.bottomCardContent}>
                      <View style={styles.leftContent}>
                        <Text style={styles.CategoryText}>
                          {item.categories_datails.longname}
                        </Text>
                        <Text style={styles.descText}>{item.transactions_description}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={[styles.amtText,{color: '#C70039',}]}>
                          {rupeesSymbol}
                          <Text
                            style={[styles.amtText,{color: '#000000',}]}>
                            {item.amount}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={item => `${item.id}`}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </>
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
  regularText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'EduSABeginner-Regular',
    borderBottomColor: '#616161',
  },
  amtText:{
    fontSize: 15,
    fontFamily: 'EduSABeginner-Bold',
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
    shadowOffset: { width: 1, height: 1 },
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
  addBtnView: {
    width: '90%',
    backgroundColor: '#03707a',
    borderRadius: 20,
    height: 40,
    marginLeft: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  }
});
