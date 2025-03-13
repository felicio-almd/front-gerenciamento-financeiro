<template>
  <v-app-bar
    app
    color="teal"
    density="comfortable"
    height="80"
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

      <div class="header-links d-flex w-100 ga-4 justify-center lg-align-center">
        <v-btn
          variant="text"
          to="/"
          class="d-flex justify-center"
        >
          <p class="d-none d-sm-flex">
            Movimentações
          </p>
          <p class="d-sm-none icon-button">
            <v-icon
              color="white"
              icon="mdi-cash-multiple"
              size="x-large"
            />
          </p>
        </v-btn>
        <v-btn  
          variant="text"
          to="/categories"
        >
          <p class="d-none d-sm-flex">
            Categorias
          </p>
          <p class="d-sm-none icon-button">
            <v-icon
              color="white"
              icon="mdi-tag-multiple"
              size="x-large"
            />
          </p>
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
   .header-logo{
     display: none;
     width: 0;
  }
  
  .header-links{
    justify-content: flex-start !important;
  }
}
@media (max-width: 1000px){
  .message-welcome { 
    display: none !important;
  }
}
</style>
