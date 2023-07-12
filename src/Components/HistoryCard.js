import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {textColor} from '../Utils/CustomColors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HistoryCard = ({item,deleteTransaction}) => {
  // console.log("History transactions === ",deleteTransaction)

  return (
    <View style={styles.card}>
      <View style={[styles.content]}>
        <View style>
          <View style={[styles.color]} />
          {/* <Text style={styles.text}>{item.transactionDate}</Text> */}
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.text}>{item.note}</Text>
          <Text style={styles.text}>{item.amount}</Text>
        </View>
        <View style={styles.iconsContainer}>
        {/* <Icon
          size={25}
          color="#0096FF"
          name="square-edit-outline"
          onPress={() => handleUpdate(item)}
        /> */}
        <Icon
          size={25}
          color="#D11A2A"
          name="delete"
          onPress={() => deleteTransaction(item)}
        />
      </View>
      </View>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    // borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowColor: 'black',
    // elevation: 3,
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
  },
});
