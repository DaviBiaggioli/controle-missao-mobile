# 🚀 Controle de Missão Espacial - Solução Integrada

Este projeto é uma solução integrada para monitoramento e controle de missões espaciais, desenvolvido como requisito para a disciplina de Advanced Programming And Mobile Dev. O sistema permite o cadastro, leitura, edição e exclusão de telemetrias, cruzando dados de sistemas vitais e sensores de hardware.

## 🛠️ Tecnologias Utilizadas

**Backend (API REST):**
- Java 22 / Spring Boot 3
- Spring Data JPA / Hibernate
- Banco de Dados H2 (Modo File para persistência local)
- Arquitetura normalizada (Sistemas Monitorados, Sensores e Registros Operacionais)

**Frontend (Mobile):**
- React Native com TypeScript
- Expo
- Axios (Integração com API)
- React Navigation (Navegação em Pilha)
- Interface UI/UX focada em Dark Mode/Tech

## ⚙️ Como Executar o Projeto

### 1. Iniciando o Backend (Java)
1. Abra o projeto no IntelliJ IDEA (ou sua IDE de preferência).
2. Aguarde o Maven baixar as dependências.
3. Execute a classe `MissaoEspacialApplication.java`.
4. O servidor iniciará na porta `8080` e o banco H2 será populado automaticamente com os sistemas e sensores iniciais.

### 2. Iniciando o Frontend (Mobile)
1. Navegue até a pasta do aplicativo no terminal.
2. Instale as dependências executando: `npm install`
3. Inicie o servidor do Expo: `npx expo start`
4. Pressione `w` para rodar no navegador web ou leia o QR Code com o aplicativo **Expo Go** em seu dispositivo físico.

## 👥 Equipe Desenvolvedora
* **Davi da Silva Biaggioli** - RM 552581  
* **João Gabriel De Bortoli Ribeiro** - RM 554601  
* **Luiz Guilherme de Souza Varischi** - RM 559028  