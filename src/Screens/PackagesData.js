import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const PackagesData = () => {
  const width = Dimensions.get('screen').width;
  const scrollX = useRef(new Animated.Value(0)).current;
  const [maxSlider] = useState(3);
  const packagesDetails = [
    {
      name: 'Silver Plan',
      description: 'Basic package with essential features',
      price: 99.99,
      imagePath: require('../Images/Silver.png'),
    },
    {
      name: 'Gold Plan',
      description: 'Basic package with essential features',
      price: 180,
      imagePath: require('../Images/Gold.png'),
    },
    {
      name: 'Platinum Plan',
      description: 'Basic package with essential features',
      price: 300,
      imagePath: require('../Images/Platinumss.png'),
    },
  ];

  const renderDummyItem = (name, icon) => {
    return (
      <View style={styles.planDetailItem}>
        {icon === 'x' ? (
          <Text style={[styles.icon, {color: colors.lightGrayBlack}]}>x</Text>
        ) : (
          <Text style={[styles.icon, {color: 'green'}]}>✓</Text>
        )}
        {icon === 'x' ? (
          <Text style={{color: colors.lightGrayBlack,marginTop: 5,}}>{name}</Text>
        ) : (
          <Text style={{color: '#ffffff',marginTop: 5,}}>{name}</Text>
        )}
      </View>
    );
  };

  const renderItem = ({item, index}) => (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 10,
        marginHorizontal:10
      }}>
      <TouchableOpacity
        style={styles.planContainer}
        key={index}
        onPress={() => {
          console.log('hello');
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={item.imagePath}
            style={{
              height: 200,
              width: 300,
              resizeMode: 'cover',
            }}
          />
        </View>
        <Text style={[styles.planTitle, {marginTop: 15}]}>{item.name}</Text>
        <Text style={[styles.priceText, {marginTop: 10, elevation: 5}]}>
          ${item.price}
          <Text style={{fontSize: 16, color: '#FFFFFF', textAlign: 'center'}}>
            /month
          </Text>
        </Text>
        <View style={[styles.planDetails, {marginTop: 10}]}>
          {renderDummyItem('Bloods Gas Calculator', 'check')}
          {renderDummyItem('Hydration Calculator', 'check')}
          {renderDummyItem('Toxicity Calculator', 'x')}
          {renderDummyItem('Blood Transfusion Calculator', 'x')}
          {renderDummyItem('Sodium correction Calculator', 'x')}
          {renderDummyItem('CRI', 'x')}
          {renderDummyItem('DRUGS', 'x')}
          {/* <View style={styles.planDetailItem}>
            <Text style={{color: '#fff'}}>Price </Text>
            <Text style={{color: '#000'}}>{item.price}</Text>
          </View> */}
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flexDirection: 'column',alignItems:"center",justifyContent:"center",padding:30
    }}>
      <FlatList
        data={packagesDetails}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
      <View
        style={{
          width: width,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {packagesDetails.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [5, 10, 5],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.1, 1, 0.1],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[styles.dot, {width: dotWidth, opacity}]}
              key={i.toString()}
            />
          );
        })}
      </View>
      <View style={{ backgroundColor: '#87AFBB',padding: 10,borderRadius: 5,width:'95%',marginTop:20}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(screenNames.UpgradePlan);
          }}>
          <Text style={styles.upgradeButtonText}>Upgrade your plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PackagesData;

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    marginTop: 5,
  },

  upgradeButton: {
    marginTop: 10,
    backgroundColor: '#87AFBB', // You can change the button's background color
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
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
    borderWidth: 1,
    borderColor: '#ddd', // Light gray color for the divider
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'silver',
    width: 300,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  planDescription: {
    fontSize: 16,
    marginTop: 10,
    color: '#FFFFFF',
  },
  planDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 6,
  },
  dot: {
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.vsaLightBlue,
    marginHorizontal: 4,
    marginTop:8
  },
  priceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
