import AsyncStorage from '@react-native-async-storage/async-storage';
import fireStore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import Moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';
import toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import XLSX from 'xlsx';
import {categoryColors, screenNames} from '../Constants/constant';
import {primaryColor} from '../Utils/CustomColors';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import Lottie from 'lottie-react-native';

const screenWidth = Dimensions.get('window').width - 90;

export default function Transaction() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchtransaction();
    setIsLoading(false);
  }, [data]);

  // Fetch all the transaction
  const fetchtransaction = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const collectionRef = fireStore()
      .collection('Transaction')
      .where('user_id', '==', userId);
    const snapshot = await collectionRef.get();
    const fetcheddata = snapshot.docs.map(doc => doc.data());
    // adding icons to categories
    const datawithColors = handleCategorieswithImage(fetcheddata);
    // console.log("data with colors === ",datawithColors)
    const sortedData = datawithColors.sort((a, b) =>
      a.category_name.localeCompare(b.category_name),
    );
    setData(sortedData);
  };

  const fetchtransactionUpdation = async trnsactionId => {
    const collectionRef = fireStore()
      .collection('Transaction')
      .where('id', '==', trnsactionId);
    const snapshot = await collectionRef.get();
    const fetcheddata = snapshot.docs.map(doc => doc.data());
    setIsLoading(false);
    return fetcheddata[0];
  };

  const deleteTrxn = async transaction => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this record?',
      [
        {
          text: 'Delete',
          onPress: () => {
            var query = fireStore()
              .collection('Transaction')
              .where('id', '==', transaction.id);
            query.get().then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref.delete();
              });
            });
            toast.show('Transaction deleted successfully', toast.CENTER);
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
    fetchtransaction();
  };

  const capitalize = str => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };

  const timeStampToDate = dateObj => {
    const transactionDate =
      dateObj.seconds * 1000 + dateObj.nanoseconds / 1000000;
    // console.log(transactionDate)
    return new Date(transactionDate);
  };

  const handleCategorieswithImage = data => {
    data.map((item, index) => {
      data[index].note = capitalize(item.note);
      data[index].color = categoryColors[index % categoryColors.length];
      data[index].transactionDate = timeStampToDate(item.transactionDate);

      if (
        data[index].category_name === 'Dining' ||
        data[index].category_name === 'dining'
      ) {
        data[index].icon_name = 'local-dining';
      }
      if (
        data[index].category_name === 'Travel' ||
        data[index].category_name === 'travel'
      ) {
        data[index].icon_name = 'directions-bus';
      }
      if (
        data[index].category_name === 'Telephone' ||
        data[index].category_name === 'telephone'
      ) {
        data[index].icon_name = 'phone';
      }
      if (
        data[index].category_name === 'Others' ||
        data[index].category_name === 'others'
      ) {
        data[index].icon_name = 'miscellaneous-services';
      }
      if (
        data[index].category_name === 'Emi' ||
        data[index].category_name === 'emi'
      ) {
        data[index].icon_name = 'calculate';
      }
      if (
        data[index].category_name === 'Fuel' ||
        data[index].category_name === 'fuel'
      ) {
        data[index].icon_name = 'local-gas-station';
      }
      if (
        data[index].category_name === 'Groceries' ||
        data[index].category_name === 'groceries'
      ) {
        data[index].icon_name = 'shopping-cart';
      }
      if (
        data[index].category_name === 'Loans' ||
        data[index].category_name === 'loans'
      ) {
        data[index].icon_name = 'calendar-month';
      }
      if (
        data[index].category_name === 'Health' ||
        data[index].category_name === 'health'
      ) {
        data[index].icon_name = 'health-and-safety';
      }
      if (
        data[index].category_name === 'Shopping' ||
        data[index].category_name === 'shopping'
      ) {
        data[index].icon_name = 'shopping-bag';
      }
      if (
        data[index].category_name === 'House rent' ||
        data[index].category_name === 'house rent'
      ) {
        data[index].icon_name = 'add-home';
      }
      if (
        data[index].category_name === 'Office ' ||
        data[index].category_name === 'office '
      ) {
        data[index].icon_name = 'business';
      }
      if (
        data[index].category_name === 'Gadgets' ||
        data[index].category_name === 'gadgets'
      ) {
        data[index].icon_name = 'gamepad';
      }
      if (
        data[index].category_name === 'Bills' ||
        data[index].category_name === 'bills'
      ) {
        data[index].icon_name = 'margin';
      }
      if (
        data[index].category_name === 'Entertainment ' ||
        data[index].category_name === 'entertainment '
      ) {
        data[index].icon_name = 'emergency-recording';
      }
      if (
        data[index].category_name === 'Education ' ||
        data[index].category_name === 'education '
      ) {
        data[index].icon_name = 'school';
      }
    });
    return data;
  };

  const handleUpdate = async item => {
    const transactionId = item.id;
    const payloadToSend = await fetchtransactionUpdation(transactionId);
    navigation.navigate(screenNames.AddTransactions, {
      showFutureDates: false,
      payload: payloadToSend,
    });
  };

  const handleClick = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const collectionRef = fireStore()
        .collection('Transaction')
        .where('user_id', '==', userId)
        .where('transactionDate', '>=', startDate)
        .where('transactionDate', '<=', endDate);
      const snapshot = await collectionRef.get();
      const fetcheddata = snapshot.docs.map(doc => doc.data());
      const data = fetcheddata.map(item => [
        item.amount,
        item.category_name,
        item.note,
        timeStampToDate(item.transactionDate).toLocaleString(), // Convert the date to a readable format
      ]);

      // console.log("data === ",data)

      const headers = ['Amount', 'Category', 'Description', 'Transaction Date'];
      const excelData = [headers, ...data];

      // console.log("excelData === ",excelData)

      // Create a new workbook
      const workBook = XLSX.utils.book_new();

      // Add a worksheet to the workbook
      const workSheet = XLSX.utils.aoa_to_sheet(excelData);
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');

      // Generate the Excel file as a binary string
      const excelFileBinary = XLSX.write(workBook, {
        type: 'binary',
        bookType: 'xlsx',
      });

      // Prepare the file path to save the Excel file
      const filePath = `${RNFS.ExternalDirectoryPath}/Transaction.xlsx`;
      console.log('fielpath ====', filePath);

      // Write the Excel file to the device's storage
      await RNFS.writeFile(filePath, excelFileBinary, 'ascii');

      // Show a message to the user indicating successful export
      toast.show('Excel file exported successfully!', toast.CENTER);

      // You can also open the file using the 'filePath' variable if needed
      // RNFS.readFile(filePath, 'base64').then(fileData => console.log(fileData));
    } catch (error) {
      // Handle errors if any
      console.log('Error', error);
      // toast.show('Excel file could not be exported!',error);
    }
  };

  const [open, setOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  // const [date, setDate] = useState(new Date())

  const [startDate, setStartDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [text, setText] = useState('Empty');

  const [endDate, setEndDate] = useState(new Date());

  const [showPicker, setShowPicker] = useState(false);

  const handleEndDate = inDate => {
    // console.log('indate ====', inDate);
    const currentDate = inDate || new Date();
    setShowDatePicker(false);
    setEndDate(currentDate);
  };

  return (
    <>
      {data?.length > 0 ? (
        <View style={{marginBottom: '27%', backgroundColor: '#fff'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 0.5,
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingVertical: 15,
                paddingHorizontal: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontFamily: 'EduSABeginner-SemiBold', fontSize: 16}}>
                  Start Date :{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setOpen(true), setShowDatePicker(true);
                  }}
                  style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'EduSABeginner-Medium',
                      fontSize: 16,
                      borderWidth: 0.5,
                      padding: 6,
                    }}>
                    {Moment(startDate).format('DD-MMM-YYYY')}
                  </Text>

                  <FontAwesome
                    name="calendar"
                    size={25}
                    color={primaryColor}
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
                {showDatePicker && (
                  <DatePicker
                    modal
                    mode="date"
                    title="Start Date"
                    open={open}
                    date={startDate}
                    onConfirm={date => {
                      setOpen(false);
                      setStartDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                    theme="auto"
                  />
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                }}>
                <Text
                  style={{fontFamily: 'EduSABeginner-SemiBold', fontSize: 16}}>
                  End Date : {'   '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setEndDateOpen(true);
                    setShowDatePicker(true);
                  }}
                  style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'EduSABeginner-Medium',
                      fontSize: 16,
                      borderWidth: 0.5,
                      padding: 6,
                    }}>
                    {Moment(endDate).format('DD-MMM YYYY')}
                  </Text>

                  <FontAwesome
                    name="calendar"
                    size={25}
                    color={primaryColor}
                    style={{marginLeft: 10}}
                  />
                </TouchableOpacity>
                {showDatePicker && (
                  <DatePicker
                    modal
                    mode="date"
                    title="End Date"
                    open={endDateOpen}
                    date={endDate}
                    onConfirm={date => {
                      setEndDateOpen(false);
                      setEndDate(date);
                    }}
                    onCancel={() => {
                      setEndDateOpen(false);
                    }}
                    theme="auto"
                  />
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '30%',
                // backgroundColor: '#78909C',
                padding: 8,
                height: 40,
                alignItems: 'center',
                position: 'absolute',
                justifyContent: 'space-evenly',
                right: 0,
                top: 40,
              }}>
              <TouchableOpacity
                onPress={() => handleClick()}
                style={{flexDirection: 'row', alignItems: 'center'}}
                onFocus={() => {
                  backgroundColor: '#80CBC4';
                }}
                onBlur={() => {
                  backgroundColor: '#DCEDC8';
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 18,
                    fontFamily: 'EduSABeginner-SemiBold',
                    textDecorationStyle: 'solid',
                  }}>
                  Export
                </Text>
                <Icon name="file-excel" size={25} color={primaryColor} />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={[styles.content]}>
                  {/* Category Image and name */}
                  <View
                    style={{
                      width: '20%',
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}>
                    <Icons size={30} color="#0096FF" name={item.icon_name} />
                    <Text
                      style={{
                        textAlign: 'left',
                        fontSize: 14,
                        fontFamily: 'EduSABeginner-SemiBold',
                      }}>
                      {item.category_name}
                    </Text>
                  </View>
                  {/* description and date */}
                  <View
                    style={{
                      width: 250,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={[
                          styles.text,
                          {
                            maxWidth: 200,
                            fontFamily: 'EduSABeginner-SemiBold',
                            fontSize: 17,
                          },
                        ]}>
                        {item.note}
                      </Text>
                      <Text
                        style={[
                          styles.text,
                          {
                            maxWidth: 200,
                            fontSize: 15,
                            paddingTop: 5,
                            fontFamily: 'EduSABeginner-Regular',
                          },
                        ]}>
                        {Moment(item.transactionDate.toString()).format('ddd')},
                        <Text
                          style={{
                            fontFamily: 'EduSABeginner-SemiBold',
                            fontSize: 12,
                          }}>
                          {' '}
                          {Moment(item.transactionDate.toString()).format(
                            'DD MMM YYYY',
                          )}
                        </Text>
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.text,
                          {fontFamily: 'EduSABeginner-Bold', fontSize: 17},
                        ]}>
                        <Text style={styles.rupeeText}>{'\u20B9'}</Text>{' '}
                        {item.amount}
                      </Text>
                    </View>
                  </View>
                  {/* Edit and Delete */}
                  <View style={styles.iconsContainer}>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        marginBottom: 15,
                      }}>
                      <Icon
                        size={25}
                        color="#0096FF"
                        name="square-edit-outline"
                        onPress={() => handleUpdate(item)}
                      />
                    </View>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        marginTop: 15,
                      }}>
                      <Icon
                        size={25}
                        color="#D11A2A"
                        name="delete"
                        onPress={() => deleteTrxn(item)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Lottie
            source={require('../../assets/Animation/no_data.json')}
            autoPlay
            loop
            style={{width: 300, height: 300}}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    borderBottomWidth: 0.5,
    backgroundColor: '#fff',
    // shadowOffset: {width: 1, height: 1},
    // shadowOpacity: 0.5,
    borderColor: '#616161',
    height: 90,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  leftContent: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightContent: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontFamily: 'EduSABeginner-Medium',
  },
  rupeeText: {
    fontFamily: 'EduSABeginner-Bold',
    color: '#C70039',
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
