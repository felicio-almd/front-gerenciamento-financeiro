import { authenticatedClient } from "@/http/client"
import type { Movement } from "@/types/movements"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useMovementsStore = defineStore('movements', ()=>{
    const movements = ref<Movement[]>([])

    const loading = ref(false)

    const getMovements = async () => {
        loading.value = true
        try{
            const response = await authenticatedClient.get<Movement[]>('/movements')
            movements.value = response.data
        } catch(error){
            console.error(error);
        } finally {
            loading.value = false
        }
    }

    const newMovement = async (movementData: Movement) => {
        loading.value = true
        try {
            const response = await authenticatedClient.post<Movement>('/movements', movementData)
            movements.value.push(response.data);
        }   catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const updateMovement = async (movementData: Movement) => {
        loading.value = true;
        try {
            const response = await authenticatedClient.put<Movement>(`/movement/${movementData.id}`, movementData);
            const index = movements.value.findIndex((cat) => cat.id === movementData.id);
            if (index !== -1) {
                movements.value[index] = response.data;
            }
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    }

    const getMovement = async (id: string) => {
        loading.value = true
        try {
            const response = await authenticatedClient.get<Movement>(`/movements/${id}`)
            return response.data
        }   catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const deleteMovement = async (id: string) => {
        loading.value = true
        try {
            await authenticatedClient.delete<Movement>(`/movements/${id}`)
            movements.value = movements.value.filter((mov) => mov.id !== id);
        }  catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    return {movements, getMovements, newMovement, updateMovement, getMovement, deleteMovement}
})