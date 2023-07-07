import { AllDataType, ListType } from '../../utils/types/DataType';
import Typography from '../Typography';
import edit from "../../assets/edit.svg";
import delet from "../../assets/delete.svg";
import send from "../../assets/send.svg";
import archive from "../../assets/archive.svg";
import { type } from 'os';

interface TableProps {
    data: AllDataType[]
    handleDetail?: (id: number, type:string) => void;
    draft?: boolean
    archives?: boolean
    mitra?: boolean
}


const SearchTable: React.FC<TableProps> = ({ draft, archives, mitra, data, handleDetail}) => {
    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
        <div className="absolute top-3 border-solid border-b-2 border-x-0 border-t-0 border-b-neutral-60 w-full h-10"></div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-[16px] text-neutral-80 bg-white border">
                    <tr>
                        <th scope="col" className="px-6 py-3 flex font-normal items-center w-32">
                            Tanggal
                        </th>
                        <th scope="col" className="px-2 py-3 font-normal items-center w-[200px]">
                            Jenis
                        </th>
                        <th scope="col" className="px-2 py-3 font-normal w-[1000px]">
                            Judul
                        </th>
                    </tr>
                </thead>
                <tbody>
                { data.length > 0 ?
                    data?.map((item:any)=>{
                    return(
                    <tr key={item.id} className="bg-white cursor-pointer" onClick={()=> handleDetail && handleDetail(item.id || item.id_news || item.id_asset, item.type)}>
                        <th scope="row" className="px-2 py-4 w-32">
                        <Typography color='text03' variant='body2' type='semibold'>
                            {item.created_at}
                        </Typography>
                        </th>
                        <th scope="row" className="px-2 py-4 w-[300px]">
                        <Typography color='test03' variant='body2' type='semibold'>
                            {item.type === "wakaf" ? "Produk Wakaf" : item.type === "news" ? "Berita" : item.type === "asset" ? "Aset" : ""} / { item.is_complete ? 'Complete' : item.is_complete === false && item.due_date === 0 ? "Not Completed" : item.status}
                        </Typography>
                        </th>
                        <td className="px-2 py-4 w-[1000px]">
                            <Typography color='text01' variant='body2' type='semibold' >
                            {item.title}
                            </Typography>
                        </td>
                    </tr>
                    )
                    })
                :
                <tr>
                <td className=""></td>
                <td className=""></td>
                <td className="flex justify-start">
                <Typography color='text03' variant='body3' type='bold'>
                Data Kosong
                </Typography>
                </td>
                </tr>
                }
            </tbody>
        </table>
    </div>
    )
};

export default SearchTable;