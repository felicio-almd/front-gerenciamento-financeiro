<template>
  <Header />
  <span class="d-flex align-center w-100 justify-center pt-10">
    <h1>
      Lista de Categorias
    </h1>
  </span>
  <v-main class="pt-0">
    <v-container>
      <v-sheet
        border
        rounded
      >
        <v-data-table
          :headers="headers"
          :items="categories"
          :hide-default-footer="categories.length < 11"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>
                <v-icon
                  color="medium-emphasis"
                  icon="mdi-tag-multiple"
                  size="x-small"
                  start
                />
                Categorias
              </v-toolbar-title>
              <v-spacer />
              <v-btn
                class="me-2"
                prepend-icon="mdi-plus"
                rounded="lg"
                text="Nova Categoria"
                border
                @click="add"
              />
            </v-toolbar>
          </template>

          <template #item.actions="{ item }">
            <div class="d-flex ga-2 justify-end">
              <v-icon
                color="medium-emphasis"
                icon="mdi-pencil"
                size="small"
                @click="edit(item.id)"
              />
              <v-icon
                color="medium-emphasis"
                icon="mdi-delete"
                size="small"
                @click="remove(item.id)"
              />
            </div>
          </template>
        </v-data-table>
      </v-sheet>
    </v-container>
  </v-main>
  <Footer />

  <v-dialog
    v-model="dialog"
    max-width="500"
  >
    <v-card
      :subtitle="`${isEditing ? 'Editar' : 'Criar'} Categoria`"
      :title="`${isEditing ? 'Editar' : 'Adicionar'} Categoria`"
    >
      <template #text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="record.name"
              label="Nome da Categoria"
            />
          </v-col>
        </v-row>
      </template>

      <v-divider />

      <v-card-actions class="bg-surface-light">
        <v-btn
          text="Cancelar"
          variant="plain"
          @click="dialog = false"
        />
        <v-spacer />
        <v-btn
          text="Salvar"
          @click="save"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

import { ref, onMounted } from 'vue';
import { useCategoriesStore } from '@/stores/categories';
import { storeToRefs } from 'pinia';

const store = useCategoriesStore();
const { categories } = storeToRefs(store);

onMounted(async () => {
  await store.getCategories();
});

const headers = [
  { title: 'Nome', key: 'name' },
  { title: 'Ações', key: 'actions', align: 'end' },
];

const dialog = ref(false);
const isEditing = ref(false);
const record = ref({
  id: '',
  name: '',
});

const add = () => {
  isEditing.value = false;
  record.value = { id: '', name: '' };
  dialog.value = true;
};

const edit = (id: string) => {
  const category = categories.value.find((cat) => cat.id === id);
  if (category) {
    isEditing.value = true;
    record.value = { id: category.id, name: category.name };
    dialog.value = true;
  }
};

const remove = async (id: string) => {
  console.log('deletando:', id);
  const category = categories.value.find((cat) => cat.id === id);
  if (category) {
    await store.deleteCategory(category.id)
  }
};

const save = async () => {
  if (isEditing.value) {
    console.log('editando:', record.value);
    await store.updateCategory({ id: record.value.id, name: record.value.name})
  } else {
    await store.newCategory({ name: record.value.name });
  }
  dialog.value = false;
};
</script>