import AsyncStorage from '@react-native-async-storage/async-storage';
import fireStore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {categoryColors, screenNames} from '../Constants/constant';
import Loader from '../Components/Loader';
import toast from 'react-native-simple-toast';
import Moment from 'moment';

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
    setData(datawithColors);
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
      'Confirm Deletion',
      'Are you sure you want to delete this record?',
      [
        {text: 'Cancel', style: 'cancel'},
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
            toast.show('Transaction deleted succesfully', toast.CENTER);
          },
        },
      ],
      {cancelable: false},
    );
    fetchtransaction();
  };

  const capitalize = str => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };

  const timeStampToDate = (dateObj) =>{
    const transactionDate = dateObj.seconds * 1000 + dateObj.nanoseconds / 1000000; 
    // console.log(transactionDate)
    return new Date(transactionDate);
  }

  const handleCategorieswithImage = data => {
    data.map((item, index) => {
      data[index].note = capitalize(item.note);
      data[index].color = categoryColors[index % categoryColors.length];
      data[index].transactionDate = timeStampToDate(item.transactionDate)

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
        data[index].category_name === 'Education' ||
        data[index].category_name === 'education'
      ) {
        data[index].icon_name = 'school';
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
        data[index].category_name === 'fuel' ||
        data[index].category_name === 'Fuel'
      ) {
        data[index].icon_name = 'fuel';
      }
      if (
        data[index].category_name === 'Groceries' ||
        data[index].category_name === 'groceries'
      ) {
        data[index].icon_name = 'shopping-cart';
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

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loader message="Please wait ..." />
        </View>
      ) : (
        <View style={{marginTop: 10}}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={[styles.content]}>
                  <View style={styles.leftContent}>
                    <View
                      style={{
                        width: 70,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Icons size={30} color="#0096FF" name={item.icon_name} />
                      <Text
                        style={{
                          textAlign: 'left',
                          fontSize: 13,
                          fontFamily:"Lato-BlackItalic"
                        }}>
                        {item.category_name}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width:250,
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection:"column",justifyContent:"space-between"}}>
                        <Text style={[styles.text, {maxWidth: 200,fontWeight:700,fontSize:15}]}>
                          {item.note}
                        </Text>
                        <Text style={[styles.text, {maxWidth: 200,fontSize:12,}]}>
                        {Moment(item.transactionDate.toString()).format("ddd, DD MMM YYYY")}.
                        </Text>
                      </View>
                      <View>
                        <Text style={[styles.text, {fontWeight:700}]}>
                          <Text style={styles.rupeeText}>{'\u20B9'}.</Text>{' '}
                          {item.amount}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.iconsContainer}>
                    <View style={{justifyContent:"flex-start"}}> 
                      <Icon
                        size={25}
                        color="#0096FF"
                        name="square-edit-outline"
                        onPress={() => handleUpdate(item)}
                      />
                    </View>
                    <View style={{justifyContent:"flex-end"}}>
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
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'black',
    elevation: 3,
    margin: 5,
    borderColor: '#404FCD',
    height: 100,
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
    fontFamily: 'Lato-Regular',
  },
  rupeeText: {
    fontFamily: 'Lato-Bold',
    color: '#C70039',
  },
  iconsContainer: {
    flexDirection: 'column',

  },
});
