import { WakafType } from '../../utils/types/DataType';
import Typography from '../Typography';
import edit from "../../assets/edit.svg";
import delet from "../../assets/delete.svg";
import archive from "../../assets/archive.svg";
import { DownOutlined } from '@ant-design/icons';
import send from "../../assets/send.svg";

interface TableProps {
    data: WakafType[]
    handleEdit?: (id: number) => void;
    handleDelete?: (id: number) => void;
    handleArchive?: (id: number) => void;
    handleSort?: React.MouseEventHandler
    draft?: boolean
    archives?: boolean
    dashboard?: boolean
    isSort?: boolean
}


const WakafTable: React.FC<TableProps> = ({ dashboard, archives, draft, data, handleDelete, handleArchive, handleEdit, handleSort, isSort}) => {
    function convertToRupiah(amount: number): string {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        });    
        return formatter.format(amount).replace('IDR', 'Rp');
    }
    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-[14px] text-neutral-80 bg-white">
                <tr className=' border border-b-2'>
                    <th scope="col" className="px-6 py-3 w-30 flex justify-between">
                        Tanggal
                        <div onClick={handleSort} className='transition-all ml-2 cursor-pointer'>
                            <DownOutlined rotate={isSort ? 180 : 0} className='mt-1 text-btnColor transition-all'/>
                        </div>
                    </th>
                    <th scope="col" className={`px-2 py-3 ${draft || archive ? 'lg:w-[550px] xl:w-[780px]' : 'lg:w-[347px] xl:w-[600px]'}`}>
                        Judul
                    </th>
                    <th scope="col" className={draft || archives ? "hidden" : "px-2 py-3 w-[160px]"}>
                        Terkumpul
                    </th>
                    <th scope="col" className="px-2 py-3 w-[120px]">
                        Target
                    </th>
                    <th scope="col" className="px-2 py-3 w-[130px]">
                        Jumlah Hari
                    </th>
                    <th scope="col" className="py-3">
                        Alat
                    </th>
                </tr>
            </thead>
            <tbody>
                {dashboard ?
                    data ? 
                    data.map((item: any)=> {
                        return(
                        <tr key={item.id} className="bg-white">
                            <td scope="row" className="px-2 py-4 w-30">
                            <Typography color='text01' variant='body3' type='semibold' className='w-30'>
                                {item.created_at}
                            </Typography>
                            </td>
                            <td className="px-2 py-4 w-[347px]">
                                <Typography color='text01' variant='body3' type='semibold' className='w-[347px] truncate'>
                                {item.title}
                                </Typography>
                            </td>
                            <td className={draft || archives ? 'hidden' : "px-2 py-4 w-[140px]"}>
                                <Typography color={'text01'} variant='body3' type='semibold' >
                                {convertToRupiah(item.collected)}
                                </Typography>
                            </td>
                            <td className="px-2 py-4 w-[120px]">
                                <Typography color='text03' variant='body3' type='semibold' >
                                {convertToRupiah(item.fund_target)}
                                </Typography>
                            </td>
                            <td className="px-10 py-4 w-[80px]">
                                <Typography color={'text01'} variant='body3' type='semibold' className='mx-auto' >
                                {item.due_date}
                                </Typography>
                            </td>
                            <td className="flex space-x-3 py-4">
                                {draft ?
                                <>
                                <div className="cursor-pointer" onClick={() => handleEdit && handleEdit(item.id)}>
                                    <img src={edit} alt="" />
                                </div>
                                <div className="cursor-pointer" onClick={() => handleDelete && handleDelete(item.id)}>
                                    <img src={delet} alt="" />
                                </div>
                                </>
                                :
                                archives ?
                                <>
                                <div className={"cursor-pointer"} onClick={() => handleArchive && handleArchive(item.id)}>
                                    <img src={send} alt="" />
                                </div>
                                <div className="cursor-pointer"  onClick={() => handleEdit && handleEdit(item.id)}>
                                    <img src={edit} alt=""/>
                                </div>
                                <div className="cursor-pointer" onClick={() => handleDelete && handleDelete(item.id)}>
                                    <img src={delet} alt="" />
                                </div>
                                </>
                                :
                                <>
                                <div className="cursor-pointer"  onClick={() => handleEdit && handleEdit(item.id)}>
                                    <img src={edit} alt=""/>
                                </div>
                                <div className={"cursor-pointer"} onClick={() => handleArchive && handleArchive(item.id)}>
                                    <img src={archive} alt="" />
                                </div>
                                <div className="cursor-pointer" onClick={() => handleDelete && handleDelete(item.id)}>
                                    <img src={delet} alt="" />
                                </div>
                                </>
                                }
                            </td>
                        </tr>
                        )
                    })
                    :
                    <tr>
                        <td className=""></td>
                        <td className="flex justify-center">
                        <Typography color='text03' variant='body3' type='bold'>
                        Data Kosong
                        </Typography>
                        </td>
                    </tr>
                :
                data ?
                data?.map((item:any)=>{
                return(
                    <tr key={item.id} className="bg-white">
                        <td scope="row" className="px-2 py-4 w-30">
                        <Typography color={item.collected >= item.fund_target ? 'green' : item.collected < item.fund_target && item.due_date == 0 ? 'error90' : 'text01'} variant='body3' type='semibold' className='w-30'>
                            {item.created_at}
                        </Typography>
                        </td>
                        <td className="px-2 py-4 w-[347px]">
                            <Typography color={item.collected >= item.fund_target ? 'green' : item.collected < item.fund_target && item.due_date == 0 ? 'error90' : 'text01'} variant='body3' type='semibold' className='w-[347px] truncate'>
                            {item.title}
                            </Typography>
                        </td>
                        <td className="px-2 py-4 w-[120px]">
                            <Typography color={item.collected >= item.fund_target ? 'green' : item.collected < item.fund_target && item.due_date == 0 ? 'error90' : 'text01'} variant='body3' type='semibold' >
                            {item.collected >= item.fund_target ? 'Completed' : item.collected < item.fund_target && item.due_date == 0 ? 'Not Completed' : convertToRupiah(item.collected)}
                            </Typography>
                        </td>
                        <td className="px-2 py-4 w-[120px]">
                            <Typography color={item.collected >= item.fund_target ? 'green' : item.collected < item.fund_target && item.due_date == 0 ? 'error90' : 'text03'} variant='body3' type='semibold' >
                            {item.collected >= item.fund_target ? 'Completed' : item.collected < item.fund_target && item.due_date == 0 ? 'Not Completed' : convertToRupiah(item.fund_target)}
                            </Typography>
                        </td>
                        <td className="px-10 py-4 w-[80px]">
                            <Typography color={item.collected >= item.fund_target ? 'green' : item.collected < item.fund_target && item.due_date == 0 ? 'error90' : 'text01'} variant='body3' type='semibold' className='mx-auto' >
                            {item.due_date}
                            </Typography>
                        </td>
                        <td className="flex space-x-3 py-4">
                            {draft ?
                            <>
                            <div className="cursor-pointer" onClick={() => handleEdit && handleEdit(item.id)}>
                                <img src={edit} alt="" />
                            </div>
                            <div className="cursor-pointer" onClick={() => handleDelete && handleDelete(item.id)}>
                                <img src={delet} alt="" />
                            </div>
                            </>
                            :
                            <>
                            <div className="cursor-pointer"  onClick={() => handleEdit && handleEdit(item.id)}>
                                <img src={edit} alt=""/>
                            </div>
                            <div className="cursor-pointer" onClick={() => handleArchive && handleArchive(item.id)}>
                                <img src={archive} alt="" />
                            </div>
                            <div className="cursor-pointer" onClick={() => handleDelete && handleDelete(item.id)}>
                                <img src={delet} alt="" />
                            </div>
                            </>
                            }
                        </td>
                </tr>
                )
                })
            :
            <tr>
                <td className=""></td>
                <td className="flex justify-center">
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

export default WakafTable;