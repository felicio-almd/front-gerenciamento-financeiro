import { authClient } from "@/http/client";
import type { AuthOptions, AuthResponse } from "@/types/auth";
import { ref, watchEffect, type Ref } from "vue";

interface UserOptions {
    data: Ref <AuthOptions | undefined> 
}

export function useLogin ({data: dataRef}: UserOptions) {
    const loading = ref(false);
    const data = ref<AuthOptions>()

    const login = async () => {
        loading.value = true
        try{
            await authClient.get('/sanctum/csrf-cookie')
            
            await authClient.post<AuthResponse>('/api/login', {
                email: data.value?.email,
                password: data.value?.password
            })
        } catch(error){
            console.error('Login failed:', error);
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