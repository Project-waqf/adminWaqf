import { ListType, WakafType } from '../../utils/types/DataType';
import Typography from '../Typography';
import edit from "../../assets/edit.svg";
import delet from "../../assets/delete.svg";
import archive from "../../assets/archive.svg";
import archiveDis from "../../assets/archivedsiable.svg";
import editdisa from "../../assets/editdsaible.svg";
import send from "../../assets/send.svg";
interface TableProps {
    data: WakafType[]
    handleEdit?: (id: number) => void;
    handleDelete?: (id: number) => void;
    handleArchive?: (id: number) => void;
    draft?: boolean
    archives?: boolean
    dashboard?: boolean
}


const WakafTable: React.FC<TableProps> = ({ dashboard, archives, draft, data, handleDelete, handleArchive, handleEdit}) => {
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
                <tr>
                    <th scope="col" className="px-6 py-3 w-40">
                        Tanggal
                    </th>
                    <th scope="col" className={`px-6 py-3 ${draft || archive ? 'lg:w-[550px] xl:w-[780px]' : 'lg:w-[347px] xl:w-[600px]'}`}>
                        Judul
                    </th>
                    <th scope="col" className={draft || archives ? "hidden" : "px-6 py-3 w-[120px]"}>
                        Terkumpul
                    </th>
                    <th scope="col" className="px-6 py-3 w-[120px]">
                        Target
                    </th>
                    <th scope="col" className="px-6 py-3 w-[130px]">
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
                            <td scope="row" className="px-6 py-4 w-40">
                            <Typography color='text01' variant='body3' type='semibold'>
                                {item.created_at}
                            </Typography>
                            </td>
                            <td className="px-6 py-4 w-[347px]">
                                <Typography color='text01' variant='body3' type='semibold' className=''>
                                {item.title}
                                </Typography>
                            </td>
                            <td className={draft || archives ? 'hidden' : "px-6 py-4 w-[120px]"}>
                                <Typography color={'green'} variant='body3' type='semibold' >
                                {convertToRupiah(item.collected)}
                                </Typography>
                            </td>
                            <td className="px-6 py-4 w-[120px]">
                                <Typography color='text01' variant='body3' type='semibold' >
                                {convertToRupiah(item.fund_target)}
                                </Typography>
                            </td>
                            <td className="px-6 py-4 w-[80px]">
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
                    <div className="flex justify-center w-[1000px]">
                    <Typography color='text01' variant='h1' type='bold'>
                    Data Kosong
                    </Typography>
                    </div>
                :
                data ?
                data?.map((item:any)=>{
                return(
                    <tr key={item.id} className="bg-white">
                        <td scope="row" className="px-6 py-4 w-40">
                        <Typography color={item.collected >= item.fund_target ? 'green' : item.collected < item.fund_target && item.due_date == 0 ? 'error90' : 'text01'} variant='body3' type='semibold'>
                            {item.created_at}
                        </Typography>
                        </td>
                        <td className="px-6 py-4 w-[347px]">
                            <Typography color={item.collected >= item.fund_target ? 'green' : item.collected < item.fund_target && item.due_date == 0 ? 'error90' : 'text01'} variant='body3' type='semibold' className=''>
                            {item.title}
                            </Typography>
                        </td>
                        <td className="px-6 py-4 w-[120px]">
                            <Typography color={item.collected < item.fund_target && item.due_date == 0 ? 'error90' : 'green'} variant='body3' type='semibold' >
                            {item.collected >= item.fund_target ? 'Completed' : item.collected < item.fund_target && item.due_date == 0 ? 'Not Completed' : convertToRupiah(item.collected)}
                            </Typography>
                        </td>
                        <td className="px-6 py-4 w-[120px]">
                            <Typography color={item.collected >= item.fund_target ? 'green' : item.collected < item.fund_target && item.due_date == 0 ? 'error90' : 'text01'} variant='body3' type='semibold' >
                            {item.collected >= item.fund_target ? 'Completed' : item.collected < item.fund_target && item.due_date == 0 ? 'Not Completed' : convertToRupiah(item.fund_target)}
                            </Typography>
                        </td>
                        <td className="px-6 py-4 w-[80px]">
                            <Typography color={item.due_date < 5 ? 'error90' : item.collected >= item.fund_target ? 'green' : item.collected < item.fund_target && item.due_date == 0 ? 'error90' : 'text01'} variant='body3' type='semibold' className='mx-auto' >
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
                            {item.collected === item.fund_target && item.due_date > 1 ?
                            <div className="cursor-not-allowed">
                                <img src={editdisa} alt=""/>
                            </div>
                            :
                            <div className="cursor-pointer"  onClick={() => handleEdit && handleEdit(item.id)}>
                                <img src={edit} alt=""/>
                            </div>
                            }
                            { item.collected === item.fund_target && item.due_date > 1 ?
                            <div className="cursor-not-allowed">
                                <img src={archiveDis} alt=""/>
                            </div>
                            :
                            item.collected < item.fund_target && item.due_date === 0 ?
                            <div className="cursor-not-allowed">
                                <img src={archiveDis} alt=""/>
                            </div>
                            :
                            <div className={ item.collected === item.fund_target && item.due_date > 1 ?"cursor-not-allowed" : "cursor-pointer"} onClick={() => handleArchive && handleArchive(item.id)}>
                                <img src={archive} alt="" />
                            </div>
                            }
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

export default WakafTable;