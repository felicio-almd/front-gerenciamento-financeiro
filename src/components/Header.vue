<template>
  <div class="d-flex">
    <h1>Gerenciamento Financeiro</h1>
    <nav>
      <RouterLink to="/">
        Movimentações
      </RouterLink>
      <RouterLink to="/categories">
        Categorias
      </RouterLink>
    </nav>
    <button @click="logout">
      SAIR
    </button>
  </div>
</template>

<script lang="ts" setup>
    import { useLogout } from '@/composables/logout';

    const {logout} = useLogout() 

</script>

<style>
</style>