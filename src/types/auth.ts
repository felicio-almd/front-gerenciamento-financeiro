export interface AuthResponse{
    access_token: string
    token_type: string
}

export interface AuthOptions {
    name: string
    email: string
    password: string
}