export interface AuthResponse{
    access_token: string
    token_type: string
}

export interface AuthOptions {
    email: string
    password: string
}