import { APIUrl } from "../../string"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export default function useAsset() {
    const [asset, setAsset] = useState<any>()
    const [totalOnlineAsset, setTotalOnlineAsset] = useState<number>(0)
    const [totalDraftAsset, setTotalDraftAsset] = useState<number>(0)
    const [totalArchiveAsset, setTotalArchiveAsset] = useState<number>(0)
    const [totalAsset, setTotalAsset] = useState<number>(0)
    const HOST = APIUrl
    useEffect(() => {
        setTotalAsset(totalOnlineAsset + totalArchiveAsset + totalDraftAsset)
    }, [totalArchiveAsset, totalDraftAsset, totalOnlineAsset])
    const getAsset = useCallback(async (payload?: any) => {
        try {
            const response = await axios.get(`${HOST}asset?status=${payload.status}&page=${payload.page}`)
            console.log(response.data)
            setAsset(response.data.data)
            setTotalOnlineAsset(response.data.total_online)
            setTotalDraftAsset(response.data.total_draft)
            setTotalArchiveAsset(response.data.total_archive)
        } catch (error) {
            console.log(error)
        }
    },[])
    const createAsset = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('detail', payload.detail)
        formData.append('status', 'online')
        formData.append('picture', payload.picture || '')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.post(`${HOST}admin/asset`, formData, config)
            const newValue = response.data
            setAsset([...asset, newValue])
            return newValue
        } catch (error) {
            console.log(error);
        }
    },[])

    const editedAsset = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('detail', payload.detail)
        formData.append('status', 'online')
        formData.append('picture', payload.picture || '')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.put(`${HOST}admin/asset/${payload.id}`, formData, config)
            const updatedValue = response.data
            const updatedAsset = asset.map((Asset: any) =>
            asset.id === updatedValue.id ? updatedValue : Asset 
            )
            setAsset(updatedAsset)
            return updatedValue                
        } catch (error) {
            console.log(error);
        }
    },[])

    const draftAsset = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('detail', payload.detail)
        formData.append('status', 'draft')
        formData.append('picture', payload.picture || '')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.post(`${HOST}admin/asset`, formData, config)
            const newValue = response.data
            setAsset([...asset, newValue])
            return newValue
        } catch (error) {
            console.log(error);
        }
    },[])

    const archiveAsset = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('status', 'archive')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.put(`${HOST}admin/asset/${payload.id}`, formData, config)
            const updatedValue = response.data
            const updatedAsset = asset.map((Asset: any) =>
            asset.id === updatedValue.id ? updatedValue : Asset 
            )
            setAsset(updatedAsset)
            return updatedValue                
        } catch (error) {
            console.log(error);
        }
    },[])

    const deleteAsset = useCallback(async (payload: any) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                }
            }
            const response = await axios.delete(`${HOST}admin/asset/${payload.id}`, config)
            const deletedValue = response.data
            return deletedValue           
        } catch (error) {
            console.log(error);
        }
    },[])
    
    useEffect(() => {
        getAsset()
    }, [])
    return {asset, totalAsset, totalArchiveAsset, totalDraftAsset, totalOnlineAsset, getAsset, createAsset, editedAsset, draftAsset, archiveAsset, deleteAsset}
}