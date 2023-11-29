import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {fetchTransactionHistory} from '../Helpers/helpers';
import moment from 'moment';
import {primaryColor} from '../Utils/CustomColors';

const ComparisionScreen = () => {
  const [value, setValue] = useState(null);
  const data = [
    {
      label: '3 Months',
      value: 3,
    },
    {
      label: '6 Months',
      value: 6,
    },
  ];

  // const fetcheddata = [
  //   {
  //     amount: 600,
  //     categories_datails: {
  //       created_at: null,
  //       created_by: null,
  //       icon_name: 'margin',
  //       id: 14,
  //       is_default: 0,
  //       longname: 'Bills',
  //       org_id: null,
  //       shortname: 'Bills',
  //       site_id: null,
  //       slug: 'bills',
  //       status: 1,
  //       updated_at: '2023-10-31T06:24:54.000000Z',
  //       updated_by: 7,
  //     },
  //     categories_id: 14,
  //     created_at: '2023-09-05T13:18:52.000000Z',
  //     created_by: null,
  //     emp_id: 8,
  //     id: 23,
  //     json_image: null,
  //     org_id: 1,
  //     site_id: 1,
  //     slug: '600-2',
  //     transaction_date: '2023-09-05',
  //     transactions_description: 'Electric',
  //     transactions_image:
  //       '/storage/ExpenseBills/7ac33de8-bd50-476c-bbbe-13dd60888350.png',
  //     updated_at: '2023-09-25T15:43:49.000000Z',
  //     updated_by: null,
  //   },
  //   {
  //     amount: 250,
  //     categories_datails: {
  //       created_at: null,
  //       created_by: null,
  //       icon_name: 'shopping-cart',
  //       id: 7,
  //       is_default: 0,
  //       longname: 'Groceries',
  //       org_id: null,
  //       shortname: 'Groceries',
  //       site_id: null,
  //       slug: 'groceries',
  //       status: 1,
  //       updated_at: null,
  //       updated_by: null,
  //     },
  //     categories_id: 7,
  //     created_at: '2023-09-11T13:01:18.000000Z',
  //     created_by: null,
  //     emp_id: 8,
  //     id: 26,
  //     json_image: 'null',
  //     org_id: 1,
  //     site_id: 1,
  //     slug: '250',
  //     transaction_date: '2023-09-11',
  //     transactions_description: 'Groceries',
  //     transactions_image:
  //       '/storage/ExpenseBills/08ebade8-ecfb-43a0-b5b1-14519523fda6.png',
  //     updated_at: '2023-11-08T07:03:24.000000Z',
  //     updated_by: null,
  //   },
  //   {
  //     amount: 680,
  //     categories_datails: {
  //       created_at: null,
  //       created_by: null,
  //       icon_name: 'phone',
  //       id: 3,
  //       is_default: 0,
  //       longname: 'Telephone',
  //       org_id: null,
  //       shortname: 'Telephone',
  //       site_id: null,
  //       slug: 'telephone',
  //       status: 1,
  //       updated_at: null,
  //       updated_by: null,
  //     },
  //     categories_id: 3,
  //     created_at: '2023-09-11T13:03:32.000000Z',
  //     created_by: null,
  //     emp_id: 8,
  //     id: 28,
  //     json_image: null,
  //     org_id: 1,
  //     site_id: 1,
  //     slug: '680',
  //     transaction_date: '2023-09-11',
  //     transactions_description: 'Bills paid telephone',
  //     transactions_image:
  //       '/storage/ExpenseBills/ee64d6a4-9370-4daa-9d36-31834cf9032f.png',
  //     updated_at: '2023-09-20T18:04:55.000000Z',
  //     updated_by: null,
  //   },
  //   {
  //     amount: 700,
  //     categories_datails: {
  //       created_at: null,
  //       created_by: null,
  //       icon_name: 'emergency-recording',
  //       id: 15,
  //       is_default: 0,
  //       longname: 'Entertainment',
  //       org_id: null,
  //       shortname: 'Entertainment',
  //       site_id: null,
  //       slug: 'entertainment',
  //       status: 1,
  //       updated_at: null,
  //       updated_by: null,
  //     },
  //     categories_id: 15,
  //     created_at: '2023-09-15T13:06:17.000000Z',
  //     created_by: null,
  //     emp_id: 8,
  //     id: 29,
  //     json_image: null,
  //     org_id: 1,
  //     site_id: 1,
  //     slug: '700',
  //     transaction_date: '2023-09-15',
  //     transactions_description: 'Movie ticket',
  //     transactions_image:
  //       '/storage/ExpenseBills/4286430b-ed92-4036-9401-72e4b7bf6da9.png',
  //     updated_at: '2023-09-20T18:40:59.000000Z',
  //     updated_by: null,
  //   },
  //   {
  //     amount: 8000,
  //     categories_datails: {
  //       created_at: null,
  //       created_by: null,
  //       icon_name: 'calculate',
  //       id: 5,
  //       is_default: 0,
  //       longname: 'Emi',
  //       org_id: null,
  //       shortname: 'Emi',
  //       site_id: null,
  //       slug: 'emi',
  //       status: 1,
  //       updated_at: null,
  //       updated_by: null,
  //     },
  //     categories_id: 5,
  //     created_at: '2023-09-21T13:15:28.000000Z',
  //     created_by: null,
  //     emp_id: 8,
  //     id: 34,
  //     json_image:
  //       '[{"id":"0","image_storage_path":"\\/storage\\/ExpenseBills\\/1700131108762.jpg"},{"id":"1","image_storage_path":"\\/storage\\/ExpenseBills\\/1700131108783.jpg"},{"id":"2","image_storage_path":"\\/storage\\/ExpenseBills\\/1700131108800.jpg"},{"id":"3","image_storage_path":"\\/storage\\/ExpenseBills\\/1700131108812.jpg"}]',
  //     org_id: 1,
  //     site_id: 1,
  //     slug: '8000',
  //     transaction_date: '2023-09-21',
  //     transactions_description: 'Pl paid',
  //     transactions_image:
  //       '/storage/ExpenseBills/36bbe1c9-b65c-41c5-a67d-869cc9aec657.png',
  //     updated_at: '2023-11-16T10:38:52.000000Z',
  //     updated_by: null,
  //   },
  //   {
  //     amount: 650,
  //     categories_datails: {
  //       created_at: null,
  //       created_by: null,
  //       icon_name: 'health-and-safety',
  //       id: 9,
  //       is_default: 0,
  //       longname: 'Health',
  //       org_id: null,
  //       shortname: 'Health',
  //       site_id: null,
  //       slug: 'health',
  //       status: 1,
  //       updated_at: null,
  //       updated_by: null,
  //     },
  //     categories_id: 9,
  //     created_at: '2023-10-04T12:06:12.000000Z',
  //     created_by: null,
  //     emp_id: 8,
  //     id: 38,
  //     json_image: 'null',
  //     org_id: 1,
  //     site_id: 1,
  //     slug: '650',
  //     transaction_date: '2023-10-04',
  //     transactions_description: 'Health insurance premium',
  //     transactions_image:
  //       '/storage/ExpenseBills/94ce5f1e-fe71-435e-9ff3-c341f6baf071.png',
  //     updated_at: '2023-10-04T16:19:14.000000Z',
  //     updated_by: null,
  //   },
  //   {
  //     amount: 650,
  //     categories_datails: {
  //       created_at: null,
  //       created_by: null,
  //       icon_name: 'gamepad',
  //       id: 13,
  //       is_default: 0,
  //       longname: 'Gadgets',
  //       org_id: null,
  //       shortname: 'Gadgets',
  //       site_id: null,
  //       slug: 'gadgets',
  //       status: 1,
  //       updated_at: '2023-09-12T11:56:40.000000Z',
  //       updated_by: null,
  //     },
  //     categories_id: 13,
  //     created_at: '2023-10-31T06:11:31.000000Z',
  //     created_by: null,
  //     emp_id: 8,
  //     id: 39,
  //     json_image:
  //       '[{"id":"0","image_storage_path":"\\/storage\\/ExpenseBills\\/1700131211330.jpg"},{"id":"1","image_storage_path":"\\/storage\\/ExpenseBills\\/1700131211342.jpg"},{"id":"2","image_storage_path":"\\/storage\\/ExpenseBills\\/1700131211359.jpg"}]',
  //     org_id: 1,
  //     site_id: 1,
  //     slug: '650-2',
  //     transaction_date: '2023-10-31',
  //     transactions_description: 'Tpys',
  //     transactions_image:
  //       '/storage/ExpenseBills/e2406895-6ec8-4f02-8afa-f4dd11b9569e.png',
  //     updated_at: '2023-11-16T10:41:42.000000Z',
  //     updated_by: null,
  //   },
  //   {
  //     amount: 65000,
  //     categories_datails: {
  //       created_at: null,
  //       created_by: null,
  //       icon_name: 'calendar-month',
  //       id: 8,
  //       is_default: 0,
  //       longname: 'Loans',
  //       org_id: null,
  //       shortname: 'Loans',
  //       site_id: null,
  //       slug: 'loans',
  //       status: 1,
  //       updated_at: null,
  //       updated_by: null,
  //     },
  //     categories_id: 8,
  //     created_at: '2023-10-31T06:12:12.000000Z',
  //     created_by: null,
  //     emp_id: 8,
  //     id: 40,
  //     json_image: 'null',
  //     org_id: 1,
  //     site_id: 1,
  //     slug: '65000',
  //     transaction_date: '2023-10-31',
  //     transactions_description: 'Loan',
  //     transactions_image: null,
  //     updated_at: '2023-10-31T06:12:12.000000Z',
  //     updated_by: null,
  //   },
  //   {
  //     amount: 50000,
  //     categories_datails: {
  //       created_at: null,
  //       created_by: null,
  //       icon_name: 'directions-bus',
  //       id: 2,
  //       is_default: 0,
  //       longname: 'Travel',
  //       org_id: null,
  //       shortname: 'Travel',
  //       site_id: null,
  //       slug: 'travel',
  //       status: 1,
  //       updated_at: null,
  //       updated_by: null,
  //     },
  //     categories_id: 2,
  //     created_at: '2023-10-31T06:12:47.000000Z',
  //     created_by: null,
  //     emp_id: 8,
  //     id: 41,
  //     json_image: 'null',
  //     org_id: 1,
  //     site_id: 1,
  //     slug: '50000',
  //     transaction_date: '2023-10-31',
  //     transactions_description: 'Travelling to hometown',
  //     transactions_image: null,
  //     updated_at: '2023-10-31T06:12:47.000000Z',
  //     updated_by: null,
  //   },
  //   {
  //     amount: 10,
  //     categories_datails: {
  //       created_at: null,
  //       created_by: null,
  //       icon_name: 'local-gas-station',
  //       id: 6,
  //       is_default: 0,
  //       longname: 'Fuel',
  //       org_id: null,
  //       shortname: 'Fuel',
  //       site_id: null,
  //       slug: 'fuel',
  //       status: 1,
  //       updated_at: null,
  //       updated_by: null,
  //     },
  //     categories_id: 6,
  //     created_at: '2023-11-14T11:32:16.000000Z',
  //     created_by: null,
  //     emp_id: 8,
  //     id: 43,
  //     json_image:
  //       '[{"id":"0","image_storage_path":"\\/storage\\/ExpenseBills\\/1699961504664.jpg"}]',
  //     org_id: 1,
  //     site_id: 1,
  //     slug: '10',
  //     transaction_date: '2023-11-14',
  //     transactions_description: 'Description fuel',
  //     transactions_image:
  //       '/storage/ExpenseBills/ea9ca389-3437-457d-80c6-8c14ca2e84c5.png',
  //     updated_at: '2023-11-14T11:32:16.000000Z',
  //     updated_by: null,
  //   },
  //   {
  //     amount: 55,
  //     categories_datails: {
  //       created_at: null,
  //       created_by: null,
  //       icon_name: 'directions-bus',
  //       id: 2,
  //       is_default: 0,
  //       longname: 'Travel',
  //       org_id: null,
  //       shortname: 'Travel',
  //       site_id: null,
  //       slug: 'travel',
  //       status: 1,
  //       updated_at: null,
  //       updated_by: null,
  //     },
  //     categories_id: 2,
  //     created_at: '2023-11-23T12:50:49.000000Z',
  //     created_by: null,
  //     emp_id: 8,
  //     id: 44,
  //     json_image: 'null',
  //     org_id: 1,
  //     site_id: 1,
  //     slug: '55',
  //     transaction_date: '2023-11-23',
  //     transactions_description: 'Bus ticket',
  //     transactions_image: null,
  //     updated_at: '2023-11-23T12:50:49.000000Z',
  //     updated_by: null,
  //   },
  // ];

  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    Collectivedata(value);
  }, [value]);

  const Collectivedata = async () => {
    const currentDate = new Date();
    const data = [];
    const fetcheddata = await fetchTransactionHistory();
    const transactionsLast3Months = fetcheddata.filter(
      filterTransactionsLast3Months,
    );
    // console.log('last 3 months trxn', transactionsLast3Months);

    const transactionsByMonth = {};
    transactionsLast3Months.forEach(transaction => {
      const transactionDate = new Date(transaction.transaction_date);
      const monthKey = `${transactionDate.getFullYear()}-${
        transactionDate.getMonth() + 1
      }`;

      // Check if the month key already exists, if not, create an array for it
      if (!transactionsByMonth[monthKey]) {
        transactionsByMonth[monthKey] = [];
      }

      // Add the transaction to the corresponding month
      transactionsByMonth[monthKey].push(transaction);
    });

    setMonthlyData(transactionsByMonth);

    // Display the result
    // console.log('Result ', monthlyData);
  };

  const filterTransactionsLast3Months = transaction => {
    // console.log('transaction here === ', transaction);
    const transactionDate = new Date(transaction.transaction_date);
    const currentDate = new Date();

    // Calculate the difference in months between the current date and transaction date
    const monthsDifference =
      (currentDate.getFullYear() - transactionDate.getFullYear()) * 12 +
      (currentDate.getMonth() - transactionDate.getMonth());
    // Filter transactions done in the last 1 month
    return monthsDifference <= value;
  };

  return (
    <ScrollView style={{flex: 1, padding: '5%',marginBottom:'5%'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontFamily: 'EduSABeginner-SemiBold', fontSize: 20}}>
          Select Months
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder="Select Month"
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
          dropdownPosition="auto"
        />
      </View>

      {Object.keys(monthlyData).map(month => (
        <View key={month} style={styles.monthContainer}>
          <Text style={styles.title}>{moment(month).format('MMMM')}</Text>
          <View
            style={{
              flexDirection: 'row',
              padding: '5%',
              justifyContent: 'space-evenly',
            }}>
            <Text style={styles.highestExpense}>Highest Expense</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Text> Highest Expense Category: {getHighestExpenseCategory(monthlyData[month])}</Text> */}
              <Text style={styles.amountExpense}>
                {'\u20B9'}
                {Math.max(...monthlyData[month].map(t => t.amount))}
              </Text>
            </View>
          </View>
          <View>
            <FlatList
              scrollEnabled={true}
              scrollsToTop={true}
              data={monthlyData[month]}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View
                  style={{
                    padding: 10,
                    borderTopWidth: 0.5,
                  }}>
                  <Text>Date: {item.transaction_date}</Text>
                  <Text>Description: {item.transactions_description}</Text>
                  <Text>Amount: {item.amount}</Text>
                </View>
              )}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ComparisionScreen;

const styles = StyleSheet.create({
  selectedTextStyle: {
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'EduSABeginner-Regular',
    lineHeight: 30,
  },
  dropdown: {
    height: 30,
    width: 150,
    borderBottomColor: 'gray',
    borderWidth: 0.5,
    paddingLeft: 5,
  },
  monthContainer: {
    marginTop: 20,
    marginBottom: 20,
    padding: '5%',
    borderWidth: 1,
    backgroundColor: primaryColor,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'EduSABeginner-Bold',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  highestExpense: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'EduSABeginner-Regular',
    color: '#fff',
  },
  amountExpense: {
    fontSize: 25,
    marginBottom: 10,
    fontFamily: 'EduSABeginner-SemiBold',
    color: '#fff',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
