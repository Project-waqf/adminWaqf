import React, { useEffect, useState } from 'react'
import Display from '../components/DisplayContent/Display'
import Headers from '../components/Headers/Headers';
import Sidebar from '../components/Sidebar';
import Button from '../components/CustomButton/Button';
import CustomCollapse from '../components/Collapse';
import CustomTable from '../components/Table';
import { Pagination } from 'antd';
import useMitra from '../api/hooks/useMitra';
import MitraModal from '../components/Modal/MitraModal';
import ConfirmAlert from '../components/Alert/ConfirmAlert';
import Alert from '../components/Alert/Alert';
import { MitraType } from '../utils/types/DataType';
import { useCookies } from 'react-cookie';

const initialEditValues: MitraType = {
  name: "",
  link: "",
  picture: null
};

const Mitra = () => {
  
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState<number>(0)
  const {mitra, getMitra, totalMitra} = useMitra()
  const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])
  const [editMitra , setEditMitra] = useState<MitraType>(initialEditValues)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState<number>(0)
  useEffect(() => {
    getMitra({offset: page})
  }, [page])

  const handlePageChange = (page: number) => {
      setPage(page)// data for the specified page
  };
  const showModalMitra = () => {
    setShowModal(true);
};

const handleCancel = () => {
    ConfirmAlert('cancel').then((res) => {
        if (res.isConfirmed) {
            setShowModal(false);
            setEditMode(false)
            setEditMitra({
                name: '',
                link: '',        
                picture: null,
            });
        }
    })
};

const handleAdd = async (formValues: MitraType) => {
  setEditMitra({ name: formValues.name, link: formValues.link, picture: formValues.picture })
  const validation = await ConfirmAlert('upload')
  if (validation.isConfirmed) {
      setLoading(true)
      try {
      // const result = await createMitra({
      //     name: formValues.name, 
      //     link:formValues.link, 
      //     picture:formValues.picture,
      //     token: cookie.token
      // })
      // setLoading(false);
      // setShowModal(false)
      // Alert('upload')
      // setEditMitra({
      //   name: '',
      //   link: '',        
      //   picture: null,
      // });
      // getMitra({offset: page})
      // return result
      } catch (error) {}
      setLoading(false)
  }          
}
const handleEditModalNews = (id: number) => {
  setShowModal(true)
  const selectedMitra: any = mitra.find((item: any) => item.id === id);
  if (!selectedMitra) {
      return;
  }
  setEditMitra({
      name: selectedMitra.name,
      link: selectedMitra.link,        
      picture: selectedMitra.picture,
  });
  setEditMode(true);
  setSelectedId(id);
}

const handleEdit = async (formValues: MitraType) => {
  setEditMitra({ name: formValues.name, link: formValues.link, picture: formValues.picture })
  const validation = await ConfirmAlert('edit')
  if (validation.isConfirmed) {
      setLoading(true);
      try {
      // const result = await editedMitra({
      // name: formValues.name,
      // link: formValues.link,
      // picture: formValues.picture,
      // id: selectedId,
      // token: cookie.token
      // })
      // Alert('edit')
      // setShowModal(false)
      // setLoading(false)
      // getMitra({offset: page})
      // return result
      } catch (error) {}
      setLoading(false)
  }
}
  return (
    <>
      <Sidebar/>
      <Display>
        <Headers
        label='Mitra'
        />
        <div className="flex flex-row justify-between space-x-5 mx-auto w-11/12 my-10">
          <Button
          id='mitra'
          size=''
          className='w-72'
          onClick={showModalMitra}
          color='orange'
          label="+ Buat Mitra"
          />
          <Button
          id='filter'
          size='base'
          // onClick={showModalNews}
          label="Filter"
          color='orangeBorder'
          />
        </div>
        <div className="flex flex-col justify-center space-y-5 mx-auto w-11/12 my-10">
          <CustomCollapse 
          header='Mitra'
          key={'1'}
          > 
          <CustomTable
          data={mitra}
          mitra={true}
          />
          <Pagination size='small' total={10} onChange={handlePageChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
          </CustomCollapse>
        </div>
        <MitraModal
        open={showModal}
        handleCancel={handleCancel}
        onSubmit={editMode ? handleEdit : handleAdd}
        editMode={editMode}
        editValues={editMitra}
        />
      </Display>
    </>
)
}

export default Mitra