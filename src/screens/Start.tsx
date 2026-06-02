import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Start'>;
};

export default function Start({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>CONTROLE DE</Text>
        <Text style={styles.subtitle}>MISSÃO ESPACIAL</Text>
        <Text style={styles.description}>
          Sistema integrado de monitoramento de telemetria, sensores e hardware em tempo real.
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>ACESSAR PAINEL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19', justifyContent: 'center', padding: 24 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, color: '#94A3B8', letterSpacing: 2 },
  subtitle: { fontSize: 32, fontWeight: 'bold', color: '#00F0FF', marginBottom: 24, textAlign: 'center' },
  description: { fontSize: 16, color: '#475569', textAlign: 'center', lineHeight: 24, paddingHorizontal: 20 },
  button: { backgroundColor: '#00F0FF', padding: 18, borderRadius: 8, alignItems: 'center', marginBottom: 40 },
  buttonText: { color: '#0B0F19', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
});