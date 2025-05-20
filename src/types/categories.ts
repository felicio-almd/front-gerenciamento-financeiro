export interface Category {
    id: string
    name: string
    created_at?: string
    updated_at?: string
}

export interface CreateCategoryRequest {
    name: string;
}

export interface UpdateCategoryRequest {
    id: string;
    name: string;
}

export interface ValidationError {
    response?: {
        data?: {
            errors?: {
                name?: string[];
                [key: string]: string[] | undefined;
            };
        };
    };
}