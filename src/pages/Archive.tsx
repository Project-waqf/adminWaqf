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
import { NewsType, WakafType, AssetType, AllDataType } from '../utils/types/DataType';
import ConfirmAlert from '../components/Alert/ConfirmAlert';
import Alert from '../components/Alert/Alert';
import { useCookies } from 'react-cookie';
import NewsModal from '../components/Modal/NewsModal';
import WakafModal from '../components/Modal/WakafModal';
import AssetModal from '../components/Modal/AssetModal';
import { useDispatch, useSelector } from 'react-redux';
import { ArchiveState, removeNewsFromArchive, removeWakafFromArchive, removeAssetFromArchive } from '../stores/archiveSlice';
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
const Archive = () => {
  
  const [isModalNews, setIsModalNews] = useState(false)
  const [isModalAsset, setIsModalAsset] = useState(false)
  const [isModalWakaf, setIsModalWakaf] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [pageWakaf, setPageWakaf] = useState<number>(1)
  const [pageAsset, setPageAsset] = useState<number>(1)
  const {asset, getAsset, editedAsset, deleteAsset, totalArchiveAsset} = useAsset()
  const {wakaf, getWakaf, editedWakaf, deleteWakaf, totalArchiveWakaf} = useWakaf()
  const {news, getNews, editedNews, deleteNews, totalArchiveNews} = useNews()
  const [editMode, setEditMode] = useState(false)
  const [selectedId, setSelectedId] = useState<number>(0)
  const dispatch = useDispatch() 
  const archive = useSelector((state: {archive: ArchiveState}) => state.archive)
  const [loading , setLoading] = useState(false)
  const [editNews , setEditNews] = useState<NewsType>(initialEditNewsValue)
  const [editAsset , setEditAsset] = useState<AssetType>(initialEditAssetValue)
  const [editWakaf , setEditWakaf] = useState<WakafType>(initialEditWakafValue)
  const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])  
  const [sortNews, setSortNews] = useState<string>('desc')
  const [toggleNews, setToggleNews] = useState(false)
  const [sortWakaf, setSortWakaf] = useState<string>('desc')
  const [toggleWakaf, setToggleWakaf] = useState(false)
  const [sortAsset, setSortAsset] = useState<string>('desc')
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
    getNews({status: 'archive', page: page, sort: sortNews})
  }, [page, sortNews, sortNews])

  useEffect(() => {
    getWakaf({status: 'archive', page: pageWakaf, sort: sortWakaf, filter: ''})
  }, [pageWakaf, sortWakaf])

  useEffect(() => {
    getAsset({status: 'archive', page: pageAsset, sort: sortAsset})
  }, [pageAsset, sortAsset])

  useEffect(()=> {
    if (archive.news[0]) {
        handleArchiveNews(archive.news[0])
    }
  },[archive.news])

  useEffect(()=> {
    if (archive.wakaf[0] && editMode) {
        handleArchiveWakaf(archive.wakaf[0])
    }
  },[archive.wakaf])

  useEffect(()=> {
    if (archive.asset[0] && editMode) {
        handleArchiveAsset(archive.asset[0])
    }
  },[archive.asset])
  
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
  const handlePageWakafChange = (page: number) => {
    setPageWakaf(page)// data for the specified page
  };
  const handlePageAssetChange = (page: number) => {
    setPageAsset(page)// data for the specified page
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
        Alert('edit')
        setIsModalNews(false)
        setLoading(false)
        getNews({status: 'archive', page: page, sort: sortNews})
        return result
        } catch (error) {}
        setLoading(false)
    }
  }
  const handleOnlineNews =async (id:number) => {
    const selectedNews: any = news.find((item: any) => item.id_news === id);
    if (!selectedNews) {
        return;
    }
    const validation = await ConfirmAlert('upload')
    if (validation.isConfirmed) {
      setLoading(true)
      try {
        const result = await editedNews({id: id, token: cookie.token, status: "online", title: selectedNews.title, body: selectedNews.body, picture: selectedNews.picture,})
        Alert('upload')
        getNews({status: 'archive', page: page, sort: sortNews})
        return result
      } catch (error) {}
    }
  }
  const handleArchiveNews = async (formValues: NewsType) => {
    const validation = await ConfirmAlert('archive')
    if (validation.isConfirmed) {
        setLoading(true)
        try {
            const response = await editedNews({ title: formValues.title, body: formValues.body, picture: formValues.picture, id: selectedId, status: 'archive', token: cookie.token})
            getNews({status: 'archive', page: page, sort: sortNews})
            setLoading(false)
            setIsModalNews(false)
            dispatch(removeNewsFromArchive(formValues.title))
            Alert('archive')
            return response
        } catch (error) {}
        setLoading(false)
    } else if (validation.dismiss === Swal.DismissReason.cancel) {
      dispatch(removeNewsFromArchive(formValues.title))
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
            Alert('delete')    
            getNews({status: 'archive', page: page, sort: sortNews})
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
      const validation = await ConfirmAlert('upload')
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
          getWakaf({status: 'archive', page: pageWakaf, sort: sortWakaf, filter: ''})
          Alert('edit')
          return result
          } catch (error) {}
          setLoading(false)
      }
  }

  const handleArchiveWakaf = async (formValues: WakafType) => {
      const validation = await ConfirmAlert('archive')
      if (validation.isConfirmed) {
          setLoading(true)
          try {
              const response = await editedWakaf({id: selectedId, status: 'archive', title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, token: cookie.token})
              getWakaf({status: 'archive', page: pageWakaf, sort: sortWakaf, filter: ''})
              setLoading(false)
              setIsModalWakaf(false)
              Alert('archive')
              dispatch(removeWakafFromArchive(formValues.title))
              return response
          } catch (error) {}
          setLoading(false)
      } else if (validation.dismiss === Swal.DismissReason.cancel) {
          dispatch(removeWakafFromArchive(formValues.title))
      }
  }

  const handleOnlineWakaf = async (id: number) => {
      const selectedWakaf: any = wakaf.find((item: any) => item.id === id);
      if (!selectedWakaf) {
          return;
      }
      const validation = await ConfirmAlert('upload')
      if (validation.isConfirmed) {
          setLoading(true)
          try {
              const response = await editedWakaf({id: id, token: cookie.token, status: "online", title: selectedWakaf.title, category: selectedWakaf.category, picture: selectedWakaf.picture, detail: selectedWakaf.detail, due_date: selectedWakaf.due_date_string, fund_target: selectedWakaf.fund_target})
              Alert('upload')
              getWakaf({status: 'archive', page: pageWakaf, sort: sortWakaf, filter: ''})
              setLoading(false)
              setIsModalWakaf(false)
              return response
          } catch (error) {}
          setLoading(false)
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
              getWakaf({status: 'archive', page: pageWakaf, sort: sortWakaf, filter: ''})
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
    const validation = await ConfirmAlert('upload')
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
            getAsset({status: 'archive', page: pageAsset, sort: sortAsset})
            Alert('upload')
            return result
        } catch (error) {}
        setLoading(false)
    }
  }

  const handleOnlineAsset = async (id?:number) => {
    const selecetedAsset: any = asset.find((item: any) => item.id_asset === id);
    if (!selecetedAsset) {
        return;
    }
    const validation = await ConfirmAlert('upload')
    if (validation.isConfirmed) {
        setLoading(true)
        try {
            const response = await editedAsset({id: id, token: cookie.token, status: "online", name: selecetedAsset.name, detail: selecetedAsset.detail})
            Alert('upload')
            setLoading(false)
            getAsset({status: 'archive', page: pageAsset, sort: sortAsset})
            return response
        } catch (error) {}
    }
  }
  const handleArchiveAsset = async (formValues: AssetType) => {
    const validation = await ConfirmAlert('archive')
    if (validation.isConfirmed) {
        setLoading(true)
        try {
            const response = await editedAsset({id: selectedId, name: formValues.name, detail: formValues.detail, picture: formValues.picture, status: 'archive', token: cookie.token})
            setLoading(false)
            setIsModalAsset(false)
            getAsset({status: 'archive', page: pageAsset, sort: sortAsset})
            dispatch(removeAssetFromArchive(formValues.name))
            Alert('archive')
            return response
        } catch (error) {}
    } else if (validation.dismiss === Swal.DismissReason.cancel) {
        dispatch(removeAssetFromArchive(formValues.name))
    }
  }

  const handleDeleteAsset =async (id: number) => {
    const validation = await ConfirmAlert('delete')
    if (validation.isConfirmed) {
        setLoading(true)
        try {
            const response = await deleteAsset({id: id, token: cookie.token})
            getAsset({status: 'archive', page: pageAsset, sort: sortAsset})
            setLoading(false)
            Alert('delete')
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
        label='Archive'
        />
        <div className="flex flex-col justify-center space-y-5 mx-auto w-11/12 my-10">
        <CustomCollapse
          header='Produk Wakaf'
          key={'1'}>  
          <WakafTable
          data={wakaf}
          archives={true}
          handleArchive={handleOnlineWakaf}
          handleDelete={handleDeleteWakaf}
          handleEdit={handleEditModalWakaf}
          dashboard={true}
          handleSort={handleSortWakaf}
          isSort={toggleWakaf}
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
          handleDelete={handleDeleteNews}
          archives={true}
          handleSort={handleSortNews}
          isSort={toggleNews}
          />
          <Pagination size='small' total={totalArchiveNews} onChange={handlePageChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
          </CustomCollapse>
          <CustomCollapse
          header='Asset'
          key={'1'}
          >
          <CustomTable
          data={asset}
          handleEdit={handleEditModalAsset}
          handleArchive={handleOnlineAsset}
          handleDelete={handleDeleteAsset}
          archives={true}
          handleSort={handleSortAsset}
          isSort={toggleAsset}
          />
          <Pagination size='small' total={totalArchiveAsset} defaultPageSize={8} onChange={handlePageAssetChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
          </CustomCollapse>
        </div>
        <NewsModal
          open={isModalNews}
          isArchive={true}
          isDraft={false}
          handleCancel={handleCancelNews}
          editMode={editMode}
          onSubmit={handleEditNews}
          editValues={editNews}
        />
        <WakafModal
          open={isModalWakaf}
          isArchive={true}
          isDraft={false}
          handleCancel={handleCancelWakaf}
          editMode={editMode}
          onSubmit={handleEditWakaf}
          editValues={editWakaf}
        />
        <AssetModal
          open={isModalAsset}
          handleCancel={handleCancelAsset}
          isArchive={true}
          isDraft={false}
          editMode={editMode}
          onSubmit={handleEditAsset}
          editValues={editAsset}
        />
      </Display>
    </>
  )
}

export default Archive