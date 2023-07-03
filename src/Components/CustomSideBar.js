import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { screenNames } from '../Constants/constant';

export default function CustomSideBar({...props}) {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/Images/logo.png')}
        style={styles.logo}
      />
      <DrawerContentScrollView {...props}>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home-outline" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate(screenNames.Home);
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="clipboard-list" color={color} size={size} />
            )}
            label="Categories"
            onPress={() => {
              props.navigation.navigate(screenNames.Categories);
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="collapse-all-outline" color={color} size={size} />
            )}
            label="Transactions"
            onPress={() => {
              props.navigation.navigate(screenNames.Transaction);
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            props.navigation.closeDrawer();
            // handleToken(null);
          }}
        />
      </Drawer.Section>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    logo: {
        resizeMode: 'center',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        alignSelf: 'center',
      },
      drawerContent: {
        flex: 1,
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      drawerSection: {
        marginTop: 15,
      },
      bottomDrawerSection: {
        marginBottom: 15
      },
})