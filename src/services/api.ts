import axios from 'axios';

// NOTA DE REDE: 
// - Teste no navegador (tecla 'w'): use 'localhost'
// - Teste no celular físico (Expo Go): troque 'localhost' pelo IP do seu PC (ex: 192.168.1.15)
// - Teste no Emulador Android: troque 'localhost' por '10.0.2.2'

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8080',
});