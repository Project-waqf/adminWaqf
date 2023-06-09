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
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-[16px] text-neutral-80 bg-white border">
                    <tr>
                        <th scope="col" className="px-6 py-3 flex items-center w-44">
                            Tanggal
                        </th>
                        <th scope="col" className="px-6 py-3 w-[1000px]">
                            Judul
                        </th>
                        {/* <th scope="col" className="py-3">
                            Alat
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                { data ?
                    data?.map((item:any)=>{
                    return(
                    <tr key={item.id} className="bg-white cursor-pointer" onClick={()=> handleDetail && handleDetail(item.id || item.id_news || item.id_asset, item.type)}>
                        <th scope="row" className="px-6 py-4 w-44">
                        <Typography color='text01' variant='body2' type='semibold'>
                            {item.created_at}
                        </Typography>
                        </th>
                        <td className="px-6 py-4 w-[1000px]">
                            <Typography color='text01' variant='body2' type='semibold' >
                            {item.title}
                            </Typography>
                        </td>
                    </tr>
                    )
                    })
                :
                <div className="flex justify-center w-[1000px]">
                    <Typography color='text01' variant='h1' type='bold'>
                    Data Kosong
                    </Typography>
                </div>
                }
            </tbody>
        </table>
    </div>
    )
};

export default SearchTable;