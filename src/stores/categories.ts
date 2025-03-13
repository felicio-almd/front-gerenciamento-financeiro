import { authenticatedClient } from "@/http/client";
import type { Category } from "@/types/categories";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoriesStore = defineStore('categories', ()=>{
    const categories = ref<Category[]>([])

    const loading = ref(false)

    const getCategories = async () => {
        loading.value = true
        try{
            const response = await authenticatedClient.get<Category[]>('/categories')
            categories.value = response.data
        } catch(error){
            console.error(error);
        } finally {
            loading.value = false
        }
    }

    const newCategory = async (categoryData: Category) => {
        loading.value = true
        try {
            const response = await authenticatedClient.post<Category>('/categories', categoryData)
            categories.value.push(response.data);
        }   catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const updateCategory = async (categoryData: Category) => {
        loading.value = true;
        try {
            const response = await authenticatedClient.put<Category>(`/categories/${categoryData.id}`, categoryData);
            const index = categories.value.findIndex((cat) => cat.id === categoryData.id);
            if (index !== -1) {
                categories.value[index] = response.data;
            }
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    const getCategory = async (id: string) => {
        loading.value = true
        try {
            const response = await authenticatedClient.get<Category>(`/categories/${id}`)
            return response.data
        }   catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    const deleteCategory = async (id: string) => {
        loading.value = true
        try {
            await authenticatedClient.delete<Category>(`/categories/${id}`)
            categories.value = categories.value.filter((cat) => cat.id !== id);
        }   catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    return {categories, getCategories, newCategory, updateCategory, getCategory, deleteCategory}
})