import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriverHome from './Screens/home/DriverHome';
import UserHome from './Screens/home/UserHome';
import MapPage from './Screens/MapPage';
import LoginScreen from './Screens/login/LoginScreen';
import RegisterScreen from './Screens/Register/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';

// import { auth } from './firebase/firebase.config';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator screenOptions={ {headerShown: false } }>
    <Stack.Screen name = "Login" component={LoginScreen} />
    <Stack.Screen name = "RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="UserHome" component={UserHome} />
    <Stack.Screen name="DriverHome" component={DriverHome} />
    <Stack.Screen name="MapPage" component={MapPage} />
    </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
  
}

      {/* <Stack.Screen name="findBus" component={FindBus} /> */}