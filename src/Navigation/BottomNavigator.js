import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import React,{useRef} from 'react';
import {Sizes, screenNames} from '../Constants/constant';
import Home from '../Screens/Home';
import Categories from '../Screens/Categories';
import Transaction from '../Screens/Transaction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {primaryColor} from '../Utils/CustomColors';
import SignOut from '../Screens/SignOut';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {

    const tabOffsetValue = useRef(new Animated.Value(0)).current;

    function getWidth() {
        let width = Dimensions.get('window').width;
    
        // Horizontal Padding = 20...
        width = width - 120;
        // Total five Tabs...
        return  width / 4;
      }

  return (
    <>
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
          unmountOnBlur:true
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
                        focused ?primaryColor : '#757575'
                      }
                    />
                    <Text
                      style={{
                        color: focused
                          ? primaryColor
                          : '#000000',
                        marginTop: 5,
                        fontSize: 15,
                        fontFamily:'EduSABeginner-SemiBold'
                      }}>
                      Home
                    </Text>
                  </View>
                );
              },
              // tabBarBadge: 3,
            };
          }}
          // listeners={() => ({
          //   // Onpress Update....
          //   tabPress: () => {
          //     Animated.spring(tabOffsetValue, {
          //       toValue: 0,
          //       useNativeDriver: true,
          //     }).start();
          //   },
          // })}
           />
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
                        focused ?primaryColor : '#757575'
                      }
                    />
                    <Text
                      style={{
                        color: focused
                          ? primaryColor
                          : '#000000',
                        marginTop: 5,
                        fontSize: 15,
                        fontFamily:'EduSABeginner-SemiBold'
                      }}>
                      Categories
                    </Text>
                  </View>
                );
              },
              // tabBarBadge: 3,
            };
          }}
          // listeners={() => ({
          //   // Onpress Update....
          //   tabPress: () => {
          //     Animated.spring(tabOffsetValue, {
          //       toValue: getWidth() * 1.4,
          //       useNativeDriver: true,
          //     }).start();
          //   },
          // })}
          />
      <Tab.Screen name={screenNames.Transaction} component={Transaction} options={() => {
            return {
              unmountOnBlur: true,
              headerShown:true,
              headerTitleAlign:"center",
              headerTitleStyle:{fontFamily:"EduSABeginner-SemiBold"},
              headerStyle:{borderBottomWidth:1},
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
                        focused ?primaryColor : '#757575'
                      }
                    />
                    <Text
                      style={{
                        color: focused
                          ? primaryColor
                          : '#000000',
                        marginTop: 5,
                        fontSize: 15,
                        fontFamily:'EduSABeginner-SemiBold'
                      }}>
                      Transaction
                    </Text>
                  </View>
                );
              },
              // tabBarBadge: 3,
            };
          }}
          // listeners={() => ({
          //   // Onpress Update....
          //   tabPress: () => {
          //     Animated.spring(tabOffsetValue, {
          //       toValue: getWidth() * 2.8,
          //       useNativeDriver: true,
          //     }).start();
          //   },
          // })}
          />
      <Tab.Screen name={screenNames.Logout} component={SignOut} options={() => {
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
                      name="logout"
                      size={Sizes.h3}
                      color={
                        focused ?primaryColor : '#757575'
                      }
                    />
                    <Text
                      style={{
                        color: focused
                          ? primaryColor
                          : '#000000',
                        marginTop: 5,
                        fontSize: 15,
                        fontFamily:'EduSABeginner-SemiBold'
                      }}>
                      Sign Out
                    </Text>
                  </View>
                );
              },
              // tabBarBadge: 3,
            };
          }}
          // listeners={() => ({
          //   // Onpress Update....
          //   tabPress: () => {
          //     Animated.spring(tabOffsetValue, {
          //       toValue: getWidth() * 4.3,
          //       useNativeDriver: true,
          //     }).start();
          //   },
          // })}
          />
    </Tab.Navigator>
    {/* <Animated.View style={{
                width: getWidth() - 20,
                height: 2,
                backgroundColor:primaryColor,
                position: 'absolute',
                bottom: 57,
                // Horizontal Padding = 20...
                left: 25,
                borderRadius: 20,
                transform: [
                    { translateX: tabOffsetValue }
                ]
            }}>

            </Animated.View> */}

</>
    
  );
}

const styles = StyleSheet.create({});
