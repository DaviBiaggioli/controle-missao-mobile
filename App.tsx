import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './src/screens/Start';
import Home from './src/screens/Home';
import Cadastro from './src/screens/Cadastro';

export type RootStackParamList = {
  Start: undefined;
  Home: undefined;
  Cadastro: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Start"
        screenOptions={{
          headerStyle: { backgroundColor: '#0B0F19' },
          headerTintColor: '#00F0FF',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#0B0F19' }
        }}
      >
        <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'DASHBOARD' }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'NOVO REGISTRO' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}