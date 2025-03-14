import { authClient } from "@/http/client";
import router from "@/router";
import type { AuthOptions } from "@/types/auth";
import { ref, type Ref } from "vue";

interface UserOptions {
    data: Ref<AuthOptions>;
}

export function useRegister({ data: dataRef }: UserOptions) {
    const loading = ref(false);

    const register = async () => {
        loading.value = true;
        try {
            const response = await authClient.post('/api/users', {
                name: dataRef.value.name,
                email: dataRef.value.email,
                password: dataRef.value.password,
            });

            if (response.status === 201) {
                router.push('/login'); 
            } else {
                throw new Error("Erro no servidor ao tentar registrar.");
            }
        } catch (error) {
            console.error('Registro falhou:', error);
            throw error;
        } finally {
            loading.value = false;
        }
    };

    return { register, loading };
}