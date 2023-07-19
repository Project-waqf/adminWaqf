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
import LoadingAlert from '../components/Modal/LoadingAlert';
import tambah from '../assets/Tambah.svg'

const initialEditValues: MitraType = {
  name: "",
  link: "",
  picture: null
};

const Mitra = () => {
  
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState<number>(0)
  const {mitra, getMitra, totalMitra, createMitra, deleteMitra, editedMitra} = useMitra()
  const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])
  const [editMitra , setEditMitra] = useState<MitraType>(initialEditValues)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState<number>(0)
  const [sort, setSort] = useState('desc')
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (toggle === true) {
      setSort('asc')
    } else if (toggle === false) {
      setSort('desc')
    }
  }, [toggle])

  useEffect(() => {
    getMitra({offset: page, sort: sort})
  }, [page, sort])

  const showModalMitra = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    ConfirmAlert( editMode ? 'cancelEdit' : 'cancel').then((res) => {
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
    if (formValues.picture) {
      const validation = await ConfirmAlert('upload')
      if (validation.isConfirmed) {
          setLoading(true)
          try {
          const result = await createMitra({
              name: formValues.name, 
              link:formValues.link, 
              picture:formValues.picture,
              token: cookie.token
          })
          setLoading(false);
          setShowModal(false)
          setEditMitra({
            name: '',
            link: '',        
            picture: null,
          });
          // Alert('upload')
          getMitra({offset: page, sort: sort})
          Alert('upload')
          return result
          } catch (error) {}
          setLoading(false)
      }          
    } else {
      Alert('failImage')
      setEditMitra({ name: formValues.name, link: formValues.link, picture: formValues.picture })
    }
  }

  const handleEditModal = (id: number) => {
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
        const result = await editedMitra({
        name: formValues.name,
        link: formValues.link,
        picture: formValues.picture,
        id: selectedId,
        token: cookie.token
        })
        Alert('edit')
        setShowModal(false)
        setEditMitra({
          name: '',
          link: '',        
          picture: null,
        });
        setLoading(false)
        getMitra({offset: page, sort: sort})
        return result
        } catch (error) {}
        setLoading(false)
    }
  }
  const handleDelete =async (id: number) => {
    const validation = await ConfirmAlert('delete')
    if (validation.isConfirmed) {
    setLoading(true)
        try {     
            const result = await deleteMitra({id: id, token: cookie.token})
            getMitra({offset: page, sort: sort})
            setLoading(false)
            return result
        } catch (error) {}
    setLoading(false)
    }
  }
  const handleSort = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <Sidebar/>
      <Display>
        <LoadingAlert open={loading} loading={loading}/>
        <Headers
        label='Mitra'
        />
        <div className="flex flex-row justify-between space-x-5 mx-auto w-11/12 my-10">
          <Button
          id='asset'
          size='normal'
          onClick={showModalMitra}
          color='orange'
          label={<div className='flex justify-center items-center space-x-2'><img src={tambah} /> <span>Buat Mitra</span></div>}
          />
        </div> 
        <div className="flex flex-col justify-center space-y-5 mx-auto w-11/12 my-10">
          <CustomCollapse 
          header='Mitra'
          key={'1'}
          autoOpen
          > 
          <CustomTable
          data={mitra}
          mitra={true}
          handleEdit={handleEditModal}
          handleDelete={handleDelete}
          handleSort={handleSort}
          isSort={toggle}
          />
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