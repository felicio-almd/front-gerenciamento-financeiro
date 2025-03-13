import { authClient } from "@/http/client";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

export function useLogout () {
    const loading = ref(false);
    const {setIsLogged} = useAuthStore();
    const router = useRouter()

    const logout = async () => {
        loading.value = true
        try{
            const token = localStorage.getItem('auth_token')

            const response = await authClient.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.status === 200) {
                setIsLogged(false); 
                localStorage.removeItem('auth_token');
                router.push("/login"); 
            } else {
                throw new Error("Erro ao fazer logout.");
            }
        } catch(error){
            console.error('Logout falhou:', error);
            throw error
        } finally {
            loading.value = false
        }
    }

    return {logout, loading}
}