import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ActivityIndicator, Platform } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { api } from '../services/api';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;
};

export default function Cadastro({ navigation }: Props) {
  const [sensorId, setSensorId] = useState('1'); 
  const [detalhesOperacionais, setDetalhesOperacionais] = useState('');
  const [alertaCritico, setAlertaCritico] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSalvar() {
    if (!sensorId.trim() || !detalhesOperacionais.trim()) {
      if (Platform.OS === 'web') {
        window.alert('Atenção: Preencha todos os parâmetros.');
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID DO HARDWARE (SENSOR)</Text>
      <TextInput
        style={styles.input}
        value={sensorId}
        onChangeText={setSensorId}
        keyboardType="numeric"
        placeholderTextColor="#475569"
      />

      <Text style={styles.label}>TELEMETRIA / DETALHES</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Ex: Nível de oxigênio abaixo do padrão..."
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

      <TouchableOpacity style={styles.button} onPress={handleSalvar} disabled={loading}>
        {loading ? <ActivityIndicator color="#0B0F19" /> : <Text style={styles.buttonText}>INICIAR TRANSMISSÃO</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0B0F19' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#00F0FF', marginBottom: 8, marginTop: 16, fontFamily: 'monospace' },
  input: { backgroundColor: '#131A2A', borderWidth: 1, borderColor: '#00F0FF', borderRadius: 4, padding: 12, fontSize: 16, color: '#FFFFFF' },
  textArea: { height: 100, textAlignVertical: 'top' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 32, backgroundColor: '#131A2A', padding: 16, borderRadius: 4, borderWidth: 1, borderColor: '#00F0FF' },
  labelSwitch: { fontSize: 14, fontWeight: 'bold', color: '#FFFFFF', fontFamily: 'monospace' },
  button: { backgroundColor: '#00F0FF', padding: 16, borderRadius: 4, alignItems: 'center', marginTop: 'auto' },
  buttonText: { color: '#0B0F19', fontSize: 16, fontWeight: 'bold', fontFamily: 'monospace' },
});