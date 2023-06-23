import Alert from "../../components/Alert/Alert"
import { APIUrl } from "../../string"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export default function useNews() {
    const [news, setNews] = useState<any>()
    const [allNews, setAllNews] = useState<any>()
    const [totalOnlineNews, setTotalOnlineNews] = useState<number>(0)
    const [totalDraftNews, setTotalDraftNews] = useState<number>(0)
    const [totalArchiveNews, setTotalArchiveNews] = useState<number>(0)
    const [totalNews, setTotalNews] = useState<number>()
    const [totalAllNews, setTotalAllNews] = useState<number>()
    const HOST = APIUrl
    
    useEffect(() => {
        setTotalNews(totalOnlineNews + totalArchiveNews + totalDraftNews)
    }, [totalArchiveNews, totalDraftNews, totalOnlineNews])
    
    const getAllNews = useCallback(async () => {
        try {
            const response = await axios.get(`${HOST}news?status=&page=`)
            setAllNews(response.data.data)
            setTotalAllNews(response.data.data.length - 1)
            return response
        } catch (error) {}
    },[])

    const getNews = useCallback(async (payload?: any) => {
        try {
            const response = await axios.get(`${HOST}news?status=${payload.status}&page=${payload.page}&sort=${payload.sort}`)
            setNews(response.data.data)
            setTotalOnlineNews(response.data.total_online)
            setTotalDraftNews(response.data.total_draft)
            setTotalArchiveNews(response.data.total_archive)
            return response
        } catch (error) {}
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
            Alert('upload')
            return newValue
        } catch (error) {
            Alert('fail')
        }
    },[])

    const editedNews = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('title', payload.title)
        formData.append('body', payload.body)
        formData.append('status', payload.status ? payload.status : 'online')
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
            Alert('edit')
            getNews()
            return updatedValue                
        } catch (error) {
            Alert('fail')
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
            Alert('draft')
            getNews()
            return newValue
        } catch (error) {
            Alert('fail')
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
            Alert('archive')
            return newValue
        } catch (error) {
            Alert('fail')
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
            Alert('delete')
            return deletedValue           
        } catch (error) {
            Alert('fail')
        }

    },[])

    useEffect(() => {
        getNews()
    }, [])
    useEffect(() => {
        getAllNews()
    }, [])
    return{ news, allNews, totalAllNews, getAllNews, totalOnlineNews, totalArchiveNews, totalDraftNews, totalNews, createNews, getNews, editedNews, draftNews, archiveNews, deleteNews}
}