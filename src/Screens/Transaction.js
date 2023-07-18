import {
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HistoryCard from '../Components/HistoryCard';
import fireStore from '@react-native-firebase/firestore';
import {categoryColors, screenNames} from '../Constants/constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Images from '../Constants/Images';

export default function Transaction() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchtransaction();
  }, []);

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
    // const dataTotalExpense = calculateTotalExpense(datawithColors)
    setData(datawithColors);
  };

  const calculateTotalExpense = categories => {
    // console.log("Calculating === ",categories)
    let total = 0;
    categories.map((item, index) => {
        total = total + Number(item.amount);
    }); 
    const totalExpense = total;
    console.log("Total amount spent",totalExpense)
    return categories;
  };

  const fetchtransactionUpdation = async trnsactionId => {
    const collectionRef = fireStore()
      .collection('Transaction')
      .where('id', '==', trnsactionId);
    const snapshot = await collectionRef.get();
    const fetcheddata = snapshot.docs.map(doc => doc.data());
    // console.log('Updating data', fetcheddata[0]);
    return fetcheddata[0];
  };

  const deleteTrxn = async transaction => {
    // console.log('Delete category', category);
    var query = fireStore()
      .collection('Transaction')
      .where('id', '==', transaction.id);
    query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
    fetchtransaction();
  };

  const capitalize = str => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };

  const handleCategorieswithImage = data => {
    // console.log("rieved data",data)
    data.map((item, index) => {
      data[index].note = capitalize(item.note);
      data[index].color = categoryColors[index % categoryColors.length];

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
        data[index].icon_name = 'flight-takeoff';
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
    });
    return data;
  };

  const handleUpdate = async item => {
    const transactionId = item.id;
    const payloadToSend = await fetchtransactionUpdation(transactionId);
    // console.log("payloaddddd = ", payloadToSend)
    navigation.navigate(screenNames.AddTransactions, {
      showFutureDates: false,
      payload: payloadToSend,
    });
  };

  return (
    <View style={{marginTop: 15}}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={[styles.content]}>
              <View style={styles.rightContent}>
                <View
                  style={{
                    width: 70,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <Image source={item.image} resizeMode='contain'/> */}
                  <Icons size={30} color="#0096FF" name={item.icon_name} />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                    }}>
                    {item.category_name}
                  </Text>
                </View>
                <Text style={styles.text}>{item.note}</Text>
                <Text style={styles.text}>
                  {'\u20B9'}. {item.amount}
                </Text>
              </View>
              <View style={styles.iconsContainer}>
                <Icon
                  size={25}
                  color="#0096FF"
                  name="square-edit-outline"
                  onPress={() => handleUpdate(item)}
                />
                <Icon
                  size={25}
                  color="#D11A2A"
                  name="delete"
                  onPress={() => deleteTrxn(item)}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
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
    height: 80,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  color: {
    marginRight: 10,
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
  },
  text: {
    color: '#000000',
    textAlign: 'left',
  },
  iconsContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:"space-evenly"
  },
});
