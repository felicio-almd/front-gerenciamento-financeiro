# 🖥️ Frontend - Gerenciamento de Movimentacoes Financeiras 💰

Este é o repositório do frontend do projeto **Gerenciamento de Movimentações Financeiras**, desenvolvido com **Vue 3** e **Typescript**. O objetivo é fornecer uma interface moderna e responsiva para gerenciar movimentações financeiras e categorias. 🚀

## Features
- É possível criar seu usuario e logar com ele para fazer suas movimentações 
- Cada usuario tem suas proprias movimentações (tabelas relacionadas), as categorias são gerais para todos

---

## 🛠️ Tecnologias Utilizadas

- **Vue 3** 🖥️
- **Typescript** 🐜
- **Pinia** 🛂 (para gerenciamento de estado)
- **Axios** 🌐 (para requisições HTTP)
- **Vuetify** 🎨 (para componentes UI)
- **Vite** ⚡ (para build e desenvolvimento)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18+)
- Yarn ou npm

## Junto ao backend
- PARA QUE AS INFORMAÇÕES POSSAM APARECER, É PRECISO RODAR O BACKEND
- PARA RODAR O BACKEND CLONE https://github.com/felicio-almd/api-gerenciamento-financeiro.git
- FAÇA O PASSO A PASSO PARA RODAR O BACKEND COM O BANCO DE DADOS ONLINE
- Após isso siga os passos abaixo

### Passos para Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/felicio-almd/front-gerenciamento-financeiro.git
   cd front-gerenciamento-financeiro
   ```

2. **Instale as dependências:**
   ```bash
   yarn install # ou npm install
   ```

3. **Configure o ambiente:**

   Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis de ambiente necessárias (ex: URL do backend).
   ```bash
   cp .env.example .env.local
   ```

   Exemplo de `.env.local`:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   yarn dev # ou npm run dev
   ```

5. **Acesse o projeto:**
   Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

---

## ✨ Funcionalidades

### 1. Autenticação 🔐
Tela de login para autenticação de usuários.

### 2. Gerenciamento de Movimentações 💸
Tabela com todas as movimentações registradas, contendo:

- 📅 Data de criação
- 🏷️ Tipo (entrada ou saída)
- 💵 Valor (R$)
- 🛂 Categoria
- 📝 Descrição
- Botão para abrir formulário de criação de movimentação.
- Opções de edição e exclusão para cada registro.

### 3. Gerenciamento de Categorias 🏷️
- Botão para criar categorias.
- Lista de categorias criadas.
- Opção de exclusão para cada categoria.
- Utilização de categorias registradas no formulário de movimentação.

---

## 📝 Scripts Disponíveis

- `yarn dev`: Inicia o servidor de desenvolvimento.
- `yarn build`: Gera a versão de produção.
- `yarn lint`: Executa o linting do código.
- `yarn preview`: Previsualiza a build de produção localmente.

---

## 📝 Made by Felicio
