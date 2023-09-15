import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../Constants/Colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {create} from 'react-test-renderer';
import Fonts from '../Constants/Fonts';
import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../Constants/constant';

const Profile = () => {
  const navigation = useNavigation();
  //   const packagesDetails = [
  //   {
  //     name: 'Silver Plan',
  //     description: 'Basic package with essential features',
  //     price: 99.99,
  //     features: ['Access to premium content', 'Email support'],
  //     imagePath: require('../Images/Silver.jpg'),
  //   },
  //   {
  //     name: 'Gold Plan',
  //     description: 'Basic package with essential features',
  //     price: 180,
  //     features: ['Access to premium content', 'Email support'],
  //     imagePath: require('../Images/Gold.jpg'),
  //   },
  //   {
  //     name: 'Platinum Plan',
  //     description: 'Basic package with essential features',
  //     price: 300,
  //     features: ['Access to premium content', 'Email support'],
  //     imagePath: require('../Images/Platinum.jpg'),
  //   },
  // ];

  // const renderDummyItem = (name, icon) => {
  //   return (
  //     <View style={styles.planDetailItem}>
  //       <Text style={{color: '#ffffff'}}>{name}</Text>
  //       {icon === 'x' ? (
  //         <Text style={[styles.icon, {color: 'red'}]}>x</Text>
  //       ) : (
  //         <Text style={[styles.icon, {color: 'green'}]}>✓</Text>
  //       )}
  //     </View>
  //   );
  // };

  return (
//     <ScrollView style={{flex: 1, backgroundColor: '#f5f5f5', padding: 15}}>
//       <View style={styles.Container}>
//         <View>
//           <Text style={styles.Usernamestyle}>Welcome, Agile</Text>
//           <Text style={styles.Emailstyle}>This section is all about you</Text>
//         </View>
//         <Icon
//           name="chevron-right"
//           size={30}
//           color={colors.vsaDarkBlue}
//           style={styles.icon}
//         />
//       </View>
//       <View style={styles.Containerwithourflex}>
//         <Text style={styles.Title}>Personal Details</Text>
//         <View style={styles.usernameContainer}>
//           <FontAwesomeIcon name="user" size={24} color="black" />
//           <Text style={styles.username}>Agile Developers</Text>
//         </View>
//         <View style={styles.divider}></View>
//         <View style={styles.usernameContainer}>
//           <FontAwesomeIcon name="envelope" size={24} color="black" />
//           <Text style={styles.username}>developers@agiles.com.au</Text>
//         </View>
//         <View style={styles.divider}></View>
//         <View style={styles.usernameContainer}>
//           <FontAwesomeIcon name="phone" size={24} color="black" />
//           <Text style={styles.username}>1234567890</Text>
//         </View>
//         <View style={styles.divider}></View>
//       </View>

//       <View
//         style={styles.Containerwithourflex}
//         showsVerticalScrollIndicator={false}>
//         <Text style={styles.Title}>Current Subscription</Text>

//         {/* Plan Subscription View */}
//         <View style={styles.planContainer}>
//           <Text style={styles.planTitle}>Silver Plan</Text>
//           <View style={styles.planDetails}>
//             {renderDummyItem('Bloods Gas Calculator', 'check')}
//             {renderDummyItem('Hydration Calculator', 'check')}
//             {renderDummyItem('Toxicity Calculator', 'x')}
//             {renderDummyItem('Blood Transfusion Calculator', 'x')}
//             {renderDummyItem('Sodium correction Calculator', 'x')}
//             {renderDummyItem('CRI', 'x')}
//             {renderDummyItem('DRUGS', 'x')}
//           </View>
//         </View>
//         <TouchableOpacity
//           style={styles.upgradeButton}
//           onPress={() => {
//             navigation.navigate(screenNames.UpgradePlan);
//           }}>
//           <Text style={styles.upgradeButtonText}>Upgrade your plan</Text>
//         </TouchableOpacity>
//       </View>
//       {/* <View style={{justifyContent:"center",alignItems:"center"}}>
// <TouchableOpacity onPress={()=>{
// navigation.navigate(screenNames.Profile)
// }}>
// <Text>Profile Screen</Text>
// </TouchableOpacity>
// </View> */}
//     </ScrollView>

      <WebView source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />

  );
};

export default Profile;

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    marginTop: 5,
  },

  upgradeButton: {
    marginTop: 20,
    backgroundColor: '#87AFBB', // You can change the button's background color
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },

  upgradeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  Usernamestyle: {
    // color: colors.buttonBlack,
    color: colors.buttonBlack,
    fontFamily: Fonts.type.semiBold,
    fontSize: 21,
  },
  Emailstyle: {
    // color: colors.buttonBlack,
    color: colors.buttonBlack,
    fontFamily: Fonts.type.medium,
    fontSize: 14,
  },
  Container: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Containerwithourflex: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'column',
  },
  Title: {
    color: colors.buttonBlack,
    fontFamily: Fonts.type.semiBold,
    fontSize: 17,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  username: {
    marginLeft: 10,
    fontSize: 17,
    fontFamily: Fonts.type.base,
    color: colors.buttonBlack,
  },
  divider: {
    marginTop: 12,
    // Light gray color for the divider
  },
  planContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd', // Light gray color for the divider
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'silver',
    width: 300,
    marginHorizontal: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    textAlign: 'center',
  },
  planDescription: {
    fontSize: 16,
    marginTop: 10,
    color: '#FFFFFF',
  },
  planDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 6,
  },
});
