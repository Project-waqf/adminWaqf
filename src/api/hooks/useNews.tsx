import { APIUrl } from "../../string"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export default function useNews() {
    const [news, setNews] = useState<any>()
    const [totalOnlineNews, setTotalOnlineNews] = useState<number>(0)
    const [totalDraftNews, setTotalDraftNews] = useState<number>(0)
    const [totalArchiveNews, setTotalArchiveNews] = useState<number>(0)
    const [totalNews, setTotalNews] = useState<number>()
    const HOST = APIUrl
    
    useEffect(() => {
        setTotalNews(totalOnlineNews + totalArchiveNews + totalDraftNews)
    }, [totalArchiveNews, totalDraftNews, totalOnlineNews])
    

    const getNews = useCallback(async (payload?: any) => {
        try {
            const response = await axios.get(`${HOST}news?status=${payload.status}&page=${payload.page}`)
            console.log(response.data)
            setNews(response.data.data)
            setTotalOnlineNews(response.data.total_online)
            setTotalDraftNews(response.data.total_draft)
            setTotalArchiveNews(response.data.total_archive)
            return response
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
    return{ news, totalOnlineNews, totalArchiveNews, totalDraftNews, totalNews, createNews, getNews, editedNews, draftNews, archiveNews, deleteNews}
}