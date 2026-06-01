import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { api } from '../services/api';
import { RegistroOperacional } from '../types/RegistroOperacional';

// Tipagem da navegação
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function Home({ navigation }: Props) {
  const [registros, setRegistros] = useState<RegistroOperacional[]>([]);
  const [loading, setLoading] = useState(true);

  // Recarrega os dados toda vez que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      buscarRegistros();
    }, [])
  );

  async function buscarRegistros() {
    try {
      setLoading(true);
      // Faz o GET na nossa API Java
      const response = await api.get('/');
      setRegistros(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    } finally {
      setLoading(false);
    }
  }

  // Define como cada item da lista será desenhado na tela
  function renderItem({ item }: { item: RegistroOperacional }) {
    return (
      <View style={[styles.card, item.alertaCritico && styles.cardCritico]}>
        <Text style={styles.sensorName}>{item.nomeSensor}</Text>
        <Text style={styles.detalhes}>{item.detalhesOperacionais}</Text>
        {item.alertaCritico && <Text style={styles.alertaText}>⚠️ ALERTA CRÍTICO</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000000" style={styles.loader} />
      ) : (
        <FlatList
          data={registros}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma leitura de sensor registrada.</Text>
          }
        />
      )}

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>Adicionar Leitura</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilização focada em interface limpa (light mode)
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  loader: { 
    marginTop: 50 
  },
  listContainer: { 
    padding: 16,
    paddingBottom: 80 
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50', // Linha verde para status normal
  },
  cardCritico: {
    borderLeftColor: '#F44336', // Linha vermelha para alertas críticos
    backgroundColor: '#fffcfc',
  },
  sensorName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 6,
    color: '#212529'
  },
  detalhes: { 
    fontSize: 14, 
    color: '#6c757d',
    lineHeight: 20
  },
  alertaText: { 
    fontSize: 12, 
    color: '#F44336', 
    fontWeight: 'bold', 
    marginTop: 10 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 40, 
    fontSize: 16, 
    color: '#adb5bd' 
  },
  button: {
    backgroundColor: '#212529',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonText: { 
    color: '#ffffff', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});