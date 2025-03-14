import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', ()=>{
    const isLogged = ref(false)
    const user = ref<{ name: string; email: string } | null>(null); // Dados do usuário

    function setIsLogged (status: boolean) {
        isLogged.value = status
    }

    function setUser(userData: { name: string; email: string } | null) {
        user.value = userData;
    }
  
    function clearUser() {
        user.value = null;
        isLogged.value = false;
    }
  
    return { isLogged, user, setIsLogged, setUser, clearUser };
},{
    persist: true,
  },
) 