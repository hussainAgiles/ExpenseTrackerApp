import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import fireStore from '@react-native-firebase/firestore';

const DropdownComponent = ({onResponse}) => {
  const [value, setValue] = useState(null);
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const fetchCategoryList = async () => {
    const collectionRef = fireStore().collection('Category');
    const snapshot = await collectionRef.get();
    const fetcheddata = snapshot.docs.map(doc => doc.data());
    const sortedData = fetcheddata.sort((a, b) =>
      a.title.localeCompare(b.title),
    );
    const reducedData = sortedData.reduce((acc, item) => {
      acc.push({
        label: item.title,
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
      const userId =  await AsyncStorage.getItem('userId');
      const collectionRef = fireStore().collection('Transaction');
      const querySnapshot = await collectionRef
        .where('user_id', '==', userId)
        .where('category_id', '==', filterValue)
        .get();
      const recentTransactions = querySnapshot.docs.map(doc => doc.data());
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
    width: 118,
    borderBottomColor: 'gray',
    borderWidth: 0.5,
    paddingLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'EduSABeginner-SemiBold',
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
