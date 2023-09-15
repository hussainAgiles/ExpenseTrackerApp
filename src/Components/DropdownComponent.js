import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text,Dimensions} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import fireStore from '@react-native-firebase/firestore';
import { fetchCategories, fetchTransactionHistory } from '../Helpers/helpers';

const screenWidth = Dimensions.get('window').width;

const DropdownComponent = ({onResponse}) => {
  const [value, setValue] = useState(null);
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const fetchCategoryList = async () => {
    const response = await fetchCategories();
    // console.log("Response DD === ",response.data)
    const sortedData = response.data.categories.sort((a, b) => a.longname.localeCompare(b.longname));
    const reducedData = sortedData.reduce((acc, item) => {
      acc.push({
        label: item.longname,
        value: item.id,
      });
      return acc;
    }, []);
    setBackendData(reducedData);
  };

  const modifiedData = backendData?.map(item => {
    const newItem = {};
    Object.keys(item).forEach(key => {
      // Remove all double quotes from the key
      const newKey = key.replace(/"/g, '');
      newItem[newKey] = item[key];
    });
    return newItem;
  });

  const handleFilter = async filterValue => {
    const fetcheddata = await fetchTransactionHistory();
    const recentTransactions=fetcheddata.filter(transaction => transaction.categories_id === filterValue);
      onResponse(recentTransactions);
    
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={modifiedData}
      maxHeight={200}
      labelField="label"
      valueField="value"
      placeholder="Select Category"
      value={value}
      showsVerticalScrollIndicator={false}
      onChange={item => {
        setValue(item.value);
        handleFilter(item.value);
      }}
      dropdownPosition="auto"
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 30,
    width: screenWidth-270,
    borderBottomColor: 'gray',
    borderWidth: 0.5,
    paddingLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'EduSABeginner-Regular',
    lineHeight:30
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
