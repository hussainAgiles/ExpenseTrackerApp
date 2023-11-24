import moment from 'moment';
import React, { useLayoutEffect, useState,useEffect } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from '../Components/DatePicker';
import Loader from '../Components/Loader';
import { globalStyle, screenNames } from '../Constants/constant';
import { primaryColor, secondaryColor, textColor } from '../Utils/CustomColors';
import { handleCategories } from '../Utils/TransactionUpdates';
import * as ImagePicker from 'react-native-image-picker';
import GalleryPicker from 'react-native-image-crop-picker';
import {
  add_Transaction,
  fetchCategories,
  imageUpload,
  multiImageUpload,
} from '../Helpers/helpers';
import { imageBaseUrl } from '../API/Endpoints';
import AddTranxnSkeleton from '../Skeleton/AddTranxnSkeleton';


export default function AddTransaction({ route, navigation }) {
  const oldTransaction = route.params.payload;
  // console.log("transacion received",oldTransaction)
  useEffect(() => {
    setisLoading(true)
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        fetchAllCategories();
      }, 2000);
    }
    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  const prepopulateDataForUpdate = () => {
    setCategoryId(oldTransaction.categories_id);
    setSelectedDate(new Date(oldTransaction.transaction_date));
    setImageUri(imageBaseUrl + oldTransaction.transactions_image);
    setMultipleImages(JSON.parse(oldTransaction.json_image));
    setPayload({
      amount: oldTransaction.amount,
      transactions_description: oldTransaction.transactions_description,
      transaction_date: oldTransaction.transaction_date,
      id: oldTransaction.id,
      categories_id: oldTransaction.categories_id,
      transactions_image: oldTransaction.transactions_image,
    });
    // setisLoading(false)
  };

  const showFutureDates = route.params.showFutureDates;

  let initialState = {
    categories_id: 0,
    amount: 0,
    transactions_description: '',
    transaction_date: moment(selectedDate).format('YYYY-MM-DD'),
    transactions_image: null,
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
  const [loaderValue, setLoaderValue] = useState(false);
  const [multiImageModal, setMultiImageModal] = useState();


  // Fetching all the categories to display for addding transaction.
  const fetchAllCategories = async () => {
    const response = await fetchCategories();
    let filteredData = response.data.categories.filter(item => item.longname !== "All");
    const sortedData = filteredData.sort((a, b) =>
      a.longname.localeCompare(b.longname),
    );
    const finalCat = handleCategories(sortedData);
    setCategory(finalCat);
    setisLoading(false)
  };

  // handling change of textInput
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

    let payloadToSend = { ...payload };
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
    // if (isSuccessful) {
    //   setCategoryId(null);
    //   setPayload(initialState);
    //   setErrMsg('');
    // }
  };

  const uId = uuid.v4();

  // handle add Transaction
  const addTransaction = async () => {
    // console.log("payload on add trnxn === ",payload)
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
    if (oldTransaction !== undefined) {
      prepopulateDataForUpdate();
    }
  }, []);

  const openCamera = () => {
    setLoaderValue(true);
    ImagePicker.launchCamera(
      {
        mediaType: 'any',
        includeBase64: true,
      },
      async response => {
        if (response.didCancel) {
          setLoaderValue(false); // Set loader to false when the camera is closed
          return;
        }
        const payloadRequest = {
          image: response.assets[0],
        };
        const responseData = await imageUpload(payloadRequest);
        let ImageUrl = imageBaseUrl + responseData.filepath;
        setImageUri(ImageUrl);
        setPayload({
          ...payload,
          transactions_image: responseData.filepath,
        });
        setLoaderValue(false);
      },
    );
  };

  const openGallery = () => {
    setLoaderValue(true);
    GalleryPicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    }).then(async imageData => {
      if (!imageData) {
        setLoaderValue(false); // Set loader to false when the gallery is closed
        return;
      }
      var selectedImages = [];
      for (let i = 0; i < imageData.length; i++) {
        // console.log('Image ==== ', imageData[i].path); //image[i].data=>base64 string
        let data = {
          id: Math.random(),
          path: imageData[i].path,
        };
        selectedImages.push(data);
      }
      const payloadRequest = {
        imageload: selectedImages,
      };
      const responseData = await multiImageUpload(payloadRequest);
      // console.log('Storing this path', responseData.filepath);
      setPayload({
        ...payload,
        json_image: responseData.filepath,
      });
      setLoaderValue(false);
      setMultipleImages(responseData.filepath);
    });
  };

  const handleMultiImageModal = sourceData => {
    const url = imageBaseUrl + sourceData;
    setMultiImageModal(url);
    setModalVisible(true);
  };

  const handleSingleImageModal = sourceData => {
    setMultiImageModal(sourceData);
    setModalVisible(true);
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {isLoading ? (
        <View style={{ flex: 1 }}>
          <AddTranxnSkeleton/>
        </View>
      ) : (
        <View style={{ padding: 15 }}>
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
            columnWrapperStyle={{ flex: 1, justifyContent: 'space-evenly' }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setCategoryId(item.id);
                  setPayload({ ...payload, categories_id: item.id });
                }}
                style={[
                  styles.categoryBox,
                  categoryId === item.id && { backgroundColor: secondaryColor },
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
                <View style={{ marginVertical: 10 }}>
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
                        { paddingLeft: 10, paddingRight: 10 },
                      ]}>
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
                            <Text
                              style={[
                                styles.dateText,
                                { fontFamily: 'EduSABeginner-SemiBold' },
                              ]}>
                              {dateToString(tomorrow)}
                            </Text>
                            <Text
                              style={[
                                styles.dateText,
                                { fontFamily: 'EduSABeginner-Regular' },
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
                                { marginRight: 10 },
                                { backgroundColor: secondaryColor },
                              ]}>
                              <View style={styles.textContainer}>
                                <Text
                                  style={[
                                    styles.dateText,
                                    { fontFamily: 'EduSABeginner-SemiBold' },
                                  ]}>
                                  {dateToString(selectedDate)}
                                </Text>
                                <Text
                                  style={[
                                    styles.dateText,
                                    { fontFamily: 'EduSABeginner-Regualr' },
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
                                  { fontFamily: 'EduSABeginner-SemiBold' },
                                ]}>
                                {dateToString(yesterday)}
                              </Text>
                              <Text
                                style={[
                                  styles.dateText,
                                  { fontFamily: 'EduSABeginner-Regular' },
                                ]}>
                                Yesterday
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => handleSelectDate(today)}
                            style={[
                              styles.dateBox,
                              { marginHorizontal: 10 },
                              selectedDate.toLocaleDateString() ===
                              today.toLocaleDateString() && {
                                backgroundColor: secondaryColor,
                              },
                            ]}>
                            <View style={styles.textContainer}>
                              <Text
                                style={[
                                  styles.dateText,
                                  { fontFamily: 'EduSABeginner-SemiBold' },
                                ]}>
                                {dateToString(today)}
                              </Text>
                              <Text
                                style={[
                                  styles.dateText,
                                  { fontFamily: 'EduSABeginner-Regular' },
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
                <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
                  <Text
                    style={[
                      styles.heading,
                      { fontFamily: 'EduSABeginner-SemiBold' },
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
                    style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        setLoaderValue(true);
                        openCamera();
                      }}
                      style={{ paddingHorizontal: 10 }}>
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

                  <View style={{ flexDirection: 'row' }}>
                    {loaderValue && (
                      <ActivityIndicator
                        style={{
                          position: 'absolute',
                          top: 0,
                          bottom: 0,
                          left: 20,
                          right: 0,
                        }}
                        size="large"
                      />
                    )}
                    {imageUri ? (
                      <TouchableOpacity
                        onPress={() => {
                          handleSingleImageModal(imageUri);
                        }}>
                        <Image
                          source={{ uri: imageUri }}
                          style={{ width: 70, height: 70, marginLeft: 5 }}
                        />
                      </TouchableOpacity>
                    ):<></>}
                    {multipleImages && (
                      <FlatList
                        data={multipleImages}
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <View style={{paddingHorizontal:5}}>
                            <TouchableOpacity
                              onPress={() => {
                                handleMultiImageModal(item.image_storage_path);
                              }}>
                              <Image
                                source={{
                                  uri: imageBaseUrl + item.image_storage_path,
                                }}
                                style={{
                                  width: 60,
                                  height: 70,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    )}
                  </View>

                  {/* modal appears when image is clicked for preiew */}
                  <Modal visible={modalVisible} animationType="fade">
                    <View style={styles.modalContent}>
                      <Image
                        source={{ uri: multiImageModal }}
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
    color: 'green',
  },
});
