import React from 'react';
import {Modal, StyleSheet, Text, View, TextInput,TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import {deviceWidth} from '../Utils/Dimension'; 
import {primaryColor, textColor} from '../Utils/CustomColors';

const CategoryModal = ({
  payload,
  isUpdate,
  handleSave,
  handleChange,
  handleModalVisibility,
}) => {
  // console.log("payload === ",payload)
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {isUpdate ? (
              <Text style={styles.header}>UPDATE CATEGORY</Text>
            ) : (
              <Text style={styles.header}>ADD CATEGORY</Text>
            )}
            <View style={{padding: 20}}>
              <TextInput
                style={styles.input}
                value={payload.shortname}
                placeholder="Title"
                placeholderTextColor="grey"
                onChangeText={text => handleChange('shortname', text)}
              />
              <TextInput
                style={styles.input}
                value={payload.longname}
                placeholder="Description"
                placeholderTextColor="grey"
                onChangeText={text => handleChange('longname', text)}
              />
            </View>
            <View style={{flexDirection: 'row',justifyContent:"center",alignItems:"center"}}>
              <TouchableOpacity
                style={[styles.button, {borderBottomLeftRadius: 20,backgroundColor:primaryColor,paddingVertical:15}]}
                onPress={handleSave}>
               <Text style={{color:'#fff',textAlign:"center"}}>Save</Text> 
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {borderBottomRightRadius: 20,backgroundColor:primaryColor,paddingVertical:15}]}
                onPress={() => handleModalVisibility(false)}>
               <Text style={{color:'#fff',textAlign:"center"}}>Cancel</Text> 
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginTop: 20,
    color: textColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    marginVertical: 10,
    color: textColor,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 10,
    width: deviceWidth / 1.5,
  },
  button: {
    width: '50%',
    padding: 5,
    borderRadius: 0,
  },
});

export default CategoryModal;
