import axios from "axios";
import useSWR  from "swr";
import { immutable } from "swr/immutable";
import { APIUrl } from "../string";


export const useNews = (status: string, page: number) => {
    const URL = `${APIUrl}news?status=${status}&page=${page}`
    const fetcher = async (url: string) => axios.get(url).then((res)=> res.data)
    const { data, mutate, error: newsErrorLoading } = useSWR(URL, fetcher, { use: [immutable]})
    const newsLoading = !data && !newsErrorLoading
    return {
        newsErrorLoading,
        newsLoading,
        data: data?.data,
        mutate
    }
}

export default useNews