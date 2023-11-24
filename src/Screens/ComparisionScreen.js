import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {fetchTransactionHistory} from '../Helpers/helpers';

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
    console.log('last 3 months trxn', transactionsLast3Months);
    
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

    // Display the result
    console.log("Result ",transactionsByMonth);
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
    return monthsDifference <= 1;
  };

  return (
    <View style={{flex: 1}}>
      <View>
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
    </View>
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
});
