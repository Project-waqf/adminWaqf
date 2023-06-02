import React, { useEffect, useState } from 'react'
import Display from '../components/DisplayContent/Display'
import Headers from '../components/Headers/Headers';
import Sidebar from '../components/Sidebar';
import Button from '../components/CustomButton/Button';
import CustomCollapse from '../components/Collapse';
import WakafTable from '../components/Table/WakafTable';
import { Pagination } from 'antd';
import CustomTable from '../components/Table';
import useNews from '../api/hooks/useNews';
import useWakaf from '../api/hooks/useWakaf';
import useAsset from '../api/hooks/useAsset';
import { NewsType, WakafType, AssetType } from '../utils/types/DataType';
import ConfirmAlert from '../components/Alert/ConfirmAlert';
import Alert from '../components/Alert/Alert';
import { useCookies } from 'react-cookie';
import NewsModal from '../components/Modal/NewsModal';

const initialEditNewsValue: NewsType = {
  title: "",
  body: "",
  picture: null
}
const initialEditAssetValue: AssetType = {
  name: '',
  detail: '',
  picture: null
}
const initialEditWakafValue: WakafType = {
  title: "",
  category: "",
  picture: null,
  detail: '',
  due_date: '',
  fund_target: 0,
  collected: 0
}
const Archive = () => {
  
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [pageWakaf, setPageWakaf] = useState<number>(1)
  const [pageAsset, setPageAsset] = useState<number>(1)
  const {asset, getAsset, editedAsset, deleteAsset, archiveAsset, totalArchiveAsset} = useAsset()
  const {wakaf, getWakaf, editedWakaf, deleteWakaf, archiveWakaf, totalArchiveWakaf} = useWakaf()
  const {news, getNews, editedNews, deleteNews, archiveNews, totalArchiveNews} = useNews()
  const [editMode, setEditMode] = useState(false)
  const [selectedId, setSelectedId] = useState<number>(0)
  const [loading , setLoading] = useState(false)
  const [editNews , setEditNews] = useState<NewsType>(initialEditNewsValue)
  const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])


  useEffect(() => {
    getNews({status: 'archive', page: page})
  }, [page])

  useEffect(() => {
    getWakaf({status: 'archive', page: pageWakaf})
  }, [pageWakaf])

  useEffect(() => {
    getAsset({status: 'archive', page: pageAsset})
  }, [pageAsset])
  const handleCancel = () => {
    setShowModal(!showModal)
  }  
  const handlePageChange = (page: number) => {
    setPage(page)// data for the specified page
  };
  const handlePageWakafChange = (page: number) => {
    setPageWakaf(pageWakaf)// data for the specified page
  };
  const handlePageAssetChange = (page: number) => {
    setPageAsset(pageAsset)// data for the specified page
  };
  const handleEditModalNews = (id: number) => {
    setShowModal(true)
    const selectedNews: any = news.find((item: any) => item.id_news === id);
    if (!selectedNews) {
        return;
    }
    setEditNews({
        title: selectedNews.title,
        body: selectedNews.body,        
        picture: selectedNews.picture,
    });
    setEditMode(true);
    setSelectedId(id);
}

  const handleEdit = async (formValues: NewsType) => {
    setEditNews({ title: formValues.title, body: formValues.body, picture: formValues.picture })
    const validation = await ConfirmAlert('edit')
    if (validation.isConfirmed) {
        setLoading(true);
        try {
        const result = await editedNews({
        title: formValues.title,
        body: formValues.body,
        picture: formValues.picture,
        id: selectedId,
        token: cookie.token
        })
        Alert('edit')
        setShowModal(false)
        setLoading(false)
        getNews({status: 'archive', page: page})
        return result
        } catch (error) {}
        setLoading(false)
    }
  }
  const handleOnlineNews =async (id:number) => {
    const validation = await ConfirmAlert('upload')
    if (validation.isConfirmed) {
      setLoading(true)
      try {
        const result = await editedNews({id: id, token: cookie.token, status: "online"})
        Alert('upload')
        getNews({status: 'archive', page: page})
        return result
      } catch (error) {}
    }
  }
  const handleArchiveNews = async (formValues: NewsType) => {
    const validation = await ConfirmAlert('archive')
    if (validation.isConfirmed) {
        setLoading(true)
        try {
            const response = await archiveNews({ title: formValues.title, body: formValues.body, picture: formValues.picture, id: selectedId, token: cookie.token})
            getNews({status: 'archive', page: page})
            setLoading(false)
            setShowModal(false)
            return response
        } catch (error) {}
        setLoading(false)
    } 
}
  const handleDelete =async (id: number) => {
    const validation = await ConfirmAlert('delete')
    if (validation.isConfirmed) {
    setLoading(true)
        try {     
            const result = await deleteNews({
            id: id,
            token: cookie.token
            })
            Alert('delete')    
            getNews({status: 'online', page: page})
            setLoading(false)
            return result
        } catch (error) {}
    setLoading(false)
    }
  }
  return (
    <>
      <Sidebar/>
      <Display>
        <Headers
        label='Archive'
        />
        <div className="flex flex-row justify-between space-x-5 mx-auto w-11/12 my-10">
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
          header='Produk Wakaf'
          key={'1'}>  
          <WakafTable
          data={wakaf}
          archives={true}
          dashboard={true}
          />
          <Pagination size='small' total={totalArchiveWakaf} onChange={handlePageWakafChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
          </CustomCollapse>
          <CustomCollapse 
          header='Berita'
          key={'1'}
          > 
          <CustomTable
          data={news}
          handleArchive={handleOnlineNews}
          handleEdit={handleEditModalNews}
          handleDelete={handleDelete}
          archives={true}
          />
          <Pagination size='small' total={totalArchiveNews} onChange={handlePageChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
          </CustomCollapse>
          <CustomCollapse
          header='Asset'
          key={'1'}
          >
          <CustomTable
          data={asset}
          handleEdit={handleEditModalNews}
          handleDelete={handleDelete}
          archives={true}
          />
          <Pagination size='small' total={totalArchiveAsset} onChange={handlePageAssetChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
          </CustomCollapse>
        </div>
        <NewsModal
          open={showModal}
          handleCancel={handleCancel}
          handleArchive={handleArchiveNews}
          editMode={editMode}
          onSubmit={handleEdit}
          editValues={editNews}
        />
      </Display>
    </>
  )
}

export default Archive