import { ListType } from '../../utils/types/DataType';
import Typography from '../Typography';
import edit from "../../assets/edit.svg";
import delet from "../../assets/delete.svg";
import send from "../../assets/send.svg";
import archive from "../../assets/archive.svg";
interface TableProps {
    data: ListType[]
    handleEdit?: (id: number) => void;
    handleDelete?: (id: number) => void;
    handleArchive?: (id: number) => void;
    setId?: (id: number) => void;
    draft?: boolean
    archives?: boolean
    mitra?: boolean
}


const CustomTable: React.FC<TableProps> = ({ draft, archives, mitra, data, handleDelete, handleArchive, handleEdit, setId}) => {
  
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
                    <th scope="col" className="py-3">
                        Alat
                    </th>
                </tr>
            </thead>
            <tbody>
              { data ?
                data?.map((item:any)=>{
                  return(
                  <tr key={item.id} className="bg-white">
                      <th scope="row" className="px-6 py-4 w-44">
                      <Typography color='text01' variant='body2' type='semibold'>
                          {item.created_at}
                      </Typography>
                      </th>
                      <td className="px-6 py-4 w-[1000px]">
                        <Typography color='text01' variant='body2' type='semibold' >
                          {item.title || item.name}
                        </Typography>
                      </td>
                      <td className="flex space-x-5 py-4">
                        {draft || mitra ?
                        <>
                          <div className="cursor-pointer" onClick={() => handleEdit && handleEdit(item.id_news ? item.id_news : item.id_asset ? item.id_asset : item.id)}>
                            <img src={edit} alt="" />
                          </div>
                          <div className="cursor-pointer" onClick={() => handleDelete && handleDelete(item.id_news ? item.id_news : item.id_asset ? item.id_asset : item.id)}>
                            <img src={delet} alt="" />
                          </div>
                        </>
                        :
                        archives ?
                        <>
                          <div className={"cursor-pointer"} onClick={() => handleArchive && handleArchive(item.id_news ? item.id_news : item.id_asset ? item.id_asset : item.id)}>
                            <img src={send} alt="" />
                          </div>
                          <div className="cursor-pointer"  onClick={() => handleEdit && handleEdit(item.id_news ? item.id_news : item.id_asset ? item.id_asset : item.id)}>
                            <img src={edit} alt=""/>
                          </div>
                          <div className="cursor-pointer" onClick={() => handleDelete && handleDelete(item.id_news ? item.id_news : item.id_asset ? item.id_asset : item.id)}>
                            <img src={delet} alt="" />
                          </div>
                        </>
                        :
                        <>
                          <div className="cursor-pointer" onClick={() => handleEdit && handleEdit(item.id_news ? item.id_news : item.id_asset ? item.id_asset : item.id)}>
                            <img src={edit} alt="" />
                          </div>
                          <div className="cursor-pointer" onClick={() => handleArchive && handleArchive(item.id_news ? item.id_news : item.id_asset ? item.id_asset : item.id)}>
                            <img src={archive} alt="" />
                          </div>
                          <div className="cursor-pointer" onClick={() => handleDelete && handleDelete(item.id_news ? item.id_news : item.id_asset ? item.id_asset : item.id)}>
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

export default CustomTable;