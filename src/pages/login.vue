<template>
  <form @submit.prevent="handleLogin">
    <v-text-field
      v-model="data.email"
      type="email"
    />
    <v-text-field
      id="senha"
      v-model="data.password"
      type="text"
      name="senha"
    />
    <button type="submit">
      Send login
    </button>
  </form>
</template>
  
  <script lang="ts" setup>
  import { useLogin } from '@/composables/login';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter()

    const data = ref({
      email: 'admin@example.com',
      password: 'password'
    })
  
    const {login, loading} = useLogin({data})
  
    const handleLogin = async () => {
      if(!data.value.email || !data.value.password){
        return
      }
      
      await login()
      // router.push('/')
    }
  </script>
  