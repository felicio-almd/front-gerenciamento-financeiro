import { authClient } from "@/http/client";
import { useAuthStore } from "@/stores/auth";
import type { AuthOptions } from "@/types/auth";
import { ref, watchEffect, type Ref } from "vue";

interface UserOptions {
    data: Ref <AuthOptions | undefined> 
}

export function useLogin ({data: dataRef}: UserOptions) {
    const loading = ref(false);
    const data = ref<AuthOptions>()

    const {setIsLogged} = useAuthStore();

    const login = async () => {
        loading.value = true
        try{
            await authClient.get('/sanctum/csrf-cookie')
            
            const response = await authClient.post('/api/login', {
                email: data.value?.email,
                password: data.value?.password
            })
            if (response.status === 200) {
                setIsLogged(true); 
            } else {
                throw new Error("Credenciais inválidas ou erro no servidor.");
            }
        } catch(error){
            console.error('Login falhou:', error);
            throw error;
        } finally {
            loading.value = false
        }
    }

    watchEffect(()=>{
        if (!dataRef.value) return
        data.value = dataRef.value 
    })

    return {login, loading}
}