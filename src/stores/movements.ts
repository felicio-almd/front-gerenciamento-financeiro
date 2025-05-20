import { authenticatedClient } from "@/http/client";
import type { CreateMovementRequest, Movement, UpdateMovementRequest } from "@/types/movements";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMovementsStore = defineStore('movements', () => {
    const movements = ref<Movement[]>([]);
    const error = ref<string | null>(null);
    const loading = ref(false);

    const getMovements = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await authenticatedClient.get<Movement[]>('/movements');
            movements.value = response.data;
        } catch (err) {
            error.value = "Erro ao carregar Movimentações. Tente novamente mais tarde.";
            console.error(err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const newMovement = async (movementData: CreateMovementRequest): Promise<Movement> => {
        loading.value = true;
        error.value = null;
        try {
            const response = await authenticatedClient.post<Movement>('/movements', movementData);
            movements.value.push(response.data);
            return response.data;
        } catch (err) {
            error.value = "Erro ao criar Movimentação. Tente novamente mais tarde.";
            console.error(err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const updateMovement = async (movementData: UpdateMovementRequest): Promise<Movement> => {
        loading.value = true;
        error.value = null;
        try {
            const response = await authenticatedClient.put<Movement>(`/movements/${movementData.id}`, movementData);
            const index = movements.value.findIndex((mov) => mov.id === movementData.id);
            if (index !== -1) {
                movements.value[index] = response.data;
            }
            return response.data;
        } catch (err) {
            error.value = "Erro ao atualizar Movimentação. Tente novamente mais tarde.";
            console.error(err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const getMovement = async (id: string) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await authenticatedClient.get<Movement>(`/movements/${id}`);
            return response.data;
        } catch (err) {
            error.value = "Erro ao carregar Movimentação. Tente novamente mais tarde.";
            console.error(err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const deleteMovement = async (id: string) => {
        loading.value = true;
        error.value = null;
        try {
            await authenticatedClient.delete<Movement>(`/movements/${id}`);
            movements.value = movements.value.filter((mov) => mov.id !== id);
        } catch (err) {
            error.value = "Erro ao deletar Movimentação. Tente novamente mais tarde.";
            console.error(err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        movements,
        error,
        loading,
        getMovements,
        newMovement,
        updateMovement,
        getMovement,
        deleteMovement,
    };
});