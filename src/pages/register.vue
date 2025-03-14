<template>
  <v-sheet
    class="bg-teal pa-12 min-h-screen d-flex flex-column align-center justify-center w-100"
  >
    <v-card
      class="mx-auto w-100 px-6 py-8 text-center"
      max-width="400"
      elevation="10"
    >
      <v-card-title class="text-h5 font-weight-bold mb-2">
        Bem vindo ao cadastro!
      </v-card-title>
      <v-card-subtitle class="mb-6">
        Por favor, crie sua conta com suas credenciais.
      </v-card-subtitle>
      
      <v-form
        @submit.prevent="handleRegister"
      >
        <v-text-field
          v-model="formData.name"
          :readonly="loading"
          :rules="[required]"
          class="mb-4"
          label="Nome"
          variant="outlined"
          clearable
          prepend-inner-icon="mdi-pencil"
        />

        <v-text-field
          v-model="formData.email"
          :readonly="loading"
          :rules="[required]"
          class="mb-4"
          label="Email"
          variant="outlined"
          clearable
          prepend-inner-icon="mdi-email"
        />

        <v-text-field
          v-model="formData.password"
          :readonly="loading"
          :rules="[required]"
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          clearable
          variant="outlined"
          prepend-inner-icon="mdi-lock"
        />

        <v-card-subtitle class="w-100 text-center">
          Já tem conta?  
          <RouterLink 
            to="/login" 
            class="text-primary font-weight-bold text-decoration-none"
          >
            Entre aqui
          </RouterLink>
        </v-card-subtitle>
        <v-btn
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
          class="mt-4"
        >
          Registrar
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
  <Footer />
  <v-snackbar
    v-model="showError"
    color="error"
    timeout="2000"
    top
  >
    {{ errorMessage }}
    <template #actions>
      <v-btn
        color="white"
        variant="text"
        @click="showError = false"
      >
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>
  
<script lang="ts" setup>
  import Footer from '@/components/Footer.vue';
  import { ref } from 'vue';
  import { useRegister } from '@/composables/register';
import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const formData = ref({
    name: '',
    email: '',
    password: '',
  });
  
  const { register, loading } = useRegister({ data: formData });

  const showError = ref(false)
  const errorMessage = ref('')

  const required = (value: string): boolean | string => !!value || 'Campo obrigatório';
  
  const handleRegister = async () => {
    try {
      await register();
      console.log('Registro realizado com sucesso!');
      router.push('/');
    } catch (error) {
        showError.value = true;
        errorMessage.value = 'Verifique suas credenciais.';
        console.log('Erro ao registrar: ' + error.message);
    }
  };
  </script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>