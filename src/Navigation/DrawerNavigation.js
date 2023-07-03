import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { screenNames } from '../Constants/constant'
import Home from '../Screens/Home'
import Categories from '../Screens/Categories'
import Transaction from '../Screens/Transaction'
import CustomSideBar from '../Components/CustomSideBar'

const Drawer = createDrawerNavigator()

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName={screenNames.Home} drawerContent={props => (
        <CustomSideBar {...props} />
      )}>
        <Drawer.Screen name={screenNames.Home} component={Home}/>
        <Drawer.Screen name={screenNames.Categories} component={Categories}/>
        <Drawer.Screen name={screenNames.Transaction} component={Transaction}/>

    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({})