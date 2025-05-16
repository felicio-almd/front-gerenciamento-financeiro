import { authClient } from "@/http/client";
import { useAuthStore } from "@/stores/auth";
import type { AuthOptions } from "@/types/auth";
import { ref, watchEffect, type Ref } from "vue";

interface UserOptions {
    data: Ref<AuthOptions | undefined>
}

export function useLogin({ data: dataRef }: UserOptions) {
    const user = ref<{ name: string; email: string } | null>(null);
    const loading = ref(false);
    const data = ref<AuthOptions>()
    const error = ref<string | null>(null);

    const { setIsLogged, setUser } = useAuthStore();

    const login = async () => {
        loading.value = true;
        error.value = null;
        try {
            // await authClient.get('/sanctum/csrf-cookie');
            const response = await authClient.post('/api/login', {
                email: data.value?.email,
                password: data.value?.password,
            });

            console.log('Login response:', response);

            if (response.status === 200) {
                if (response.data.access_token) {
                    localStorage.setItem('access_token', response.data.access_token);
                }

                setUser({
                    name: response.data.name,
                    email: response.data.email,
                });

                setIsLogged(true);

                return response.data;
            } else {
                throw new Error("Credenciais inválidas ou erro no servidor.");
            }
        } catch (err: any) {
            console.error('Login falhou:', err);
            error.value = err.response?.data?.message ||
                "Erro ao fazer login. Verifique suas credenciais e tente novamente.";
            throw err;
        } finally {
            loading.value = false;
        }
    };

    watchEffect(() => {
        if (!dataRef.value) return
        data.value = dataRef.value
    })

    return { login, loading, user }
}