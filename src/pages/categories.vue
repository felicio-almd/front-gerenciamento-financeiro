<template>
  asdas
  {{ counter }}
  <button @click="counter++">
    CLIQUE AQUI
  </button>
</template>

<script lang="ts" setup>
    import { ref } from "vue"
    const counter = ref(0);
</script>