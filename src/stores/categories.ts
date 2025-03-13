import { authenticatedClient } from "@/http/client";
import type { Category } from "@/types/categories";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoriesStore = defineStore('categories', ()=>{
    const categories = ref<Category[]>([])
    const error = ref<string | null>(null)
    const loading = ref(false)

    const getCategories = async () => {
        loading.value = true
        error.value = null
        try{
            const response = await authenticatedClient.get<Category[]>('/categories')
            categories.value = response.data
        } catch (err) {
            error.value = "Erro ao carregar categorias. Tente novamente mais tarde.";
            console.error(err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const newCategory = async (categoryData: Category) => {
        loading.value = true
        error.value = null
        try {
            const response = await authenticatedClient.post<Category>('/categories', categoryData)
            categories.value.push(response.data);
        }   catch (err) {
            error.value = "Erro ao criar categoria. Verifique os dados e tente novamente.";
            console.error("Erro ao criar categoria:", err);
            throw err;
        } finally {
            loading.value = false
        }
    }

    const updateCategory = async (categoryData: Category) => {
        loading.value = true;
        error.value = null
        try {
            const response = await authenticatedClient.put<Category>(`/categories/${categoryData.id}`, categoryData);
            const index = categories.value.findIndex((cat) => cat.id === categoryData.id);
            if (index !== -1) {
                categories.value[index] = response.data;
            }
        } catch (err) {
            error.value = "Erro ao atualizar categoria. Verifique os dados e tente novamente.";
            console.error("Erro ao atualizar categoria:", err);
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const getCategory = async (id: string) => {
        loading.value = true
        error.value = null
        try {
            const response = await authenticatedClient.get<Category>(`/categories/${id}`)
            return response.data
        }   catch (err) {
            error.value = "Erro ao carregar categoria. Verifique o ID e tente novamente.";
            console.error("Erro ao carregar categoria:", err);
            throw err;
        } finally {
            loading.value = false
        }
    }

    const deleteCategory = async (id: string) => {
        loading.value = true
        error.value = null
        try {
            await authenticatedClient.delete<Category>(`/categories/${id}`)
            categories.value = categories.value.filter((cat) => cat.id !== id);
        }   catch (err) {
            error.value = "Erro ao excluir categoria. Tente novamente mais tarde.";
            console.error("Erro ao excluir categoria:", err);
            throw err;
        } finally {
            loading.value = false
        }
    }

    return {categories, loading, error, getCategories, newCategory, updateCategory, getCategory, deleteCategory}
})