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

import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import RNFS from 'react-native-fs';
import toast from 'react-native-simple-toast';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import XLSX from 'xlsx';
import Loader from '../Components/Loader';
import {screenNames} from '../Constants/constant';
import {
  UpdateTransaction,
  downloadExcelSheet,
  fetchTransactionHistory,
  handleDelete,
} from '../Helpers/helpers';
import {primaryColor} from '../Utils/CustomColors';
import TransactionSkeleton from '../Skeleton/TransactionSkeleton';

const screenWidth = Dimensions.get('window').width - 90;

export default function Transaction() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    fetchtransaction();
  }, []);

  // Fetch all the transaction
  const fetchtransaction = async () => {
    const response = await fetchTransactionHistory();
    setData(response);
    setIsLoading(false);
  };

  // Deleting transaction
  const deleteTrxn = async transaction => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this record?',
      [
        {
          text: 'Ok',
          onPress: async () => {
            const response = await handleDelete(transaction.id);
            if (response.request.status === 200) {
              toast.show(response.data.message, toast.CENTER);
              fetchtransaction();
            } else {
              toast.show(response.data.message, toast.LONG);
            }
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  const handleUpdate = async item => {
    const payloadToSend = await UpdateTransaction(item.slug);
    // console.log('Payload to send ===== ', payloadToSend);
    navigation.navigate(screenNames.AddTransactions, {
      showFutureDates: false,
      payload: payloadToSend,
    });
  };

  // handling download Excel Sheet
  const handleClick = async () => {
    toast.show('Downloading....', toast.CENTER);
    try {
      let request = {
        start_Date: moment(startDate).format('YYYY-MM-DD'),
        end_Date: moment(endDate).format('YYYY-MM-DD'),
      };
      const response = await downloadExcelSheet(request);
      // console.log("respone ==== ",response)

      const data = response.map(item => [
        item.amount,
        item.longname,
        item.transactions_description,
        item.transaction_date,
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
      toast.show('Downloaded successfully!', toast.CENTER);

      // You can also open the file using the 'filePath' variable if needed
      // RNFS.readFile(filePath, 'base64').then(fileData => console.log(fileData));
    } catch (error) {
      // Handle errors if any
      // console.log('Error', error);
      toast.show('Download failed, please try again', error);
    }
  };

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TransactionSkeleton />
        </View>
      ) : (
        <View style={{flex:1,backgroundColor: '#fff'}}>
          {data.length === 0 ? (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text
              style={{
                textAlign: 'center',
                margin: 20,
                fontSize: 18,
                fontFamily: 'EduSABeginner-Bold',
              }}>
              No data available.
            </Text>
            </View>
          ) : (
            <>
              {/* Download Excel Sheet */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 0.5,
                }}>
                <View style={styles.dateContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'EduSABeginner-SemiBold',
                        fontSize: 16,
                      }}>
                      Start Date :{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setOpen(true), setShowDatePicker(true);
                      }}
                      style={{flexDirection: 'row'}}>
                      <Text style={styles.dateText}>
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
                      style={{
                        fontFamily: 'EduSABeginner-SemiBold',
                        fontSize: 16,
                      }}>
                      End Date : {'   '}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setEndDateOpen(true);
                        setShowDatePicker(true);
                      }}
                      style={{flexDirection: 'row'}}>
                      <Text style={styles.dateText}>
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
                <View style={styles.exportView}>
                  <TouchableOpacity
                    onPress={() => handleClick()}
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onFocus={() => {
                      backgroundColor: '#80CBC4';
                    }}
                    onBlur={() => {
                      backgroundColor: '#DCEDC8';
                    }}>
                    <Text style={styles.exportText}>Export</Text>
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
                        <Icons
                          size={30}
                          color={primaryColor}
                          name={item.categories_datails.icon_name}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'EduSABeginner-SemiBold',
                          }}>
                          {item.categories_datails.shortname}
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
                            {item.transactions_description}
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
                            {Moment(item.transaction_date).format('ddd')},
                            <Text
                              style={{
                                fontFamily: 'EduSABeginner-SemiBold',
                                fontSize: 12,
                              }}>
                              {' '}
                              {Moment(item.transaction_date).format(
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
                            color={primaryColor}
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
            </>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  dateText: {
    fontFamily: 'EduSABeginner-Medium',
    fontSize: 16,
    borderWidth: 0.5,
    padding: 6,
  },
  exportView: {
    flexDirection: 'row',
    width: '30%',
    padding: 8,
    height: 40,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'space-evenly',
    right: 0,
    top: 40,
  },
  card: {
    marginHorizontal: 8,
    borderBottomWidth: 0.5,
    backgroundColor: '#fff',
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
  exportText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    fontFamily: 'EduSABeginner-SemiBold',
    textDecorationStyle: 'solid',
  },
});
