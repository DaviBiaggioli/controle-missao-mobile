import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert, ActivityIndicator } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { api } from '../services/api';

type CadastroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;

type Props = {
  navigation: CadastroScreenNavigationProp;
};

export default function Cadastro({ navigation }: Props) {
  const [nomeSensor, setNomeSensor] = useState('');
  const [detalhesOperacionais, setDetalhesOperacionais] = useState('');
  const [alertaCritico, setAlertaCritico] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSalvar() {
    // Validação básica
    if (!nomeSensor.trim() || !detalhesOperacionais.trim()) {
      Alert.alert('Atenção', 'Preencha o nome do sensor e os detalhes operacionais.');
      return;
    }

    try {
      setLoading(true);
      
      // Envia o POST para o backend Java
      await api.post('/', {
        nomeSensor,
        detalhesOperacionais,
        alertaCritico,
      });

      Alert.alert('Sucesso!', 'Registro inserido no banco de dados da missão.');
      
      // Volta para a tela Home automaticamente
      navigation.goBack();
      
    } catch (error) {
      console.error("Erro no POST:", error);
      Alert.alert('Erro de Conexão', 'Não foi possível conectar com o Backend. Verifique se o Java está rodando e o IP configurado corretamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Sensor ou Módulo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Sensor de Temperatura do Motor"
        value={nomeSensor}
        onChangeText={setNomeSensor}
        placeholderTextColor="#adb5bd"
      />

      <Text style={styles.label}>Detalhes Operacionais</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Ex: Leitura atual em 450°C. Sistema operando nominalmente."
        value={detalhesOperacionais}
        onChangeText={setDetalhesOperacionais}
        multiline
        numberOfLines={4}
        placeholderTextColor="#adb5bd"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.labelSwitch}>Marcar como Alerta Crítico?</Text>
        <Switch
          trackColor={{ false: '#dee2e6', true: '#ffc9c9' }}
          thumbColor={alertaCritico ? '#F44336' : '#f4f3f4'}
          onValueChange={setAlertaCritico}
          value={alertaCritico}
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSalvar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Salvar Registro</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#212529',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  labelSwitch: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  button: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});