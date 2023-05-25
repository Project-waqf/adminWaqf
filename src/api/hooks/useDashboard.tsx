import { DashboardType, DataDashboard } from "@/utils/types/DataType";
import assetIcon from "../../assets/Group 26958.svg";
import aktifIcon from "../../assets/Group 26957 (2).svg";
import succesIcon from "../../assets/Group 26957.svg";
import { useEffect, useState } from "react"
import useAsset from "./useAsset";
import useWakaf from "./useWakaf";
import useNews from "./useNews";

export default function useDashboard() {
    const [dashboardData, setDashboardData] = useState<DataDashboard>({
        data: [],
    });
    const {totalOnlineAsset, totalAsset, getAsset} = useAsset()
    const {totalOnlineWakaf, totalWakaf, getWakaf} = useWakaf()
    const {totalOnlineNews, totalNews} = useNews()

    useEffect(() => {
        getAsset()
        getWakaf()
        const initialData: DashboardType[] = [
            {
                id: 1,
                icon: aktifIcon,
                header: 'Wakaf Aktif',
                count: totalOnlineWakaf,
            },
            {
                id: 2,
                icon: succesIcon,
                header: 'Wakaf Selesai',
                count: 'N/A',
            },
            {
                id: 2,
                icon: assetIcon,
                header: 'Jumlah Asset',
                count: totalAsset,
            },
          // Add more objects as needed
        ];
    
        setDashboardData({ data: initialData });
    }, [totalAsset, totalOnlineWakaf]);
    return{dashboardData}
}