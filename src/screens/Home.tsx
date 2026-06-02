import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Modal, TextInput, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { api } from '../services/api';
import { RegistroOperacional } from '../types/RegistroOperacional';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function Home({ navigation }: Props) {
  const [registros, setRegistros] = useState<RegistroOperacional[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [registroSelecionado, setRegistroSelecionado] = useState<RegistroOperacional | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [editDetalhes, setEditDetalhes] = useState('');

  useFocusEffect(
    useCallback(() => {
      buscarRegistros();
    }, [])
  );

  async function buscarRegistros() {
    try {
      setLoading(true);
      const response = await api.get('/api/registros');
      setRegistros(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function abrirModal(registro: RegistroOperacional) {
    setRegistroSelecionado(registro);
    setEditDetalhes(registro.detalhesOperacionais);
    setModoEdicao(false);
    setModalVisible(true);
  }

  function fecharModal() {
    setModalVisible(false);
    setRegistroSelecionado(null);
  }

  // --- FIX DA EXCLUSÃO PARA O NAVEGADOR WEB ---
  async function handleDelete() {
    if (!registroSelecionado?.id) return;
    
    const executarExclusao = async () => {
      try {
        await api.delete(`/api/registros/${registroSelecionado.id}`);
        fecharModal();
        buscarRegistros(); 
      } catch (error) {
        console.error("Erro ao excluir", error);
      }
    };

    if (Platform.OS === 'web') {
      if (window.confirm("ALERTA: Deseja realmente purgar este registro do banco de dados?")) {
        executarExclusao();
      }
    } else {
      // Para quando o professor rodar no celular físico (Expo Go)
      const { Alert } = require('react-native');
      Alert.alert("Atenção", "Deseja purgar este registro?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: executarExclusao }
      ]);
    }
  }

  async function handleUpdate() {
    if (!registroSelecionado?.id) return;
    try {
      await api.put(`/api/registros/${registroSelecionado.id}`, {
        detalhesOperacionais: editDetalhes,
        alertaCritico: registroSelecionado.alertaCritico,
        sensor: registroSelecionado.sensor 
      });
      fecharModal();
      buscarRegistros();
    } catch (error) {
      console.error("Erro ao atualizar", error);
    }
  }

  function renderItem({ item }: { item: RegistroOperacional }) {
    return (
      <TouchableOpacity 
        style={[styles.card, item.alertaCritico && styles.cardCritico]}
        onPress={() => abrirModal(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.sensorName}>{item.sensor?.nomeSensor?.toUpperCase() || `SENSOR_ID: ${item.sensor?.id}`}</Text>
          <Text style={styles.idBadge}>ID: {item.id}</Text>
        </View>
        <Text style={styles.detalhes} numberOfLines={2}>{item.detalhesOperacionais}</Text>
        {item.alertaCritico && <Text style={styles.alertaText}>[!] AVISO CRÍTICO DE SISTEMA</Text>}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00F0FF" style={styles.loader} />
      ) : (
        <FlatList
          data={registros}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>AGUARDANDO DADOS DE TELEMETRIA...</Text>}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.addButtonText}>INSERIR LEITURA MANUAL</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={fecharModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {registroSelecionado && (
              <>
                <Text style={styles.modalTitle}>
                  {registroSelecionado.sensor?.nomeSensor?.toUpperCase() || 'DETALHES DO MÓDULO'}
                </Text>
                
                {modoEdicao ? (
                  <TextInput
                    style={styles.modalInput}
                    value={editDetalhes}
                    onChangeText={setEditDetalhes}
                    multiline
                  />
                ) : (
                  <Text style={styles.modalText}>{registroSelecionado.detalhesOperacionais}</Text>
                )}

                <Text style={styles.modalDate}>
                  TIMESTAMP: {registroSelecionado.dataRegistro ? new Date(registroSelecionado.dataRegistro).toISOString() : 'N/A'}
                </Text>

                <View style={styles.modalActions}>
                  {modoEdicao ? (
                    <TouchableOpacity style={[styles.actionBtn, styles.saveBtn]} onPress={handleUpdate}>
                      <Text style={styles.actionBtnText}>GRAVAR</Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <TouchableOpacity style={[styles.actionBtn, styles.editBtn]} onPress={() => setModoEdicao(true)}>
                        <Text style={styles.actionBtnText}>EDITAR</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={handleDelete}>
                        <Text style={styles.actionBtnText}>PURGAR</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>

                <TouchableOpacity style={styles.closeBtn} onPress={fecharModal}>
                  <Text style={styles.closeBtnText}>FECHAR CONSOLE</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19' },
  loader: { marginTop: 50 },
  listContainer: { padding: 16, paddingBottom: 80 },
  card: { backgroundColor: '#131A2A', padding: 16, borderRadius: 4, marginBottom: 16, borderWidth: 1, borderColor: '#00F0FF', borderLeftWidth: 6, borderLeftColor: '#00F0FF' },
  cardCritico: { borderColor: '#FF0055', borderLeftColor: '#FF0055', backgroundColor: '#1A0B10' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sensorName: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', fontFamily: 'monospace' },
  idBadge: { fontSize: 12, color: '#00F0FF', fontFamily: 'monospace' },
  detalhes: { fontSize: 14, color: '#94A3B8', lineHeight: 20 },
  alertaText: { fontSize: 12, color: '#FF0055', fontWeight: 'bold', marginTop: 12, fontFamily: 'monospace' },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 14, color: '#475569', fontFamily: 'monospace' },
  addButton: { backgroundColor: '#00F0FF', padding: 16, margin: 16, borderRadius: 4, alignItems: 'center', position: 'absolute', bottom: 0, left: 0, right: 0 },
  addButtonText: { color: '#0B0F19', fontWeight: 'bold', fontSize: 16, fontFamily: 'monospace' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(5, 7, 12, 0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalContent: { backgroundColor: '#131A2A', borderRadius: 4, padding: 24, width: '100%', maxWidth: 400, borderWidth: 1, borderColor: '#00F0FF' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#00F0FF', marginBottom: 16, fontFamily: 'monospace' },
  modalText: { fontSize: 16, color: '#E2E8F0', lineHeight: 24, marginBottom: 16 },
  modalInput: { borderWidth: 1, borderColor: '#00F0FF', backgroundColor: '#0B0F19', borderRadius: 4, padding: 12, fontSize: 16, color: '#FFFFFF', marginBottom: 16, minHeight: 80, textAlignVertical: 'top' },
  modalDate: { fontSize: 12, color: '#475569', marginBottom: 24, fontFamily: 'monospace' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  actionBtn: { flex: 1, padding: 12, borderRadius: 4, alignItems: 'center', marginHorizontal: 4 },
  editBtn: { backgroundColor: '#0EA5E9' },
  deleteBtn: { backgroundColor: '#E11D48' },
  saveBtn: { backgroundColor: '#10B981' },
  actionBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontFamily: 'monospace' },
  closeBtn: { padding: 12, alignItems: 'center', marginTop: 8, borderWidth: 1, borderColor: '#475569', borderRadius: 4 },
  closeBtnText: { color: '#94A3B8', fontWeight: 'bold', fontSize: 14, fontFamily: 'monospace' }
});