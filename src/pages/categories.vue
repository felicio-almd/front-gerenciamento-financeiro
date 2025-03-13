<template>
  <h1>Categorias</h1>

  <div>
    <h2>Lista</h2>
    <p
      v-for="category in categories"
      :key="category.id"
    >
      {{ category.name }}
      <button @click="teste(category.id)">
        aaaaaaaaa
      </button>
    </p>
  </div>

  <pre>
    {{ categories }}
  </pre>
</template>

<script lang="ts" setup>
import { useCategoriesStore } from '@/stores/categories';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useCategoriesStore()

const {categories} = storeToRefs(store)
onMounted(async()=>{
  await store.getCategories()
})

function teste (id: string) {
  console.log(id)
}
</script>