import type { AuthOptions } from "./auth"
import type { Category } from "./categories"

export interface Movement {
    id: string
    type: string
    value: number
    category_id: string
    category?: Category
    user_id: string
    user?: AuthOptions
    description: string
    created_at: string
    updated_at: string
}

export interface CreateMovementRequest {
    type: string;
    value: number;
    category_id: string;
    description: string;
}

export interface UpdateMovementRequest {
    id: string;
    type: string;
    value: number;
    category_id: string;
    description: string;
}

export interface MovementFormData {
    id: string;
    type: string;
    value: string;
    category_id: string;
    description: string;
}

export interface ValidationError {
    response?: {
        data?: {
            errors?: {
                type?: string[];
                value?: string[];
                category_id?: string[];
                description?: string[];
                [key: string]: string[] | undefined;
            };
        };
    };
}