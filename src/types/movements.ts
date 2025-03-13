import type { Category } from "./categories"

export interface Movement{
    id: string
    type: string
    category_id: string
    category?: Category
    description: string
    created_at: string
    updated_at: string
}
