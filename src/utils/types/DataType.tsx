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
    name: string
    email: string
    password: string
    old_password: string
    new_password: string
    re_password: string
}

export interface ListType {
    id: number
    title?: string
    body?: string
    tanggal?: string
    category?: string
    picture?: File | null
    name?: string
    detail?: string
    status?: string | boolean
    due_date?: string
    fund_target?: any
    collected?: any
}
export interface NewsType {
    id?: number
    title: string;
    body: string;
    picture?: File | null | any
}
export interface AssetType {
    id?: number
    name: string
    detail: string
    picture?: File | null
}
export interface WakafType {
    id?: number
    title: string
    category: string
    picture?: File | null
    detail: string
    due_date: any
    fund_target: any
    collected?: any
}
export interface DashboardType {
    id: number
    icon: string
    header: string
    count: number | string
}

export interface AllDataType{
    id?: number
    id_news?: number
    id_wakaf?: number
    title: string
    name?: string
    body?: string
    detail?: string
    due_date?: any
    collected?: number
    fund_target?: number
    status?: string
}
export interface DataDashboard{
    data: DashboardType[]
}
export interface MitraType{
    name: string
    link: string
    picture: File | null
}
export interface AdminType{
    name: string
    email: string
    old_password: string
    new_password: string
    re_password: string
}