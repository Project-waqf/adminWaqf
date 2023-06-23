import Alert from "../../components/Alert/Alert"
import { APIUrl } from "../../string"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export default function useAsset() {
    const [asset, setAsset] = useState<any>()
    const [allAsset, setAllAsset] = useState<any>()
    const [totalOnlineAsset, setTotalOnlineAsset] = useState<number>(0)
    const [totalAllAsset, setTotalAllAsset] = useState<number>(0)
    const [totalDraftAsset, setTotalDraftAsset] = useState<number>(0)
    const [totalArchiveAsset, setTotalArchiveAsset] = useState<number>(0)
    const [totalAsset, setTotalAsset] = useState<number>(0)
    const HOST = APIUrl
    useEffect(() => {
        setTotalAsset(totalOnlineAsset + totalArchiveAsset + totalDraftAsset)
    }, [totalArchiveAsset, totalDraftAsset, totalOnlineAsset])

    const getAllAsset = useCallback(async () => {
        try {
            const response = await axios.get(`${HOST}asset`)
            setAllAsset(response.data.data)
            setTotalAllAsset(response.data.data.length - 1)
        } catch (error) {}
    },[])
    const getAsset = useCallback(async (payload?: any) => {
        try {
            const response = await axios.get(`${HOST}asset?status=${payload.status}&page=${payload.page}&sort=${payload.sort}`)
            setAsset(response.data.data)
            setTotalOnlineAsset(response.data.total_online)
            setTotalDraftAsset(response.data.total_draft)
            setTotalArchiveAsset(response.data.total_archive)
        } catch (error) {}
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
            Alert('upload')
            return newValue
        } catch (error) {
            Alert('fail')
        }
    },[])

    const editedAsset = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('detail', payload.detail)
        formData.append('status', payload.status ? payload.status : 'online')
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
            Alert('edit')
            return updatedValue                
        } catch (error) {
            Alert('fail')
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
            Alert('draft')
            return newValue
        } catch (error) {
            Alert('fail')
        }
    },[])

    const archiveAsset = useCallback(async (payload: any) => {
        const body = {status: 'archive'}
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.put(`${HOST}admin/asset/${payload.id}`, body, config)
            const updatedValue = response.data
            const updatedAsset = asset.map((Asset: any) =>
            asset.id === updatedValue.id ? updatedValue : Asset 
            )
            setAsset(updatedAsset)
            Alert('archive')
            return updatedValue                
        } catch (error) {
            Alert('fail')
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
            Alert('delete')
            return deletedValue           
        } catch (error) {
            Alert('fail')
        }
    },[])
    
    useEffect(() => {
        getAsset()
    }, [])
    useEffect(() => {
        getAllAsset()
    }, [])
    return {allAsset, totalAllAsset, getAllAsset, asset, totalAsset, totalArchiveAsset, totalDraftAsset, totalOnlineAsset, getAsset, createAsset, editedAsset, draftAsset, archiveAsset, deleteAsset}
}