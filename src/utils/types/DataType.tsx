export interface LoginType { 
    email?: string
    password?: string
}
export interface AlertModalState {
    open: boolean;
    loading: boolean;
    label: string;
}