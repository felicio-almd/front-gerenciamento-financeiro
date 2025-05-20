<template>
  <Header />
  <span class="d-flex align-center w-100 justify-center pt-10">
    <h2>
      Lista de Movimentações
    </h2>
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
              :error-messages="errors.type"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="record.value"
              :min="0"
              oninput="if(Number(this.value) > Number(this.max)) this.value = this.max; if(Number(this.value) < Number(this.min)) this.value = this.min;"
              max="999999999999999999999999" 
              label="Valor da Movimentação"
              type="number"
              :error-messages="errors.value"
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
              :error-messages="errors.category_id"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="record.description"
              label="Descrição da Movimentação"
              :error-messages="errors.description"
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
          :loading="loading"
          @click="save"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { ref, onMounted } from 'vue';
import { useMovementsStore } from '@/stores/movements';
import { useCategoriesStore } from '@/stores/categories';
import { storeToRefs } from 'pinia';
import type { CreateMovementRequest, MovementFormData, UpdateMovementRequest, ValidationError } from '@/types/movements';

const movementsStore = useMovementsStore();
const categoriesStore = useCategoriesStore();
const { movements, loading, error } = storeToRefs(movementsStore);
const { categories } = storeToRefs(categoriesStore);

onMounted(async () => {
  try {
    await movementsStore.getMovements();
    await categoriesStore.getCategories();
  } catch (err) {
    alert('Erro ao carregar dados. Tente novamente mais tarde.');
  }
});

const headers = [
  { title: 'Tipo', key: 'type' },
  { title: 'Valor', key: 'value' },
  { title: 'Categoria', key: 'category_id' },
  { title: 'Descrição', key: 'description' },
  { title: 'Data de Criação', key: 'created_at' },
  { title: 'Ações', key: 'actions', sortable: false, align: 'center' as const },
] as const;

const movTypes = [
  { text: 'Entrada', value: 'in' },
  { text: 'Saída', value: 'out' },
];

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
const record = ref<MovementFormData>({
  id: '',
  type: '',
  value: '',
  category_id: '',
  description: '',
});

const errors = ref({
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
  errors.value = {
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
    record.value = { 
      id: movement.id,
      type: movement.type,
      value: movement.value.toString(),
      category_id: movement.category_id,
      description: movement.description,
    };
    errors.value = {
      type: '',
      value: '',
      category_id: '',
      description: '',
    };
    dialog.value = true;
  }
};

const save = async () => {
  try {
    const movementData = {
      type: record.value.type,
      value: parseFloat(record.value.value),
      category_id: record.value.category_id,
      description: record.value.description,
    };

    if (isEditing.value) {
      await movementsStore.updateMovement({
        id: record.value.id,
        ...movementData,
      } as UpdateMovementRequest);
    } else {
      await movementsStore.newMovement(movementData as CreateMovementRequest);
    }
    dialog.value = false;
  } catch (err: unknown) {
    if (isValidationError(err)) {
      errors.value = {
        type: err.response?.data?.errors?.type?.[0] || '',
        value: err.response?.data?.errors?.value?.[0] || '',
        category_id: err.response?.data?.errors?.category_id?.[0] || '',
        description: err.response?.data?.errors?.description?.[0] || '',
      };
    } else {
      console.error('Error saving movement:', err);
      alert('Erro ao salvar Movimentação. Tente novamente mais tarde.');
    }
  }
};

const remove = async (id: string) => {
  try {
    await movementsStore.deleteMovement(id);
  } catch (err) {
    alert(error.value || 'Erro ao excluir Movimentação. Tente novamente mais tarde.');
  }
};

function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as any).response === 'object'
  );
}

</script>