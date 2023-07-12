import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { primaryColor, secondaryColor, textColor } from '../Utils/CustomColors';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import DatePicker from '../Components/DatePicker';
import Loading from '../Components/Loader';
import fireStore from '@react-native-firebase/firestore';
import toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screenNames } from '../Constants/constant';
import uuid from 'react-native-uuid';

export default function AddTransaction({ route, navigation, oldTransaction }) {
  useEffect(() => {
    fetchCategories();
  }, []);

  const showFutureDates = route.params.showFutureDates;

  // const oldTransaction = route.params.transaction;

  let initialState = {
    amount: 0,
    note: '',
    transactionDate: new Date()
  };



  const today = new Date();
  let yesterday = new Date();
  let tomorrow = new Date();
  yesterday.setDate(today.getDate() - 1);
  tomorrow.setDate(today.getDate() + 1);

  const [payload, setPayload] = useState(initialState);
  const [categoryId, setCategoryId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    const collectionRef = fireStore().collection('Category');
    const snapshot = await collectionRef.get();
    const fetcheddata = snapshot.docs.map(doc => doc.data());
    setCategory(fetcheddata);
    // const finalCat = handleCategories(fetcheddata);
    // setCategories(finalCat);
  };

  const handleChange = (key, value) => {
    setPayload({ ...payload, [key]: value });
  };

  const dateToString = date => {
    return moment(date).format('DD/MM');
  };

  const handleSelectDate = inDate => {
    setShowDatePicker(false);
    setSelectedDate(inDate);
    setPayload({ ...payload, transactionDate: inDate.getTime() });
    // setTransactionDate(inDate.getTime())
  };

  const isSelectedDateVisible = () => {
    if (showFutureDates)
      return (
        selectedDate.toLocaleDateString() !== yesterday.toLocaleDateString() &&
        selectedDate.toLocaleDateString() !== tomorrow.toLocaleDateString()
      );
    return (
      selectedDate.toLocaleDateString() !== today.toLocaleDateString() &&
      selectedDate.toLocaleDateString() !== yesterday.toLocaleDateString() &&
      selectedDate.toLocaleDateString() !== tomorrow.toLocaleDateString()
    );
  };

  const validate = () => {
    if (payload.amount <= 0) {
      setErrMsg('Amount must be greater than Zero');
      return false;
    }
    if (isNaN(payload.amount)) {
      setErrMsg('Amount should be a number');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // setIsLoading(true);

    //Validation
    if (validate() === false) {
      // setIsLoading(false);
      return;
    }

    let payloadToSend = { ...payload };
    let isSuccessful;
    if (oldTransaction !== undefined)
      isSuccessful = await updateTrxn(
        payloadToSend,
        categoryId,
        oldTransaction.id,
      );
    else isSuccessful = await addTransaction();
    if (isSuccessful) {
      setCategoryId(null);
      setPayload(initialState)
      setErrMsg('')
    }
  };

  const uId = uuid.v4();

  const addTransaction = async () => {
    const userId = await AsyncStorage.getItem('User_Token');
    // console.log("Payload getting pushed",payload)
    const response = await fireStore()
      .collection('Transaction')
      .add({ ...payload, category_id: categoryId, user_id: userId, id: uId })
      .then(() => {
        toast.show('Transaction added succesfully', toast.CENTER);
      });
    navigation.navigate(screenNames.Transaction)
  };



  return (
    <View style={{ padding: 10}}>
      <FlatList
        ListHeaderComponent={
          <>
            <View
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: "center"
              }}>
              <Text style={{ marginRight: 10, fontSize: 20 }}>Amount</Text>
              <TextInput
                value={payload.amount.toString()}
                style={styles.amountField}
                autoFocus={true}
                placeholder="INR"
                placeholderTextColor={textColor}
                keyboardType="numeric"
                onChangeText={amt => handleChange('amount', amt)}
              />
            </View>
            <Text style={[styles.heading, { marginTop: 10 }]}>Categories</Text>
          </>
        }
        numColumns={4}
        data={category}
        keyExtractor={item => item.id}
        columnWrapperStyle={{ flex: 1, justifyContent: 'space-evenly' }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setCategoryId(item.id)}
            style={[
              styles.categoryBox,
              categoryId === item.id && { backgroundColor: '#44CD40' },

            ]}>
            {item.title.length > 10 ? (
              <Text style={styles.categoryText}>
                {item.title.slice(0, 10) + '...'}
              </Text>
            ) : (
              <Text style={styles.categoryText}>{item.title}</Text>
            )}
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <>
            {/* {!showFutureDates && (
              <TouchableOpacity
                onPress={() => navigation.navigate(screenNames.Categories)}
                style={
                  // styles.categoryBox,
                  styles.addCategoryBox
                }>
                <Text style={[styles.categoryText, {color: '#fff'}]}>
                  + Create
                </Text>
              </TouchableOpacity>
            )} */}
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.heading}>Date</Text>
              <View style={styles.dateContainer}>
                <View style={styles.dateBoxes}>
                  {showFutureDates ? (
                    <TouchableOpacity
                      onPress={() => handleSelectDate(tomorrow)}
                      style={[
                        styles.dateBox,
                        { marginRight: 30 },
                        selectedDate.toLocaleDateString() ===
                        tomorrow.toLocaleDateString() && {
                          backgroundColor: secondaryColor,
                        },
                      ]}>
                      <View style={styles.textContainer}>
                        <Text style={styles.dateText}>
                          {dateToString(tomorrow)}
                        </Text>
                        <Text style={styles.dateText}>TMR</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={() => handleSelectDate(today)}
                        style={[
                          styles.dateBox,
                          selectedDate.toLocaleDateString() ===
                          today.toLocaleDateString() && {
                            backgroundColor: secondaryColor,
                          },
                        ]}>
                        <View style={styles.textContainer}>
                          <Text style={styles.dateText}>
                            {dateToString(today)}
                          </Text>
                          <Text style={styles.dateText}>Today</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleSelectDate(yesterday)}
                        style={[
                          styles.dateBox,
                          { marginHorizontal: 30 },
                          selectedDate.toLocaleDateString() ===
                          yesterday.toLocaleDateString() && {
                            backgroundColor: secondaryColor,
                          },
                        ]}>
                        <View style={styles.textContainer}>
                          <Text style={styles.dateText}>
                            {dateToString(yesterday)}
                          </Text>
                          <Text style={styles.dateText}>Yes'day</Text>
                        </View>
                      </TouchableOpacity>
                    </>
                  )}
                  {isSelectedDateVisible() && (
                    <TouchableOpacity
                      style={[
                        styles.dateBox,
                        { backgroundColor: secondaryColor },
                      ]}>
                      <View style={styles.textContainer}>
                        <Text style={styles.dateText}>
                          {dateToString(selectedDate)}
                        </Text>
                        <Text style={styles.dateText}>Selected</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.calendarIcon}
                  onPress={() => {
                    setShowDatePicker(true);
                  }}>
                  <FontAwesome name="calendar" size={25} color={primaryColor} />
                </TouchableOpacity>
              </View>
              {showDatePicker && (
                <DatePicker
                  handleSelectDate={handleSelectDate}
                  showFutureDates={showFutureDates}
                />
              )}
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.heading}>Note</Text>
              <TextInput
                value={payload.note}
                style={styles.note}
                placeholder="Comment"
                placeholderTextColor={textColor}
                onChangeText={text => handleChange('note', text)}
              />
            </View>
            {errMsg.trim().length !== 0 && (
              <Text style={globalStyle.error}>{errMsg}</Text>
            )}

            <Button
              mode="contained"
              color={primaryColor}
              style={styles.addButton}
              onPress={handleSubmit}>
              Save
            </Button>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: textColor,
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500',
  },
  amountField: {
    backgroundColor: '#fff',
    width: 100,
    borderBottomWidth: 2,
    fontSize: 20,
    textAlign: 'center',
    color: textColor,
  },
  categoryText: {
    color: textColor,
    textAlign: 'center',
    paddingVertical: 5,
  },
  categoryBox: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    width: 85,
  },
  addCategoryBox: {
    borderRadius: 10,
    marginVertical: 5,
    justifyContent: 'center',
    padding: 2,
    backgroundColor: 'grey',
  },
  dateContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  dateBox: {
    width: 70,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  dateText: {
    color: textColor,
  },
  calendarIcon: {
    paddingVertical: 12,
    marginRight: 3,
  },
  note: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: '#fff',
    color: textColor,
    paddingLeft: 10,
  },
  addButton: {
    padding: 5,
    marginTop: 10,
  },
});
