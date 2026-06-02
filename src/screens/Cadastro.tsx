import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Platform } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { api } from '../services/api';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;
};

export default function Cadastro({ navigation }: Props) {
  const [sensorId, setSensorId] = useState(''); 
  const [detalhesOperacionais, setDetalhesOperacionais] = useState('');
  const [alertaCritico, setAlertaCritico] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSalvar() {
    if (!sensorId.trim() || !detalhesOperacionais.trim()) {
      if (Platform.OS === 'web') {
        window.alert('Por favor, preencha todos os campos.');
      }
      return;
    }

    try {
      setLoading(true);
      await api.post('/api/registros', {
        detalhesOperacionais,
        alertaCritico,
        sensor: { id: parseInt(sensorId) }
      });
      navigation.goBack();
    } catch (error) {
      console.error("Erro no POST:", error);
      if (Platform.OS === 'web') {
        window.alert('Erro ao salvar. Verifique se o ID do Sensor está correto (de 1 a 5).');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID DO SENSOR (1 a 5)</Text>
      <TextInput
        style={styles.input}
        value={sensorId}
        onChangeText={setSensorId}
        keyboardType="numeric"
        placeholder="Ex: 3"
        placeholderTextColor="#475569"
      />

      <Text style={styles.label}>DETALHES DA LEITURA</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva o status atual do equipamento..."
        value={detalhesOperacionais}
        onChangeText={setDetalhesOperacionais}
        multiline
        numberOfLines={4}
        placeholderTextColor="#475569"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.labelSwitch}>MARCAR COMO CRÍTICO?</Text>
        <Switch
          trackColor={{ false: '#1E293B', true: '#FF0055' }}
          thumbColor={'#FFFFFF'}
          onValueChange={setAlertaCritico}
          value={alertaCritico}
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.7 }]} 
        onPress={handleSalvar} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'SALVANDO...' : 'SALVAR REGISTRO'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0B0F19' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#94A3B8', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#131A2A', borderWidth: 1, borderColor: '#1E293B', borderRadius: 8, padding: 12, fontSize: 16, color: '#FFFFFF' },
  textArea: { height: 100, textAlignVertical: 'top' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 32, backgroundColor: '#131A2A', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#1E293B' },
  labelSwitch: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' },
  button: { backgroundColor: '#00F0FF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 'auto' },
  buttonText: { color: '#0B0F19', fontSize: 16, fontWeight: 'bold' },
});