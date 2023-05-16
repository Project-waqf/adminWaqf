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

export interface ListType {
    id: number
    title?: string
    body?: string
    tanggal?: string
    picture?: File | null
    name?: string
    detail?: string
    status?: string | boolean
    date?: string
}
export interface NewsType {
    title: string;
    body: string;
    picture: File | null | any
}
export interface AssetType {
    name: string
    detail: string
    picture: File | null
}