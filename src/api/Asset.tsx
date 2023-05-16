import axios from "axios";
import useSWR  from "swr";
import { immutable } from "swr/immutable";
import { APIUrl } from "../string";

export const useAsset = (status: string) => {
    const URL = `${APIUrl}asset?status=${status}`
    const fetcher = async (url: string) => axios.get(url).then((res)=> res.data)
    const { data, mutate, error: assetErrorLoading } = useSWR(URL, fetcher, { use: [immutable]})
    const assetLoading = !data && !assetErrorLoading
    return {
        assetErrorLoading,
        assetLoading,
        data: data?.data,
        mutate
    }
}

export default useAsset