import { APIUrl } from "../../string"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export default function useCrudApi() {
    const [news, setNews] = useState<any>()
    const [asset, setAsset] = useState<any>()
    const [wakaf, setWakaf] = useState<any>()
    const HOST = APIUrl
    

    const getNews = useCallback(async (payload?: any) => {
        try {
            const response = await axios.get(`${HOST}news?status=${payload.status}&page=${payload.page}`)
            console.log(response.data)
            setNews(response.data.data)
        } catch (error) {
            console.log(error)
        }
    },[])

    const createNews = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('title', payload.title)
        formData.append('body', payload.body)
        formData.append('status', 'online')
        formData.append('picture', payload.picture || '')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.post(`${HOST}admin/news`, formData, config)
            const newValue = response.data
            setNews([...news, newValue])
            getNews()
            return newValue
        } catch (error) {
            console.log(error);
        }
    },[])

    const editedNews = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('title', payload.title)
        formData.append('body', payload.body)
        formData.append('status', 'online')
        formData.append('picture', payload.picture || '')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.put(`${HOST}admin/news/${payload.id}`, formData, config)
            const updatedValue = response.data
            const updatedNews = news.map((news: any) =>
            news.id === updatedValue.id ? updatedValue : news 
            )
            setNews(updatedNews)
            getNews()
            return updatedValue                
        } catch (error) {
            console.log(error);
        }
    },[])

    const draftNews = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('title', payload.title)
        formData.append('body', payload.body)
        formData.append('status', 'draft')
        formData.append('picture', payload.picture || '')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.post(`${HOST}admin/news`, formData, config)
            const newValue = response.data
            setNews([...news, newValue])
            getNews()
            return newValue
        } catch (error) {
            console.log(error);
        }
    },[])

    const archiveNews = useCallback(async (payload: any) => {
        const body = {status: 'archive'}
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.put(`${HOST}admin/news/${payload.id}`, body, config)
            const newValue = response.data
            setNews([...news, newValue])
            getNews()
            return newValue
        } catch (error) {
            console.log(error);
        }
    },[])

    const deleteNews = useCallback(async (payload: any) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                }
            }
            const response = await axios.delete(`${HOST}admin/news/${payload.id}`, config)
            const deletedValue = response.data
            getNews()
            console.log(deletedValue);
            return deletedValue           
        } catch (error) {
            console.log(error);
        }

    },[])

    useEffect(() => {
        getNews()
    }, [])

    const getAsset = useCallback(async (payload?: any) => {
        try {
            const response = await axios.get(`${HOST}asset?status=${payload.status}&page=${payload.page}`)
            console.log(response.data)
            setAsset(response.data.data)
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

    const getWakaf = useCallback(async (payload?:any) => {
        try {
            const response = await axios.get(`${HOST}wakaf?page=${payload.page}&isUser=false&status=${payload.status}`)
            console.log(response.data);
            setWakaf(response.data.data)
            return response
        } catch (error) {
            console.log(error);
        } 
    },[])
    const createWakaf = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('title', payload.name)
        formData.append('category', payload.category)
        formData.append('detail', payload.detail)
        formData.append('due_date', payload.due_date)
        formData.append('fund_target', payload.fund_target)
        formData.append('picture', payload.picture || '')
        formData.append('status', 'online')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.post(`${HOST}admin/wakaf`, formData, config)
            const newValue = response.data
            setWakaf([...wakaf, newValue])
            return newValue
        } catch (error) {
            console.log(error);
        }
    },[])

    const editedWakaf = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('title', payload.name)
        formData.append('category', payload.category)
        formData.append('detail', payload.detail)
        formData.append('due_date', payload.due_date)
        formData.append('fund_target', payload.fund_target)
        formData.append('picture', payload.picture || '')
        formData.append('status', 'online')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.put(`${HOST}admin/wakaf/${payload.id}`, formData, config)
            const updatedValue = response.data
            const updatedWakaf = wakaf.map((Asset: any) =>
            wakaf.id === updatedValue.id ? updatedValue : Asset 
            )
            setWakaf(updatedWakaf)
            return updatedValue                
        } catch (error) {
            console.log(error);
        }
    },[])

    const draftWakaf = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('title', payload.name)
        formData.append('category', payload.category)
        formData.append('detail', payload.detail)
        formData.append('due_date', payload.due_date)
        formData.append('fund_target', payload.fund_target)
        formData.append('picture', payload.picture || '')
        formData.append('status', 'draft')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.post(`${HOST}admin/wakaf`, formData, config)
            const newValue = response.data
            setWakaf([...wakaf, newValue])
            return newValue
        } catch (error) {
            console.log(error);
        }
    },[])

    const archiveWakaf = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('status', 'archive')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.put(`${HOST}admin/wakaf/${payload.id}`, formData, config)
            const updatedValue = response.data
            const updatedWakaf = wakaf.map((Asset: any) =>
            wakaf.id === updatedValue.id ? updatedValue : Asset 
            )
            setWakaf(updatedWakaf)
            return updatedValue                
        } catch (error) {
            console.log(error);
        }
    },[])

    const deleteWakaf = useCallback(async (payload: any) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                }
            }
            const response = await axios.delete(`${HOST}admin/wakaf/${payload.id}`, config)
            const deletedValue = response.data
            return deletedValue           
        } catch (error) {
            console.log(error);
        }
    },[])

    useEffect(() => {
        getWakaf()
    },[])
    return { news, createNews, editedNews, deleteNews, getNews, draftNews, archiveNews, asset, getAsset, createAsset, editedAsset, deleteAsset, draftAsset, archiveAsset, wakaf, getWakaf }
}