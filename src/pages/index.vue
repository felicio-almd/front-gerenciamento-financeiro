<template>
  <Header />
  <span class="d-flex align-center w-100 justify-center pt-10">
    <h1>
      Lista de Movimentações
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
          :items="movements"
          :hide-default-footer="movements.length < 11"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>
                <v-icon
                  color="medium-emphasis"
                  icon="mdi-cash-multiple"
                  size="x-small"
                  start
                />
                Movimentações
              </v-toolbar-title>
              <v-spacer />
              <v-btn
                class="me-2"
                prepend-icon="mdi-plus"
                rounded="lg"
                text="Nova movimentação"
                border
                @click="add"
              />
            </v-toolbar>
          </template>

          <template #item.created_at="{ item }">
            {{ formatDate(item.created_at) }}
          </template>

          <template #item.type="{ item }">
            <v-chip :color="item.type === 'in' ? 'green' : 'red'">
              {{ item.type === 'in' ? 'Entrada' : 'Saída' }}
            </v-chip>
          </template>

          <template #item.value="{ item }">
            {{ formatCurrency(item.value) }}
          </template>

          <template #item.category_id="{ item }">
            {{ getCategoryName(item.category_id) }}
          </template>

          <template #item.actions="{ item }">
            <div class="d-flex ga-2 justify-center">
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
      :subtitle="`${isEditing ? 'Editar' : 'Criar'} Movimentação`"
      :title="`${isEditing ? 'Editar' : 'Adicionar'} Movimentação`"
    >
      <template #text>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="record.type"
              :items="movTypes"
              item-title="text"
              item-value="value"
              label="Tipo da Movimentação"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="record.value"
              label="Valor da Movimentação"
              type="number"
              @update:model-value="(val) => record.value = Math.max(0, Number(val))"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="record.category_id"
              :items="categories"
              item-title="name"
              item-value="id"
              label="Categoria da Movimentação"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="record.description"
              label="Descrição da Movimentação"
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

import { ref, onMounted } from 'vue';
import { useMovementsStore } from '@/stores/movements';
import { useCategoriesStore } from '@/stores/categories';
import { storeToRefs } from 'pinia';

const movementsStore = useMovementsStore();
const categoriesStore = useCategoriesStore();
const { movements } = storeToRefs(movementsStore);
const { categories } = storeToRefs(categoriesStore);

onMounted(async () => {
  await movementsStore.getMovements();
  await categoriesStore.getCategories();
});

const headers = [
  { title: 'Tipo', key: 'type' },
  { title: 'Valor', key: 'value' },
  { title: 'Categoria', key: 'category_id' },
  { title: 'Descrição', key: 'description' },
  { title: 'Data de Criação', key: 'created_at' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' },
];

const movTypes = [
  {
    text: 'Entrada',
    value: 'in'
  },
  {
    text: 'Saída',
    value: 'out'
  },
]


const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const getCategoryName = (categoryId: string) => {
  const category = categories.value.find(cat => cat.id === categoryId);
  return category ? category.name : 'Sem categoria';
};

const dialog = ref(false);
const isEditing = ref(false);
const record = ref({
  id: '',
  type: '',
  value: '',
  category_id: '',
  description: '',
});

const add = () => {
  isEditing.value = false;
  record.value = {
    id: '',
    type: '',
    value: '',
    category_id: '',
    description: '',
  };
  dialog.value = true;
};

const edit = (id: string) => {
  const movement = movements.value.find(m => m.id === id);
  if (movement) {
    isEditing.value = true;
    record.value = { ...movement };
    dialog.value = true;
  }
};

const save = () => {
  if (isEditing.value) {
    movementsStore.updateMovement(record.value);
  } else {
    movementsStore.newMovement(record.value);
  }
  dialog.value = false;
};

const remove = (id: string) => {
  movementsStore.deleteMovement(id);
};
</script>

<style lang="scss" scoped>
</style>
