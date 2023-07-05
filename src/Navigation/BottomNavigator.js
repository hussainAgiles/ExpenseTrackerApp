import {Animated, StyleSheet, Text, View} from 'react-native';
import React,{useRef} from 'react';
import {Sizes, screenNames} from '../Constants/constant';
import Home from '../Screens/Home';
import Categories from '../Screens/Categories';
import Transaction from '../Screens/Transaction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {primaryColor} from '../Utils/CustomColors';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {


  // Adding Category


    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    function getWidth() {
        let width = Dimensions.get('window').width;
    
        // Horizontal Padding = 20...
        width = width - 100;
        // Total five Tabs...
        return  width / 3;
      }

  return (
    <Tab.Navigator
      initialRouteName={screenNames.Home}
      screenOptions={() => {
        return {
          tabBarActiveTintColor: primaryColor,
          tabBarLabelStyle: {
            fontSize: Sizes.small,
          },
          tabBarStyle: {
            padding: Sizes.base,
            height: Platform.OS === 'ios' ? 70 : 66,
          },
          headerShown: false,
          tabBarShowLabel: false,
        };
      }}>
      <Tab.Screen name={screenNames.Home} component={Home} options={() => {
            return {
              unmountOnBlur: true,
              tabBarIcon: ({focused}) => {
                return (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 40,
                      marginTop: 17,
                      marginBottom: Platform.OS === 'android' ? 15 : 0,
                    }}>
                    <Icon
                      name="home-outline"
                      size={Sizes.h3}
                      color={
                        focused ?primaryColor : '#000000'
                      }
                    />
                    <Text
                      style={{
                        color: focused
                          ? primaryColor
                          : '#000000',
                        marginTop: 5,
                        fontSize: 12,
                       fontFamily: 'Lato-Regular',
                      }}>
                      Home
                    </Text>
                  </View>
                );
              },
              // tabBarBadge: 3,
            };
          }}
          listeners={() => ({
            // Onpress Update....
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })} />
      <Tab.Screen name={screenNames.Categories} component={Categories} options={() => {
            return {
              unmountOnBlur: true,
              tabBarIcon: ({focused}) => {
                return (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 40,
                      marginTop: 17,
                      marginBottom: Platform.OS === 'android' ? 15 : 0,
                    }}>
                    <Icon
                      name="clipboard-list"
                      size={Sizes.h3}
                      color={
                        focused ?primaryColor : '#000000'
                      }
                    />
                    <Text
                      style={{
                        color: focused
                          ? primaryColor
                          : '#000000',
                        marginTop: 5,
                        fontSize: 12,
                       fontFamily: 'Lato-Regular',
                      }}>
                      Categories
                    </Text>
                  </View>
                );
              },
              // tabBarBadge: 3,
            };
          }}
          listeners={() => ({
            // Onpress Update....
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
          />
      <Tab.Screen name={screenNames.Transaction} component={Transaction} options={() => {
            return {
              unmountOnBlur: true,
              tabBarIcon: ({focused}) => {
                return (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 40,
                      marginTop: 17,
                      marginBottom: Platform.OS === 'android' ? 15 : 0,
                    }}>
                    <Icon
                      name="collapse-all-outline"
                      size={Sizes.h3}
                      color={
                        focused ?primaryColor : '#000000'
                      }
                    />
                    <Text
                      style={{
                        color: focused
                          ? primaryColor
                          : '#000000',
                        marginTop: 5,
                        fontSize: 12,
                       fontFamily: 'Lato-Regular',
                      }}>
                      Transaction
                    </Text>
                  </View>
                );
              },
              // tabBarBadge: 3,
            };
          }}
          listeners={() => ({
            // Onpress Update....
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
