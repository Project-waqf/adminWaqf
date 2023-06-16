import { WakafType } from "@/utils/types/DataType"
import Alert from "../../components/Alert/Alert"
import { APIUrl } from "../../string"

import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export default function useWakaf(){
    const [wakaf, setWakaf] = useState<any>()
    const [allWakaf, setAllWakaf] = useState<WakafType[]>()
    const [totalOnlineWakaf, setTotalOnlineWakaf] = useState<number>(0)
    const [totalDraftWakaf, setTotalDraftWakaf] = useState<number>(0)
    const [totalArchiveWakaf, setTotalArchiveWakaf] = useState<number>(0)
    const [totalWakaf, setTotalWakaf] = useState<number>()
    const HOST = APIUrl


    const getAllWakaf = useCallback(async () => {
        try {
            const response = await axios.get(`${HOST}wakaf?isUser=false`)
            console.log(response.data);
            setAllWakaf(response.data.data)
            return response
        } catch (error) {
            console.log(error);
        } 
    },[])
    const getWakaf = useCallback(async (payload?:any) => {
        const withFilter = `wakaf?filter=${payload.filter}&sort=${payload.sort}`
        const noneFilter = `wakaf?page=${payload.page}&isUser=false&sort=${payload.sort}&status=${payload.status}`
        if (payload.filter === '') {
            
        }
        try {
            const response = await axios.get(`${HOST}${payload.filter === "" ? noneFilter : withFilter}` )
            console.log(response.data);
            setWakaf(response.data.data)
            setTotalOnlineWakaf(response.data.total_online)
            setTotalDraftWakaf(response.data.total_draft)
            setTotalArchiveWakaf(response.data.total_archive)
            return response
        } catch (error) {
            console.log(error);
        } 
    },[])
    const createWakaf = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('title', payload.title)
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
            Alert('upload')
            setWakaf([...wakaf, newValue])
            return newValue
        } catch (error) {
            Alert("fail")

        }
    },[])

    const editedWakaf = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('title', payload.title)
        formData.append('category', payload.category)
        formData.append('detail', payload.detail)
        formData.append('due_date', payload.due_date)
        formData.append('fund_target', payload.fund_target)
        formData.append('picture', payload.picture || '')
        formData.append('status', payload.status ? payload.status : 'online')
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
            Alert('edit')
            return updatedValue                
        } catch (error) {
            Alert("fail")
            console.log(error);
        }
    },[])

    const draftWakaf = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('title', payload.title)
        formData.append('category', payload.category)
        formData.append('detail', payload.detail ? payload.category : '')
        formData.append('due_date', typeof payload.due_date === 'string' || payload.due_date ? payload.due_date : '')
        formData.append('fund_target', payload.fund_target ? payload.fund_target : 0)
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
            Alert("fail")
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
            Alert("fail")

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
            Alert('delete')
            return deletedValue           
        } catch (error) {
            Alert("fail")
            console.log(error);
        }
    },[])

    useEffect(() => {
        getWakaf()
    },[])
    useEffect(() => {
        getAllWakaf()
    },[])
    return {allWakaf, wakaf, totalArchiveWakaf, totalDraftWakaf, totalOnlineWakaf, totalWakaf, getWakaf, createWakaf, editedWakaf, draftWakaf, archiveWakaf, deleteWakaf}
}
