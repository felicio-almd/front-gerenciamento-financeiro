import { authClient } from "@/http/client";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

export function useLogout () {
    const loading = ref(false);

    const {setIsLogged} = useAuthStore();

    const logout = async () => {
        loading.value = true
        try{
            await authClient.get('/sanctum/csrf-cookie')
            await authClient.post('/api/logout')

            setIsLogged(false)
        } catch(error){
            console.error('Logout falhou:', error);
        } finally {
            loading.value = false
        }
    }

    return {logout, loading}
}