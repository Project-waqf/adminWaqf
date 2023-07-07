import { ListType } from '../../utils/types/DataType';
import Typography from '../Typography';
import edit from "../../assets/edit.svg";
import delet from "../../assets/delete.svg";
import send from "../../assets/send.svg";
import archive from "../../assets/archive.svg";
import { DownOutlined } from '@ant-design/icons';
interface TableProps {
    data: ListType[]
    handleEdit?: (id: number) => void;
    handleDelete?: (id: number) => void;
    handleArchive?: (id: number) => void;
    handleSort?: React.MouseEventHandler
    isSort?: boolean
    draft?: boolean
    archives?: boolean
    mitra?: boolean
}


const CustomTable: React.FC<TableProps> = ({ draft, archives, mitra, data, handleDelete, handleArchive, handleEdit, handleSort, isSort}) => {
  
    return (
      <div className="relative overflow-x-auto sm:rounded-lg">
      <div className="absolute top-3 border-solid border-b-2 border-x-0 border-t-0 border-b-neutral-60 w-full h-10"></div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-[16px] text-neutral-80 bg-white border">
                <tr>
                    <th scope="col" className="px-6 py-3 font-semibold flex items-center w-44">
                        Tanggal
                        <div onClick={handleSort} className='transition-all ml-2 cursor-pointer'>
                            <DownOutlined rotate={isSort ? 180 : 0} className='mt-1 text-btnColor transition-all'/>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3 w-[1000px] font-semibold">
                        Judul
                    </th>
                    <th scope="col" className="py-3 font-semibold text-center">
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
                      <Typography color='text03' variant='body2' type='semibold'>
                          {item.created_at}
                      </Typography>
                      </th>
                      <td className="px-6 py-4 w-[1000px]">
                        <Typography color='text01' variant='body2' type='semibold' >
                          {item.title || item.name}
                        </Typography>
                      </td>
                      <td className="flex space-x-5 py-4 justify-center">
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

export default CustomTable;