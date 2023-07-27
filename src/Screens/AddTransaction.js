import AsyncStorage from '@react-native-async-storage/async-storage';
import fireStore from '@react-native-firebase/firestore';
import moment from 'moment';
import React, { useLayoutEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from '../Components/DatePicker';
import { globalStyle, screenNames } from '../Constants/constant';
import { primaryColor, secondaryColor, textColor } from '../Utils/CustomColors';
import { handleCategories } from '../Utils/TransactionUpdates';
import Loader from '../Components/Loader'

export default function AddTransaction({ route, navigation }) {
  const oldTransaction = route.params.payload;
  // console.log("transacion received",oldTransaction)

  useLayoutEffect(() => {
    let isMounted = true 
    if(isMounted){
      fetchCategories();
    }return () =>{
      isMounted =false
    }
    
  }, [categoryId]);

  const prepopulateDataForUpdate = () => {
    setCategoryId(oldTransaction.category_id);
    setCategoryName(oldTransaction.category_name);
    setSelectedDate(new Date(oldTransaction.transactionDate.toDate()));
    setPayload({
      amount: oldTransaction.amount,
      note: oldTransaction.note,
      transactionDate: oldTransaction.transactionDate,
    });
    // setisLoading(false)
    // console.log("Payload now ",payload)

  };

  const showFutureDates = route.params.showFutureDates;

  let initialState = {
    amount: 0,
    note: '',
    transactionDate: new Date(),
  };

  const today = new Date();
  let yesterday = new Date();
  let tomorrow = new Date();
  yesterday.setDate(today.getDate() - 1);
  tomorrow.setDate(today.getDate() + 1);

  const [payload, setPayload] = useState(initialState);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName,setCategoryName] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    const collectionRef = fireStore().collection('Category');
    const snapshot = await collectionRef.get();
    const fetcheddata = snapshot.docs.map(doc => doc.data());
    const finalCat = handleCategories(fetcheddata);
    setCategory(finalCat);
  };

  const handleChange = (key, value) => {
    setPayload({ ...payload, [key]: value });
  };

  const dateToString = date => {
    return moment(date).format('DD/MM');
  };

  // handling Selected date while adding transaction.
  const handleSelectDate = inDate => {
    setShowDatePicker(false);
    setSelectedDate(inDate);
    setPayload({ ...payload, transactionDate: inDate });
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
    //Validation
    if (validate() === false) {
      // setIsLoading(false);
      return;
    }

    let payloadToSend = { ...payload };
    let payloadToUpadte ={ ...payload,category_id:categoryId, category_name:categoryName}
    // console.log("Details that are captured to send === ",payloadToUpadte)
    let isSuccessful;
    if (oldTransaction !== undefined){
      isSuccessful = updateTransaction(
        payloadToUpadte,
        oldTransaction.id
      );
    }
    else{
      isSuccessful = await addTransaction();
    } 
    if (isSuccessful) {
      setCategoryId(null);
      setPayload(initialState)
      setErrMsg('')
    }
  };

  const uId = uuid.v4();

  const addTransaction = async () => {
    const userId = await AsyncStorage.getItem('User_Token');
    const response = await fireStore()
      .collection('Transaction')
      .add({ ...payload, category_id: categoryId, user_id: userId, id: uId, category_name:categoryName})
      .then(() => {
        toast.show('Transaction added succesfully', toast.CENTER);
      });
    navigation.navigate(screenNames.Transaction)
  };

  const updateTransaction = async(data,transactionId) =>{
    // console.log("Updating trxn === ",data)
    var query = fireStore()
      .collection('Transaction')
      .where('id', '==', transactionId);
    query.get().then(snapshot => {
      const batch = fireStore().batch();
      snapshot.forEach(doc => {
        batch.update(doc.ref,data );
      });
      return batch.commit()
    });
    toast.show('Transaction Updated succesfully', toast.CENTER);
    navigation.navigate(screenNames.Transaction)
  }

  useLayoutEffect(() => {
    // setisLoading(true)
    if( oldTransaction !== undefined) prepopulateDataForUpdate(); 
  }, []);

  


  const categorySelected = (categoryItem) =>{
    setCategoryId(categoryItem.id)
    // console.log("item id  === ",categoryId)
    setCategoryName(categoryItem.title)
  }
  

  return (
    <>
    {isLoading ? (
      <View style={{flex:1}}>
        <Loader/>
      </View>
    ):(
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
            onPress={() =>categorySelected(item)}
            style={[
              styles.categoryBox,
              categoryId === item.id && { backgroundColor: '#44CD40' }
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
                          <Text style={styles.dateText}>Yesterday</Text>
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

            {/* <Button
              mode="contained"
              color={primaryColor}
              style={styles.addButton}
              onPress={handleSubmit}>
              Save
            </Button> */}
          
            <View
              style={{
                width: '90%',
                backgroundColor: '#03707a',
                borderRadius: 20,
                padding: 8,
                height: 50,
                marginLeft: '5%',
                justifyContent:"center",
                alignItems:"center"
              }}>
              <TouchableOpacity onPress={handleSubmit} style={{width: '90%', height: 40,justifyContent:"center",
                alignItems:"center"}}>
                <Text style={{textAlign: 'center', color: '#fff',fontSize:18}}>
                 Save
                </Text>
              </TouchableOpacity>
            </View>


          </>
        }
      />
    </View>
    )

    }

    </>
    
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
  // addButton: {
  //   padding: 5,
  //   marginTop: 10,
  // },
});
