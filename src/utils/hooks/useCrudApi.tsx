import useNews from "../../api/News"
import ConfirmAlert from "../../components/Alert/ConfirmAlert"
import { APIUrl } from "../../string"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export default function useCrudApi() {
    const [news, setNews] = useState<any>()
    const HOST = APIUrl
    const { data: berita, newsErrorLoading: errorloading } = useNews('online', 1)

    console.log('ini berita', news);
    
    const getNews =  useCallback(async () => {
        setNews(berita) 
    },[])
    const createNews = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('title', payload.title)
        formData.append('body', payload.body)
        formData.append('status', 'online')
        formData.append('picture', payload.picture || '')
        try {
            const response = await ConfirmAlert('upload')
            if (response.isConfirmed) {
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
            }
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
            const response = await ConfirmAlert('edit')
            if (response.isConfirmed) {
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
            }
        } catch (error) {
            console.log(error);
        }
    },[])

    useEffect(() => {
        if (news === undefined) {
            getNews()
        }
    }, [])
    
    return { getNews, createNews, news, editedNews }
}