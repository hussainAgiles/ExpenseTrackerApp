import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {fetchTransactionHistory} from '../Helpers/helpers';
import {primaryColor} from '../Utils/CustomColors';

const Details = ({route}) => {
  console.log(route.params);
  const navigation = useNavigation();
  const [pieDetails, setPieDetails] = useState(null);

  useEffect(() => {
    fetchRecentTrxn();
  }, []);

  const fetchRecentTrxn = async () => {
    const fetcheddata = await fetchTransactionHistory();
    // console.log('details about pie === ',fetcheddata)
    const filteredData = fetcheddata.filter(
      item => item.categories_datails.longname === route.params.Details.text,
    );
    // console.log('details about pie === ', filteredData);
    setPieDetails(filteredData);
  };


  const renderData = ({item}) => {
    return (
      <View style={{flexDirection: 'row',
          justifyContent: 'space-between',paddingBottom:'5%',width:'70%'}}>
          <Text style={{fontFamily:'EduSABeginner-Regular',fontSize:17}}>{item.transactions_description}</Text>
          <Text style={{fontFamily:'EduSABeginner-Regular',fontSize:17}}>{'\u20B9'}
          {item.amount}</Text>
        </View>
    );
  };

  return (
    <View style={{flex: 1, flexDirection: 'column',backgroundColor:'#fff'}}>
      <View  style={{flex: 1.5,backgroundColor:'#fff'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{alignItems: 'flex-start', padding: 15}}>
          <Icon name="arrow-back" size={25} color="#03707a" />
        </TouchableOpacity>
        <Image
          source={require('../Images/exp_2.jpg')}
          style={{
            height:350,
            width: '100%',
            resizeMode:'cover',
          }}
          ></Image>
      </View>
      <View
        style={{
          flex: 1,
          paddingTop: '20%',
          alignItems: 'center',
          borderColor: '#000000',
          backgroundColor: '#E0F2F1',
          paddingHorizontal: 20,
          
        }}>
        <View style={{flexDirection: 'row',
          justifyContent: 'space-between',
          width: '70%',paddingBottom:'5%'}}>
          <Text style={{fontFamily:'EduSABeginner-SemiBold',fontSize:18}}>Description</Text>
          <Text style={{fontFamily:'EduSABeginner-SemiBold',fontSize:18}}>Amount</Text>
        </View>
        <FlatList data={pieDetails} renderItem={renderData} />
      </View>
     
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  headingText: {
    color: '#fff',
    marginTop: 4,
    marginBottom: 0,
    fontSize: 25,
    fontFamily: 'EduSABeginner-Bold',
    textAlign: 'center',
    paddingBottom: '10%',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'EduSABeginner-Regular',
    textAlign: 'center',
  },
});
