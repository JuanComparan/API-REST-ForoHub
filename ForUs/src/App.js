import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import CreateTopico from './screens/CreateTopico';
import { MyContextProvider, UserProvider } from './api/UserProvider';
import TopicoScreen from './screens/TopicoScreen';
import CreateReply from './screens/CreateReply';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    StatusBar.setBackgroundColor("black");
    StatusBar.setBarStyle('light-content');
  }, []);
  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
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
            <Stack.Screen
              name="CreateTopico"
              component={CreateTopico}
            />
            <Stack.Screen
              name="TopicoScreen"
              component={TopicoScreen}
            />
            <Stack.Screen
              name="CreateReply"
              component={CreateReply}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </UserProvider>
  );
}
