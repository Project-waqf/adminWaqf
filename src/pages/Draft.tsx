import React, { useEffect, useState } from 'react'
import ConfirmModal from '../components/Modal/ConfirmModal';
import Display from '../components/DisplayContent/Display'
import Headers from '../components/Headers/Headers';
import Sidebar from '../components/Sidebar'
import Button from '../components/CustomButton/Button';
import CustomCollapse from '../components/Collapse';
import CustomTable from '../components/Table';
import { Pagination } from 'antd';
import WakafModal from '../components/Modal/WakafModal';
import AssetModal from '../components/Modal/AssetModal';
import NewsModal from '../components/Modal/NewsModal';
import ConfirmAlert from '../components/Alert/ConfirmAlert';
import { AssetType, NewsType, WakafType } from '../utils/types/DataType';
import Alert from '../components/Alert/Alert';
import { useCookies } from 'react-cookie';
import useAsset from '../api/hooks/useAsset';
import useWakaf from '../api/hooks/useWakaf';
import useNews from '../api/hooks/useNews';
import WakafTable from '../components/Table/WakafTable';
import { useDispatch, useSelector } from 'react-redux';
import { DraftState, removeAssetFromDraft, removeNewsFromDraft, removeWakafFromDraft } from '../stores/draftSilce';
import Swal from 'sweetalert2';

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
const Draft = () => {
  
  const [isModalNews, setIsModalNews] = useState(false)
  const [isModalAsset, setIsModalAsset] = useState(false)
  const [isModalWakaf, setIsModalWakaf] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [pageWakaf, setPageWakaf] = useState<number>(1)
  const [pageAsset, setPageAsset] = useState<number>(1)
  const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])
  const {asset, getAsset, editedAsset, deleteAsset, totalDraftAsset} = useAsset()
  const {wakaf, getWakaf, editedWakaf, deleteWakaf, totalDraftWakaf} = useWakaf()
  const {news, getNews, editedNews, deleteNews, totalDraftNews} = useNews()
  const [editMode, setEditMode] = useState(false)
  const [selectedId, setSelectedId] = useState<number>(0)
  const dispatch = useDispatch()
  const [loading , setLoading] = useState(false)
  const draft = useSelector((state: {draft: DraftState}) => state.draft)
  const [editNews , setEditNews] = useState<NewsType>(initialEditNewsValue)
  const [editAsset , setEditAsset] = useState<AssetType>(initialEditAssetValue)
  const [editWakaf , setEditWakaf] = useState<WakafType>(initialEditWakafValue)

  useEffect(() => {
    getNews({status: 'draft', page: page})
  }, [page])

  useEffect(() => {
    getWakaf({status: 'draft', page: pageWakaf})
  }, [pageWakaf])
  console.log(pageWakaf);
  
  useEffect(() => {
    getAsset({status: 'draft', page: pageAsset})
  }, [pageAsset])

  useEffect(()=> {
    if (draft.news[0]) {
        handleDraftNews(draft.news[0])
    }
  },[draft.news])

  useEffect(()=> {
    if (draft.wakaf[0] && editMode) {
        handleDraftWakaf(draft.wakaf[0])
    }
  },[draft.wakaf])
console.log('draft', draft.news);

  useEffect(()=> {
    if (draft.asset[0] && editMode) {
        handleDraftAsset(draft.asset[0])
    }
  },[draft.asset])

  const handleCancel = () => {
    setIsModalNews(!isModalNews)
    setIsModalAsset(!isModalAsset)
    setIsModalWakaf(!isModalWakaf)
  }  
  const handlePageChange = (page: number) => {
    setPage(page)// data for the specified page
  };
  const handlePageWakafChange = (pageWakaf: number) => {
    setPageWakaf(pageWakaf)// data for the specified page
  };
  const handlePageAssetChange = (pageAsset: number) => {
    setPageAsset(pageAsset)// data for the specified page
  };
  const handleEditModalNews = (id: number) => {
    setIsModalNews(true)
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

  const handleEditNews = async (formValues: NewsType) => {
    setEditNews({ title: formValues.title, body: formValues.body, picture: formValues.picture })
    const validation = await ConfirmAlert('upload')
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
        setIsModalNews(false)
        setLoading(false)
        getNews({status: 'draft', page: page})
        return result
        } catch (error) {}
        setLoading(false)
    }
  }

  const handleDraftNews = async (formValues: NewsType) => {
    const validation = await ConfirmAlert('edit')
    if (validation.isConfirmed) {
        setLoading(true);
        try {
        const result = await editedNews({
        title: formValues.title,
        body: formValues.body,
        picture: formValues.picture,
        id: selectedId,
        status: 'draft',
        token: cookie.token
        })
        setIsModalNews(false)
        setLoading(false)
        getNews({status: 'draft', page: page})
        dispatch(removeNewsFromDraft(formValues.title))
        return result
        } catch (error) {}
        setLoading(false)
    } else if (validation.dismiss === Swal.DismissReason.cancel) {
      dispatch(removeNewsFromDraft(formValues.title))
  } 
  }

  const handleDeleteNews =async (id: number) => {
    const validation = await ConfirmAlert('delete')
    if (validation.isConfirmed) {
    setLoading(true)
        try {     
            const result = await deleteNews({
            id: id,
            token: cookie.token
            })
            getNews({status: 'draft', page: page})
            setLoading(false)
            return result
        } catch (error) {}
    setLoading(false)
    }
  }
  const handleEditModalWakaf = (id: number) => {
    setIsModalWakaf(true)
    const selectedWakaf: any = wakaf.find((item: any) => item.id === id);
    if (!selectedWakaf) {
        return;
    }
    setEditWakaf({
        title: selectedWakaf.title,
        category: selectedWakaf.category,        
        picture: selectedWakaf.picture,
        detail: selectedWakaf.detail,
        due_date: selectedWakaf.due_date,
        fund_target: selectedWakaf.fund_target,
        collected: selectedWakaf.collected
    });
    setEditMode(true);
    setSelectedId(id);
}

