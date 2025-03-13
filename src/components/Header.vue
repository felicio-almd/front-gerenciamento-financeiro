<template>
  <v-app-bar
    app
    color="teal"
    density="comfortable"
  >
    <div class="header-container">
      <div
        to="/"
        class="header-logo"
      >
        <img
          src="@/assets/logo-carteira.png"
          alt="Logo"
          height="50"
          contain
        >
      </div>

      <v-spacer />

      <div class="d-flex align-center justify-center ga-4 w-25">
        <v-btn
          variant="text"
          to="/"
        >
          Movimentações
        </v-btn>
        <v-btn  
          variant="text"
          to="/categories"
        >
          Categorias
        </v-btn>
      </div>

      <v-spacer />

      <div class="d-flex align-center justify-end ga-4 w-25">
        <span class="message-welcome">Olá! Você está logado!</span>
        <v-btn
          variant="flat"
          color="red"
          @click="logout"
        >
          SAIR
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useLogout } from '@/composables/logout';

const { logout } = useLogout();
</script>

<style lang="css" scoped>
 .header-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
 }

 .header-logo{
  width: 25%;
 }

 @media (max-width: 768px){
  .message-welcome { 
    display: none !important;
  }
  }
</style>
