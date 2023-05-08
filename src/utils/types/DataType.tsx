export type LoginType = { 
    email?: string
    password?: string
}
export interface AlertModalState {
    open: boolean;
    loading: boolean;
    label: string;
}

export interface ProfileType {
    foto: string
    name: string
    email: string
    password: string
}