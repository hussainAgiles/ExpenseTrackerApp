import { StyleSheet, TouchableOpacity, View ,FlatList} from 'react-native'
import React,{useEffect,useState} from 'react'
import HistoryCard from '../Components/HistoryCard'
import fireStore from '@react-native-firebase/firestore';
import { categoryColors } from '../Constants/constant';


export default function Transaction() {

const [data,setData] = useState([]);

  useEffect(() => {
    fetchtransaction()
  }, [])

  const fetchtransaction = async () => {
    const collectionRef = fireStore().collection('Transaction');
    const snapshot = await collectionRef.get();
    const fetcheddata = snapshot.docs.map(doc => doc.data());
    const datawithColors = handleCategories(fetcheddata)
    setData(datawithColors)
  };

  const capitalize = str => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };

  const handleCategories = data => {
    console.log("rieved data",data)
    data.map((item, index) => {
      data[index].note = capitalize(item.note);
      data[index].color = categoryColors[index % categoryColors.length];
    });
    return data;
  };
  
  return (
    <View>
     <FlatList
          data={data}
          renderItem={({item}) => (
              <HistoryCard item={item} />
          )}
        />
    </View>
  )
}

const styles = StyleSheet.create({})