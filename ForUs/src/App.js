import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import SignUp from './screens/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    StatusBar.setBackgroundColor("black");
    StatusBar.setBarStyle('light-content');
  }, []);
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Welcome'
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom'
          }}
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
