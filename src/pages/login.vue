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
        Seja bem-vindo!
      </v-card-title>
      <v-card-subtitle class="mb-6">
        Por favor, entre com suas credenciais.
      </v-card-subtitle>
      
      <v-form
        v-model="isFormValid"
        @submit.prevent="handleLogin"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          :rules="[required]"
          class="mb-4"
          label="Email"
          variant="outlined"
          clearable
          prepend-inner-icon="mdi-email"
        />

        <v-text-field
          v-model="password"
          :readonly="loading"
          :rules="[required]"
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          clearable
          variant="outlined"
          prepend-inner-icon="mdi-lock"
        />

        <v-btn
          :disabled="!isFormValid"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
          class="mt-4"
        >
          Entrar
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLogin } from '@/composables/login';

const email = ref<string>('admin@example.com');
const password = ref<string>('password');
const isFormValid = ref<boolean>(false);
const router = useRouter();

const { login, loading } = useLogin({
  data: computed(() => ({
    email: email.value,
    password: password.value,
  })),
});

const showError = ref(false)
const errorMessage = ref('')

const required = (value: string): boolean | string => !!value || 'Campo obrigatório';

const handleLogin = async (): Promise<void> => {
  if (!email.value || !password.value) {
    showError.value = true;
    errorMessage.value = 'Preencha os campos';
    return;
  }

  try {
    await login();
    router.push('/');
  } catch (error) {
    showError.value = true;
    errorMessage.value = 'Verifique suas credenciais.';
  }
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>