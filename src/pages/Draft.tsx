import React, { useEffect, useState } from 'react'
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
  collected: 0, 
  due_date_string: ''
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
  const [sortNews, setSortNews] = useState('')
  const [toggleNews, setToggleNews] = useState(false)
  const [sortWakaf, setSortWakaf] = useState('')
  const [toggleWakaf, setToggleWakaf] = useState(false)
  const [sortAsset, setSortAsset] = useState('')
  const [toggleAsset, setToggleAsset] = useState(false)

  useEffect(() => {
    if (toggleNews === false) {
        setSortNews('desc')
    } else if (toggleNews === true) {
        setSortNews('asc')
    }
  }, [toggleNews])

  useEffect(() => {
    if (toggleWakaf === false) {
        setSortWakaf('desc')
    } else if (toggleWakaf === true) {
        setSortWakaf('asc')
    }
  }, [toggleWakaf])

  useEffect(() => {
    if (toggleAsset === false) {
        setSortAsset('desc')
    } else if (toggleAsset === true) {
        setSortAsset('asc')
    }
  }, [toggleAsset])

  useEffect(() => {
    getNews({status: 'draft', page: page, sort: sortNews})
  }, [page, sortNews])

  useEffect(() => {
    getWakaf({status: 'draft', page: pageWakaf, sort: sortWakaf, filter: ''})
  }, [pageWakaf, sortWakaf])
  
  useEffect(() => {
    getAsset({status: 'draft', page: pageAsset, sort: sortAsset})
  }, [pageAsset, sortAsset])

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

  const handleCancelNews = () => {
    ConfirmAlert('cancelEdit').then((res) => {
      if (res.isConfirmed) {
        setIsModalNews(!isModalNews)
      }
    })
  }
  const handleCancelWakaf = () => {
    ConfirmAlert('cancelEdit').then((res) => {
      if (res.isConfirmed) {
        setIsModalWakaf(!isModalWakaf)
      }
    })
  }  
  const handleCancelAsset = () => {
    ConfirmAlert('cancelEdit').then((res) => {
      if (res.isConfirmed) {
        setIsModalAsset(!isModalAsset)
      }
    })
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
        getNews({status: 'draft', page: page, sort: sortNews})
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
        getNews({status: 'draft', page: page, sort: sortNews})
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
            getNews({status: 'draft', page: page, sort: sortNews})
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
        collected: selectedWakaf.collected, 
        due_date_string: selectedWakaf.due_date_string
    });
    setEditMode(true);
    setSelectedId(id);
  }


  const handleEditWakaf = async (formValues: WakafType) => {
      setEditWakaf({ title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, collected: formValues.collected, due_date_string: formValues.due_date_string })
      const validation = await ConfirmAlert('edit')
      if (validation.isConfirmed) {
          setLoading(true);
          try {
          const result = await editedWakaf({
              title: formValues.title,
              category: formValues.category,
              picture: formValues.picture,
              detail: formValues.detail,
              due_date: formValues.due_date_string,
              fund_target: formValues.fund_target,
              id: selectedId,
              token: cookie.token
          })
          setIsModalWakaf(false)
          setLoading(false)
          getWakaf({status: 'draft', page: pageWakaf, sort: sortWakaf, filter: ''})
          Alert('edit')
          return result
          } catch (error) {}
          setLoading(false)
      }
  }

  const handleDraftWakaf = async (formValues: WakafType) => {
      const validation = await ConfirmAlert('draft')
      if (validation.isConfirmed) {
          setLoading(true)
          try {
              const response = await editedWakaf({id: selectedId, status: 'draft', title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, token: cookie.token})
              getWakaf({status: 'draft', page: pageWakaf, sort: sortWakaf, filter: ''})
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
              getWakaf({status: 'draft', page: pageWakaf, sort: sortWakaf, filter: ''})
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
      picture: selecetedAsset.picture
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
            getAsset({status: 'draft', page: pageAsset, sort: sortAsset})
            setEditAsset({name: '', detail: '', picture: null})
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
            getAsset({status: 'draft', page: pageAsset, sort: sortAsset})
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
            getAsset({status: 'draft', page: pageAsset, sort: sortAsset})
            setLoading(false)
            return response
        } catch (error) {}
    }
  }
  const handleSortWakaf = () => {
    setToggleWakaf(!toggleWakaf)
  }
  const handleSortNews = () => {
    setToggleNews(!toggleNews)
  }
  const handleSortAsset = () => {
    setToggleAsset(!toggleAsset)
  }
  return (
    <>
      <Sidebar/>
      <Display>
        <Headers
        label='Draft'
        />
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
          handleSort={handleSortWakaf}
          isSort={toggleWakaf}
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
          handleSort={handleSortNews}
          isSort={toggleNews}
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
          handleSort={handleSortAsset}
          isSort={toggleAsset}
          />
          <Pagination size='small' total={totalDraftAsset} defaultPageSize={8} onChange={handlePageAssetChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
          </CustomCollapse>
          <NewsModal
          open={isModalNews}
          isArchive={false}
          isDraft={true}
          handleCancel={handleCancelNews}
          editMode={editMode}
          onSubmit={handleEditNews}
          editValues={editNews}
          />
          <WakafModal
          open={isModalWakaf}
          isArchive={false}
          isDraft={true}
          handleCancel={handleCancelWakaf}
          editMode={editMode}
          onSubmit={handleEditWakaf}
          editValues={editWakaf}
        />
        <AssetModal
          open={isModalAsset}
          handleCancel={handleCancelAsset}
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