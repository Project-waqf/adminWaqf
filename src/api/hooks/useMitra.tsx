import { APIUrl } from "../../string"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

export default function useMitra() {
    const [mitra, setMitra] = useState<any>()
    const [totalMitra, setTotalMitra] = useState<number>()
    const HOST = APIUrl

    const getMitra = useCallback(async (payload?: any) => {
        try {
            const response = await axios.get(`${HOST}partners?limit=10&offset=${payload.offset}`)
            console.log(response.data)
            setMitra(response.data.data)
            return response
        } catch (error) {
            console.log(error)
        }
    },[])
    const createMitra = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('picture_name', payload.picture_name)
        formData.append('picture', payload.picture || '')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.post(`${HOST}partner`, formData, config)
            const newValue = response.data
            setMitra([...mitra, newValue])
            getMitra()
            return newValue
        } catch (error) {
            console.log(error);
        }
    },[])

    const editedMitra = useCallback(async (payload: any) => {
        const formData = new FormData()
        formData.append('name', payload.name)
        formData.append('picture_name', payload.picture_name)
        formData.append('picture', payload.picture || '')
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                    "Content-Type": "multipart/form-data",
                }
            }
            const response = await axios.put(`${HOST}partner/${payload.id}`, formData, config)
            const updatedValue = response.data
            const updatedMitra = mitra.map((mitra: any) =>
            mitra.id === updatedValue.id ? updatedValue : mitra 
            )
            setMitra(updatedMitra)
            getMitra()
            return updatedValue                
        } catch (error) {
            console.log(error);
        }
    },[])
    const deleteMitra = useCallback(async (payload: any) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                }
            }
            const response = await axios.delete(`${HOST}partner/${payload.id}`, config)
            const deletedValue = response.data
            getMitra()
            console.log(deletedValue);
            return deletedValue           
        } catch (error) {
            console.log(error);
        }

    },[])
    useEffect(() => {
        getMitra()
    },[])
    return {mitra, totalMitra, getMitra, createMitra, editedMitra, deleteMitra}
}

