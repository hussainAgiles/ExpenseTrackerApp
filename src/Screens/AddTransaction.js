import AsyncStorage from '@react-native-async-storage/async-storage';
import fireStore from '@react-native-firebase/firestore';
import moment from 'moment';
import React, {useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
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
import Loader from '../Components/Loader';
import {globalStyle, screenNames} from '../Constants/constant';
import {primaryColor, secondaryColor, textColor} from '../Utils/CustomColors';
import {handleCategories} from '../Utils/TransactionUpdates';
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {
  add_Transaction,
  fetchCategories,
  imageUpload,
} from '../Helpers/helpers';
import RNFS from 'react-native-fs';

export default function AddTransaction({route, navigation}) {
  const oldTransaction = route.params.payload;
  // console.log("transacion received",oldTransaction)
  useLayoutEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchAllCategories();
    }
    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  const prepopulateDataForUpdate = () => {
    setCategoryId(oldTransaction.categories_id);
    setSelectedDate(new Date(oldTransaction.transaction_date));
    setPayload({
      amount: oldTransaction.amount,
      transactions_description: oldTransaction.transactions_description,
      transaction_date: oldTransaction.transaction_date,
      id: oldTransaction.id,
      categories_id: oldTransaction.categories_id,
    });
    // setisLoading(false)
  };

  const showFutureDates = route.params.showFutureDates;

  let initialState = {
    categories_id: 0,
    amount: 0,
    transactions_description: '',
    transaction_date: moment(selectedDate).format('YYYY-MM-DD'),
    transactions_image: '',
  };

  const today = new Date();
  let yesterday = new Date();
  let tomorrow = new Date();
  yesterday.setDate(today.getDate() - 1);
  tomorrow.setDate(today.getDate() + 1);

  const [payload, setPayload] = useState(initialState);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [imageUri, setImageUri] = useState();
  const [multipleImages, setMultipleImages] = useState([]);

  // Fetching all the categories to display for addding transaction.
  const fetchAllCategories = async () => {
    const response = await fetchCategories();
    const sortedData = response.data.categories.sort((a, b) =>
      a.longname.localeCompare(b.longname),
    );
    const finalCat = handleCategories(sortedData);
    setCategory(finalCat);
  };

  // handling change of textInput
  const handleChange = (key, value) => {
    setPayload({...payload, [key]: value});
  };

  const dateToString = date => {
    return moment(date).format('DD/MM');
  };

  // handling Selected date while adding transaction.
  const handleSelectDate = inDate => {
    setShowDatePicker(false);
    setSelectedDate(inDate);
    setPayload({
      ...payload,
      transaction_date: moment(inDate).format('YYYY-MM-DD'),
    });
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

  // Validating the amount field.
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

  // On Click of Save Button
  const handleSubmit = async () => {
    if (validate() === false) {
      // setIsLoading(false);
      return;
    }

    let payloadToSend = {...payload};
    let payloadToUpadte = {
      ...payload,
    };
    // console.log("Details that are captured to send === ",payloadToUpadte)
    let isSuccessful;
    if (oldTransaction !== undefined) {
      isSuccessful = updateTransaction(payloadToUpadte);
    } else {
      isSuccessful = await addTransaction();
    }
    if (isSuccessful) {
      setCategoryId(null);
      setPayload(initialState);
      setErrMsg('');
    }
  };

  const uId = uuid.v4();

  // handle add Transaction
  const addTransaction = async () => {
    const response = await add_Transaction(payload);
    if (response.status === 200) {
      toast.show(response.data.message, toast.SHORT);
      navigation.navigate(screenNames.Transaction);
    } else {
      toast.show(response.data.message, toast.SHORT);
    }
  };

  // handle update Transaction
  const updateTransaction = async data => {
    // console.log("Data === ",data)
    const response = await add_Transaction(payload);
    if (response.status === 200) {
      toast.show(response.data.message, toast.SHORT);
      navigation.navigate(screenNames.Transaction);
    } else {
      toast.show(response.data.message, toast.SHORT);
    }
  };

  useLayoutEffect(() => {
    // setisLoading(true)
    if (oldTransaction !== undefined) prepopulateDataForUpdate();
  }, []);

  const openCamera = async () => {
    ImagePicker.openCamera({
      width: 100,
      height: 100,
      cropping: true,
    }).then(async image => {
      setImageUri(image.path);
      const payloadRequest = {
        image: image,
        folder: 'ExpenseBills',
      };
      const response = await imageUpload(payloadRequest);
      setPayload({
        ...payload,
        transactions_image: response.filepath,
      });
    });
  };

  const data = [];
  const openGallery = async () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(image => {
      // console.log(image);
      setMultipleImages(image);
    });
  };


  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1}}>
          <Loader />
        </View>
      ) : (
        <View style={{padding: 15}}>
          <FlatList
            ListHeaderComponent={
              <>
                <Text
                  style={[
                    styles.heading,
                    {
                      marginTop: 10,
                      fontFamily: 'EduSABeginner-SemiBold',
                      paddingLeft: 10,
                      paddingRight: 10,
                    },
                  ]}>
                  Categories
                </Text>
              </>
            }
            showsVerticalScrollIndicator={false}
            numColumns={4}
            data={category}
            keyExtractor={item => item.id}
            columnWrapperStyle={{flex: 1, justifyContent: 'space-evenly'}}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  setCategoryId(item.id);
                  setPayload({...payload, categories_id: item.id});
                }}
                style={[
                  styles.categoryBox,
                  categoryId === item.id && {backgroundColor: '#44CD40'},
                ]}>
                {item.longname.length > 10 ? (
                  <Text style={styles.categoryText}>
                    {item.longname.slice(0, 10) + '...'}
                  </Text>
                ) : (
                  <Text style={styles.categoryText}>{item.longname}</Text>
                )}
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <>
                <View style={{marginVertical: 10}}>
                  <Text
                    style={[
                      styles.heading,
                      {
                        paddingLeft: 10,
                        paddingRight: 10,
                        fontFamily: 'EduSABeginner-SemiBold',
                      },
                    ]}>
                    Date
                  </Text>
                  <View style={styles.dateContainer}>
                    <View
                      style={[
                        styles.dateBoxes,
                        {paddingLeft: 10, paddingRight: 10},
                      ]}>
                      {showFutureDates ? (
                        <TouchableOpacity
                          onPress={() => handleSelectDate(tomorrow)}
                          style={[
                            styles.dateBox,
                            {marginRight: 30},
                            selectedDate.toLocaleDateString() ===
                              tomorrow.toLocaleDateString() && {
                              backgroundColor: secondaryColor,
                            },
                          ]}>
                          <View style={styles.textContainer}>
                            <Text
                              style={[
                                styles.dateText,
                                {fontFamily: 'EduSABeginner-SemiBold'},
                              ]}>
                              {dateToString(tomorrow)}
                            </Text>
                            <Text
                              style={[
                                styles.dateText,
                                {fontFamily: 'EduSABeginner-Regular'},
                              ]}>
                              Tomorrow
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <>
                          {isSelectedDateVisible() && (
                            <TouchableOpacity
                              style={[
                                styles.dateBox,
                                {marginRight: 10},
                                {backgroundColor: secondaryColor},
                              ]}>
                              <View style={styles.textContainer}>
                                <Text
                                  style={[
                                    styles.dateText,
                                    {fontFamily: 'EduSABeginner-SemiBold'},
                                  ]}>
                                  {dateToString(selectedDate)}
                                </Text>
                                <Text
                                  style={[
                                    styles.dateText,
                                    {fontFamily: 'EduSABeginner-Regualr'},
                                  ]}>
                                  Selected
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                          <TouchableOpacity
                            onPress={() => handleSelectDate(yesterday)}
                            style={[
                              styles.dateBox,
                              selectedDate.toLocaleDateString() ===
                                yesterday.toLocaleDateString() && {
                                backgroundColor: secondaryColor,
                              },
                            ]}>
                            <View style={styles.textContainer}>
                              <Text
                                style={[
                                  styles.dateText,
                                  {fontFamily: 'EduSABeginner-SemiBold'},
                                ]}>
                                {dateToString(yesterday)}
                              </Text>
                              <Text
                                style={[
                                  styles.dateText,
                                  {fontFamily: 'EduSABeginner-Regular'},
                                ]}>
                                Yesterday
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleSelectDate(today)}
                            style={[
                              styles.dateBox,
                              {marginHorizontal: 10},
                              selectedDate.toLocaleDateString() ===
                                today.toLocaleDateString() && {
                                backgroundColor: secondaryColor,
                              },
                            ]}>
                            <View style={styles.textContainer}>
                              <Text
                                style={[
                                  styles.dateText,
                                  {fontFamily: 'EduSABeginner-SemiBold'},
                                ]}>
                                {dateToString(today)}
                              </Text>
                              <Text
                                style={[
                                  styles.dateText,
                                  {fontFamily: 'EduSABeginner-Regular'},
                                ]}>
                                Today
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.calendarIcon}
                      onPress={() => {
                        setShowDatePicker(true);
                      }}>
                      <FontAwesome
                        name="calendar"
                        size={25}
                        color={primaryColor}
                      />
                    </TouchableOpacity>
                  </View>
                  {showDatePicker && (
                    <DatePicker
                      handleSelectDate={handleSelectDate}
                      showFutureDates={showFutureDates}
                    />
                  )}
                </View>
                <View style={{marginVertical: 10, paddingHorizontal: 10}}>
                  <Text
                    style={[
                      styles.heading,
                      {fontFamily: 'EduSABeginner-SemiBold'},
                    ]}>
                    Description
                  </Text>
                  <TextInput
                    value={payload.transactions_description}
                    style={styles.note}
                    placeholder="Comment"
                    placeholderTextColor={textColor}
                    onChangeText={text =>
                      handleChange('transactions_description', text)
                    }
                  />
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 20,
                      fontFamily: 'EduSABeginner-SemiBold',
                    }}>
                    Amount
                  </Text>
                  <TextInput
                    value={payload.amount.toString()}
                    style={styles.note}
                    autoFocus={true}
                    placeholder="INR"
                    placeholderTextColor={textColor}
                    keyboardType="numeric"
                    onChangeText={amt => handleChange('amount', amt)}
                  />
                </View>
                {errMsg.trim().length !== 0 && (
                  <Text style={globalStyle.error}>{errMsg}</Text>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 20,
                      fontFamily: 'EduSABeginner-SemiBold',
                      lineHeight: 45,
                    }}>
                    Add Image
                  </Text>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        openCamera();
                      }}
                      style={{paddingHorizontal: 10}}>
                      <FontAwesome
                        name="camera"
                        size={25}
                        color={primaryColor}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        openGallery();
                      }}>
                      <FontAwesome
                        name="photo"
                        size={25}
                        color={primaryColor}
                      />
                    </TouchableOpacity>
                  </View>

                  {imageUri ? (
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <Image
                        source={{uri: imageUri}}
                        style={{width: 70, height: 120, marginHorizontal: 10}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Text
                      style={{
                        marginHorizontal: 10,
                        fontFamily: 'EduSABeginner-Regular',
                        fontSize: 18,
                      }}></Text>
                  )}
                  {multipleImages?.length > 0 ? (
                    <FlatList
                      data={multipleImages}
                      numColumns={2}
                      renderItem={({item}) => (
                        <View>
                          <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Image
                              source={{uri: item.path}}
                              style={{
                                width: 50,
                                height: 50,
                                marginHorizontal: 10,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  ) : (
                    <Text></Text>
                  )}
                  <Modal visible={modalVisible} animationType="fade">
                    <View style={styles.modalContent}>
                      <Image
                        source={{uri: imageUri}}
                        style={styles.modalImage}
                      />
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButton}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </View>
                <View
                  style={{
                    width: '90%',
                    backgroundColor: '#03707a',
                    borderRadius: 20,
                    padding: 8,
                    height: 50,
                    marginLeft: '5%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      width: '90%',
                      height: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: 18,
                        fontFamily: 'EduSABeginner-Bold',
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            }
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: textColor,
    fontSize: 18,
    marginBottom: 5,
  },
  amountField: {
    backgroundColor: '#fff',
    fontSize: 20,
    width: '90%',
    textAlign: 'center',
    color: textColor,
  },
  categoryText: {
    color: textColor,
    textAlign: 'center',
    paddingVertical: 5,
    fontFamily: 'EduSABeginner-Regular',
  },
  categoryBox: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    width: 85,
    paddingBottom: 5,
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
    fontSize: 15,
    fontFamily: 'EduSABeginner-Regular',
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
  },
});
