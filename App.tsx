import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Cadastro from './src/screens/Cadastro';

export type RootStackParamList = {
  Home: undefined;
  Cadastro: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#0B0F19' }, // Azul super escuro (Espaço)
          headerTintColor: '#00F0FF', // Ciano Neon
          headerTitleStyle: { fontWeight: 'bold', fontFamily: 'monospace' },
          contentStyle: { backgroundColor: '#0B0F19' }
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ title: 'CONTROLE DE MISSÃO' }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'NOVA LEITURA' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}