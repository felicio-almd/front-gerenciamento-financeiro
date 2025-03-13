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

    // function newCategory () {

    // }

    // function updateCategory () {

    // }

    // function getCategory () {
        
    // }

    // function deleteCategory () {
        
    // }

    return {categories, getCategories}
})