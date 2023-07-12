import { StyleSheet, TouchableOpacity, View ,FlatList,Text} from 'react-native'
import React,{useEffect,useState} from 'react'
import HistoryCard from '../Components/HistoryCard'
import fireStore from '@react-native-firebase/firestore';
import { categoryColors, screenNames } from '../Constants/constant';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Transaction() {

const [data,setData] = useState([]);
const navigation = useNavigation()
  useEffect(() => {
    fetchtransaction()
  }, [])

  const fetchtransaction = async () => {
    const userId =await AsyncStorage.getItem('userId')
    // console.log("Fetched Async userId",userId)
    const collectionRef = fireStore().collection('Transaction').where('user_id','==',userId);
    const snapshot = await collectionRef.get();
    const fetcheddata = snapshot.docs.map(doc => doc.data());
    const datawithColors = handleCategories(fetcheddata)
    setData(datawithColors)
  };

  const fetchtransactionUpdation = async (trnsactionId) => {
    const collectionRef = fireStore().collection('Transaction').where('id','==',trnsactionId);
    const snapshot = await collectionRef.get();
    const fetcheddata = snapshot.docs.map(doc => doc.data());
    console.log("Updating data",fetcheddata)
    
    // const datawithColors = handleCategories(fetcheddata)
    // setData(datawithColors)
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

  const handleCategories = data => {
    // console.log("rieved data",data)
    data.map((item, index) => {
      data[index].note = capitalize(item.note);
      data[index].color = categoryColors[index % categoryColors.length];
    });
    return data;
  };


  const handleUpdate = (item) =>{
    const transactionId = item.id
    fetchtransactionUpdation(transactionId)
  }
  
  return (
    <View style={{marginTop:15}}>
     <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.card}>
            <View style={[styles.content]}>
              <View style>
                <View style={[styles.color]} />
                {/* <Text style={styles.text}>{item.transactionDate}</Text> */}
              </View>
              <View style={styles.rightContent}>
                <Text style={styles.text}>{item.note}</Text>
                <Text style={styles.text}>{'\u20B9'}. {item.amount}</Text>
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
  )
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
    margin:10,
    borderColor:'#404FCD'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
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
  },
  iconsContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})