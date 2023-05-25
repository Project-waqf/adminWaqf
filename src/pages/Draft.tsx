import React, { useEffect, useState } from 'react'
import ConfirmModal from '../components/Modal/ConfirmModal';
import Display from '../components/DisplayContent/Display'
import Headers from '../components/Headers/Headers';
import Sidebar from '../components/Sidebar'
import Button from '../components/CustomButton/Button';
import CustomCollapse from '../components/Collapse';
import CustomTable from '../components/Table';
import { Pagination } from 'antd';
import NewsModal from '../components/Modal/NewsModal';
import ConfirmAlert from '../components/Alert/ConfirmAlert';
import { NewsType } from '../utils/types/DataType';
import Alert from '../components/Alert/Alert';
import { useCookies } from 'react-cookie';
import useAsset from '../api/hooks/useAsset';
import useWakaf from '../api/hooks/useWakaf';
import useNews from '../api/hooks/useNews';
import WakafTable from '../components/Table/WakafTable';

const initialEditNewsValue: NewsType = {
  title: "",
  body: "",
  picture: null
}

const Draft = () => {
  
  const [showModal, setShowModal] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [pageWakaf, setPageWakaf] = useState<number>(1)
  const [pageAsset, setPageAsset] = useState<number>(1)
  const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])
  const {asset, getAsset, editedAsset, deleteAsset, totalDraftAsset} = useAsset()
  const {wakaf, getWakaf, editedWakaf, deleteWakaf, totalDraftWakaf} = useWakaf()
  const {news, getNews, editedNews, deleteNews, totalDraftNews} = useNews()
  const [editMode, setEditMode] = useState(false)
  const [selectedId, setSelectedId] = useState<number>(0)
  const [loading , setLoading] = useState(false)
  const [editNews , setEditNews] = useState<NewsType>(initialEditNewsValue)

  useEffect(() => {
    getNews({status: 'draft', page: page})
  }, [page])

  useEffect(() => {
    getWakaf({status: 'draft', page: pageWakaf})
  }, [pageWakaf])

  useEffect(() => {
    getAsset({status: 'draft', page: pageAsset})
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
        getNews({status: 'online', page: page})
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
        label='Draft'
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
          draft={true}
          dashboard={true}
          />
          <Pagination size='small' total={totalDraftWakaf} onChange={handlePageWakafChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
          </CustomCollapse>
          <CustomCollapse 
          header='Berita'
          key={'1'}
          > 
          <CustomTable
          data={news}
          handleEdit={handleEditModalNews}
          handleDelete={handleDelete}
          draft={true}
          />
          <Pagination size='small' total={totalDraftNews} onChange={handlePageChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
          </CustomCollapse>
          <CustomCollapse
          header='Asset'
          key={'1'}
          >
          <CustomTable
          data={asset}
          handleEdit={handleEditModalNews}
          handleDelete={handleDelete}
          draft={true}
          />
          <Pagination size='small' total={totalDraftAsset} onChange={handlePageAssetChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
          </CustomCollapse>
          <NewsModal
          open={showModal}
          handleCancel={handleCancel}
          editMode={editMode}
          onSubmit={handleEdit}
          editValues={editNews}
          />
        </div>  
      </Display>
    </>
  )
}

export default Draft