console.log(selectedId);

  const handleEditWakaf = async (formValues: WakafType) => {
      setEditWakaf({ title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, collected: formValues.collected })
      const validation = await ConfirmAlert('edit')
      if (validation.isConfirmed) {
          setLoading(true);
          try {
          const result = await editedWakaf({
              title: formValues.title,
              category: formValues.category,
              picture: formValues.picture,
              detail: formValues.detail,
              due_date: formValues.due_date,
              fund_target: formValues.fund_target,
              id: selectedId,
              token: cookie.token
          })
          setIsModalWakaf(false)
          setLoading(false)
          getWakaf({status: 'archive', page: page})
          Alert('edit')
          return result
          } catch (error) {}
          setLoading(false)
      }
  }
  console.log(wakaf);

  const handleDraftWakaf = async (formValues: WakafType) => {
      const validation = await ConfirmAlert('draft')
      if (validation.isConfirmed) {
          setLoading(true)
          try {
              const response = await editedWakaf({id: selectedId, status: 'draft', title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, token: cookie.token})
              getWakaf({status: 'draft', page: page})
              setLoading(false)
              setIsModalWakaf(false)
              Alert('draft')
              dispatch(removeWakafFromDraft(formValues.title))
              return response
          } catch (error) {}
          setLoading(false)
      } else if (validation.dismiss === Swal.DismissReason.cancel) {
          dispatch(removeWakafFromDraft(formValues.title))
      }
  }

  const handleDeleteWakaf =async (id: number) => {
      const validation = await ConfirmAlert('delete')
      if (validation.isConfirmed) {
      setLoading(true)
          try {     
              const result = await deleteWakaf({
              id: id,
              token: cookie.token
              })
              getWakaf({status: 'draft', page: page})
              setLoading(false)
              Alert('delete')
              return result
          } catch (error) {}
      setLoading(false)
      }
  }
  const handleEditModalAsset = (id: number) => {
  setIsModalAsset(true)
  setEditMode(true)
  const selecetedAsset: any = asset.find((item: any) => item.id_asset === id);
  if (!selecetedAsset) {
      return;
  }
  setEditAsset({
      name: selecetedAsset.name,
      detail: selecetedAsset.detail,
  });
  setSelectedId(id);
}

const handleEditAsset = async(formValues: AssetType) => {
  setEditAsset({ name: formValues.name, detail: formValues.detail, picture: formValues.picture })
  const validation = await ConfirmAlert('edit')
  if (validation.isConfirmed) {
      setLoading(true);
      try {
          const result = await editedAsset({
          name: formValues.name,
          detail: formValues.detail,
          picture: formValues.picture,
          id: selectedId,
          token: cookie.token
          })
          setIsModalAsset(false)
          setLoading(false)
          getAsset({status: 'draft', page: page})
          setEditAsset({name: '', detail: ''})
          return result
      } catch (error) {}
      setLoading(false)
  }
}

const handleDraftAsset = async (formValues: AssetType) => {
  const validation = await ConfirmAlert('draft')
  if (validation.isConfirmed) {
      setLoading(true)
      try {
          const response = await editedAsset({id: selectedId, name: formValues.name, detail: formValues.detail, picture: formValues.picture, status: 'draft', token: cookie.token})
          setLoading(false)
          setIsModalAsset(false)
          getAsset({status: 'draft', page: page})
          dispatch(removeAssetFromDraft(formValues.name))
          return response
      } catch (error) {}
  } else if (validation.dismiss === Swal.DismissReason.cancel) {
      dispatch(removeAssetFromDraft(formValues.name))
  }
}

const handleDeleteAsset =async (id: number) => {
  const validation = await ConfirmAlert('delete')
  if (validation.isConfirmed) {
      setLoading(true)
      try {
          const response = await deleteAsset({id: id, token: cookie.token})
          getAsset({status: 'draft', page: page})
          setLoading(false)
          return response
      } catch (error) {}
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
          handleDelete={handleDeleteWakaf}
          handleEdit={handleEditModalWakaf}
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
          handleDelete={handleDeleteNews}
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
          handleEdit={handleEditModalAsset}
          handleDelete={handleDeleteAsset}
          draft={true}
          />
          <Pagination size='small' total={totalDraftAsset} defaultPageSize={8} onChange={handlePageAssetChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
          </CustomCollapse>
          <NewsModal
          open={isModalNews}
          isArchive={false}
          isDraft={true}
          handleCancel={handleCancel}
          editMode={editMode}
          onSubmit={handleEditNews}
          editValues={editNews}
          />
          <WakafModal
          open={isModalWakaf}
          isArchive={false}
          isDraft={true}
          handleCancel={handleCancel}
          editMode={editMode}
          onSubmit={handleEditWakaf}
          editValues={editWakaf}
        />
        <AssetModal
          open={isModalAsset}
          handleCancel={handleCancel}
          isArchive={false}
          isDraft={true}
          editMode={editMode}
          onSubmit={handleEditAsset}
          editValues={editAsset}
        />
        </div>  
      </Display>
    </>
  )
}

export default Draft