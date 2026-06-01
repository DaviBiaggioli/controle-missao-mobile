import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importaremos as telas que criaremos a seguir
import Home from './src/screens/Home';
import Cadastro from './src/screens/Cadastro';

// Tipagem das rotas para o TypeScript não reclamar
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
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#000000',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#f8f9fa' } // Design limpo (light mode)
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Painel de Controle' }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{ title: 'Novo Registro' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}