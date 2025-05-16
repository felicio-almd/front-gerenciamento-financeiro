import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const isLogged = ref<boolean>(!!localStorage.getItem('access_token'));
    const user = ref<{ name: string; email: string } | null>(null); // Dados do usuário

    try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            user.value = JSON.parse(savedUser);
        }
    } catch (error) {
        console.error('Erro ao recuperar usuário do localStorage:', error);
        localStorage.removeItem('user');
    }


    function setIsLogged(status: boolean) {
        isLogged.value = status
    }

    function setUser(userData: { name: string; email: string } | null) {
        user.value = userData;
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
        } else {
            localStorage.removeItem('user');
        }
    }

    function clearUser() {
        user.value = null;
        isLogged.value = false;
    }

    return { isLogged, user, setIsLogged, setUser, clearUser };
}, {
    persist: true,
},
) 