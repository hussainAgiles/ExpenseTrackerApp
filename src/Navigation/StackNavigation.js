import { createStackNavigator } from "@react-navigation/stack";
import { create } from "react-test-renderer";
import { screenNames } from "../Constants/constant";
import Login from "../Screens/Login";
import SplashScreen from "../Screens/SplashScreen";
import Registration from "../Screens/Registration";
import DashBoard from '../Screens/DashBoard';
import DrawerNavigation from "./DrawerNavigation";
import BottomNavigation from './BottomNavigator'



const Stack = createStackNavigator()

export const StackNavigation = ()=>{
    return(
        <Stack.Navigator initialRouteName={screenNames.Splash_Screen} screenOptions={() => {
            return {
              headerShown: false,
            };
          }}>
            <Stack.Screen name={screenNames.Splash_Screen} component={SplashScreen}/>
            <Stack.Screen name={screenNames.Login} component={Login}/>
            <Stack.Screen name={screenNames.Register} component={Registration}/>
            <Stack.Screen name={screenNames.DashBoard} component={BottomNavigation}/>
        </Stack.Navigator>
    )
}