import {createStackNavigator} from '@react-navigation/stack';
import {screenNames} from '../Constants/constant';
import Login from '../Screens/Login';
import SplashScreen from '../Screens/SplashScreen';
import Registration from '../Screens/Registration';
import BottomNavigation from './BottomNavigator';
import AddTransaction from '../Screens/AddTransaction';
import TransactionModal from '../Components/TransactionModal';
import ForgotPassword from '../Screens/ForgotPassword';
import OtpVerification from '../Screens/OtpVerification';
import Profile from '../Screens/Profile';
import PackagesData from '../Screens/PackagesData';
import OnBoarding from '../Screens/OnBoarding';
import EditPass from '../Screens/EditPass';
import StarRating from '../Components/StarRating';
import Details from '../Screens/Details';
import ComparisionScreen from '../Screens/ComparisionScreen';


StarRating;

const transaction = () => {
  return console.log('hello');
};

const Stack = createStackNavigator();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={screenNames.Splash_Screen}
      screenOptions={() => {
        return {
          headerShown: false,
        };
      }}>
      <Stack.Screen name={screenNames.Splash_Screen} component={SplashScreen} />
      <Stack.Screen name={screenNames.Login} component={Login} />
      <Stack.Screen name={screenNames.Register} component={Registration} />
      <Stack.Screen name={screenNames.DashBoard} component={BottomNavigation} />
      <Stack.Screen
        name={screenNames.AddTransactions}
        component={AddTransaction}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={screenNames.TransactionPopup}
        component={TransactionModal}
      />
      <Stack.Screen
        name={screenNames.Forgot_Password}
        component={ForgotPassword}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name={screenNames.Otp_Verification}
        component={OtpVerification}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name={screenNames.Edit_Password}
        component={EditPass}
        options={{headerShown: false, headerTitleAlign: 'center'}}
      />
      {/* <Stack.Screen
        name={screenNames.Profile}
        component={Profile}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      /> */}
      {/* <Stack.Screen
        name={'onBoarding'}
        component={OnBoarding}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      /> */}
      <Stack.Screen
        name={'Star Rating'}
        component={StarRating}
        options={{headerShown: true, headerTitleAlign: 'center'}}
      />
      <Stack.Screen name={screenNames.Details} component={Details} />

      <Stack.Screen name={screenNames.ComparisionScreen} component={ComparisionScreen} options={{headerShown: true, headerTitleAlign: 'center'}} />
    </Stack.Navigator>
  );
};
