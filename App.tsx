/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import {StackNavigation} from './src/Navigation/StackNavigation'
import {NavigationContainer} from '@react-navigation/native'

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
    
  );
}

export default App;
