import React, {useEffect, useId, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TextInput,Alert} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryModal from '../Components/CategoryModal';
import Loader from '../Components/Loader';
import {deviceWidth} from '../Utils/Dimension';
import {primaryColor, textColor} from '../Utils/CustomColors';
import {Sizes, categoryColors, globalStyle} from '../Constants/constant';
import fireStore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { handleCategories} from '../Utils/TransactionUpdates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toast from 'react-native-simple-toast';

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);


  const uId = uuid.v4();

  const addCategory = async (value) => {
    const response = await fireStore()
      .collection('Category')
      .add({id: uId, ...value});
      fetch();
    
  };

  const fetch = async () => {
    const collectionRef = fireStore().collection('Category');
    const snapshot = await collectionRef.get();
    const fetcheddata = snapshot.docs.map(doc => doc.data());
    const sortedData = fetcheddata.sort((a, b) => a.title.localeCompare(b.title));
    const finalCat = handleCategories(sortedData);
    setCategories(finalCat);
    await AsyncStorage.setItem('categoriesList',JSON.stringify(finalCat))
    setIsLoading(false)
  };

  let initialState = {
    title: '',
    description: '',
  };

  const [errMsg, setErrMsg] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);

  // Handle Search
  const handleSearch = text => {
      if(text.length === 0 || text === '' ){
        setCategories(categories)
      }else{
        const searchedData =  categories.filter(
          item => item.title.toLowerCase().indexOf(text.toLowerCase()) !== -1,)
        setCategories(searchedData)
      }   
  };

  // handle textinput changes
  const handleChange = (key, value) => {
    setPayload({...payload, [key]: value});
  };

  const handleModalVisibility = flag => {
    setPayload(initialState);
    setModalVisible(flag);
  };

  // handling add and update category
  const handleSubmit = async () => {
    setModalVisible(false);
    setIsLoading(true);
    if (payload.title.trim() === '') {
      setErrMsg('Fill the title.');
      setIsLoading(false);
      return;
    }

    let isSuccessful;
    if (isUpdate) {
      isSuccessful = await updateCategory(payload);
      setIsUpdate(false);
    } else {
      isSuccessful = await addCategory(payload);
    }
    setIsLoading(false);
  };

  const handleDelete = async item => {
    setIsLoading(true);
    const isDeleted = await deleteCategory(item);
    setIsLoading(false);
  };

  const deleteCategory = async category => {
    // console.log('Delete category', category);
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this Category?',
      [
        {
          text: 'Delete',
          onPress: () => {
            var query = fireStore()
            .collection('Category')
            .where('id', '==', category.id);
          query.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
            });
          });
            toast.show('Categories deleted succesfully', toast.CENTER);
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: false},
    );
    fetch();
  };

  const updateCategory = async(category)=> {
    var query = fireStore()
      .collection('Category')
      .where('id', '==', category.id);
    query.get().then(snapshot => {
      const batch = fireStore().batch();
      snapshot.forEach(doc => {
        batch.update(doc.ref, category);
      });
      return batch.commit();
    });
  await fetch();
  };

  const handleUpdate = item => {
    // console.log('handle update', item);
    setIsUpdate(true);
    setPayload(item);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setIsUpdate(false);
    setPayload(initialState);
    setModalVisible(true);
  };

  useEffect(() => {
    setIsLoading(true)
    fetch();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View
        style={{
          flex: 3,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={[styles.color, {backgroundColor: item.color}]} />
        <Text style={{color: textColor, fontSize: 15,fontFamily:'Dosis-Regular'}}>{item.title}</Text>
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
          onPress={() => handleDelete(item)}
        />
      </View>
    </View>
  );

  return (
    <>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loader message="Please wait ..." />
        </View>
      ) : (
        <>
          {modalVisible ? (
            <CategoryModal
              payload={payload}
              isUpdate={isUpdate}
              handleSave={handleSubmit}
              handleChange={handleChange}
              handleModalVisibility={handleModalVisibility}
            />
          ) : (
            <View style={{flex:1}}>
              <View style={styles.header}>
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  placeholderTextColor="grey"
                  onChangeText={text => handleSearch(text)}
                />
                <View  style={{
                      width: Sizes.h1 *2,
                      backgroundColor: primaryColor,
                      borderRadius:30,
                      height: Sizes.h1 *2,
                      justifyContent:"center",
                      alignItems:"center"
                    }}>
                  <TouchableOpacity onPress={handleAdd}>
                    <Text style={{fontSize:35,color:"#FFFFFF"}}>+</Text>
                  </TouchableOpacity>
                </View>

                {/* <Button
                  color={primaryColor}
                  mode="contained"
                  style={{alignSelf: 'center'}}
                  onPress={handleAdd}>
                  Add
                </Button> */}
              </View>
              {errMsg.trim().length !== 0 && (
                <Text style={globalStyle.error} onPress={() => setErrMsg('')}>
                  {errMsg}
                </Text>
              )}
              <FlatList  
                data={categories}
                keyExtractor={item => item.id}
                renderItem={renderItem}
              />  
            </View>
          )}
        </>
      )}
    </>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  input: {
    color: textColor,
    borderBottomWidth: 1,
    width: deviceWidth / 1.4,
    borderBottomColor: '#D3D3D3',
    fontSize: 17,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical:5,
    marginHorizontal:15,
    borderBottomWidth:0.5,
    padding:5
  },
  color: {
    marginRight: 10,
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
  },
  iconsContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
