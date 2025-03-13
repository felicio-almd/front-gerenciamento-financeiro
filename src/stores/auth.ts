import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', ()=>{
    const isLogged = ref(false)

    function setIsLogged (status: boolean) {
        isLogged.value = status
    }
    

    return {isLogged, setIsLogged}
},{
    persist: true,
  },
) 