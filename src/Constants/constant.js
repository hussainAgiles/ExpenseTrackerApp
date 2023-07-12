import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

export const screenNames = {
  Splash_Screen: `SplashScreen`,
  Login: `Login`,
  Register: 'Register',
  DashBoard: 'DashBoard',
  Home: `Home`,
  Transaction: `Transaction History`,
  Categories: `Categories`,
  AddTransactions :`Add Transactions`
};

export const globalStyle = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 5,
  },

  errorRegisteration: {
    color: 'red',
    fontSize: 15,
    textAlign:"left",
    marginVertical: 5,
  },
});

export const Sizes = {
  h1: 32,
  h2: 26,
  h3: 22,
  h4: 20,
  medium: 16,
  medium2: 18,
  small: 14,
  extraSmall: 12,
  tiny: 8.5,
  base: 4,
  screenWidth: width,
  screenHeight: height,
};

export const categoryColors = [
  '#FBD92F',
  '#44CD40',
  '#ff7f50',
  '#404FCD',
  '#1e90ff',
  '#9a5acd',
  '#C70039',
  '#5a5acd',
  '#AFF92F',
  '#aa7f50',
];
