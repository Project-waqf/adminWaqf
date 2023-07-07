import Typography from '../components/Typography'
import Display from '../components/DisplayContent/Display'
import Sidebar from '../components/Sidebar'
import React, { useEffect, useState } from 'react'
import CustomCollapse from '../components/Collapse'
import CustomTable from '../components/Table'
import NewsModal from '../components/Modal/NewsModal'
import ConfirmAlert from '../components/Alert/ConfirmAlert'
import { useCookies } from 'react-cookie'
import { NewsType } from '../utils/types/DataType'
import Alert from '../components/Alert/Alert'
import Button from '../components/CustomButton/Button'
import Headers from '../components/Headers/Headers'
import LoadingAlert from '../components/Modal/LoadingAlert'
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { DraftState, removeNewsFromDraft } from '../stores/draftSilce'
import { ArchiveState, removeNewsFromArchive } from '../stores/archiveSlice'
import useNews from '../api/hooks/useNews'
import Swal from 'sweetalert2'
import tambah from '../assets/Tambah.svg'

const initialEditNewsValue: NewsType = {
    title: "",
    body: "",
    picture: null
}

const News = () => {


    const [isModalNews, setisModalNews] = useState(false);
    const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])
    const [loading, setLoading] = useState(false)
    const { createNews, editedNews, deleteNews, getNews, news, draftNews, archiveNews, totalOnlineNews, totalNews } = useNews()
    const [page, setPage] = useState<number>(1)
    const dispatch = useDispatch()
    const draft = useSelector((state: {draft: DraftState}) => state.draft)
    const archive = useSelector((state: {archive: ArchiveState}) => state.archive)
    const [editNews , setEditNews] = useState<NewsType>(initialEditNewsValue)
    const [editMode, setEditMode] = useState(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const [sort, setSort] = useState<string>('desc')
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        if (toggle === false) {
            setSort('desc')
        } else if (toggle === true) {
            setSort('asc')
        }
    }, [toggle])

    useEffect(() => {
        getNews({status: 'online', page: page, sort: sort})
    }, [page, sort])
    
    const handlePageChange = (page: number) => {
        setPage(page)// data for the specified page
    };
    
    useEffect(()=> {
        if (draft.news[0] && !editMode) {
            handleDraft(draft.news[0])
        }
    },[draft.news])

    useEffect(()=> {
        if (archive.news[0] && editMode) {
            handleArchive(archive.news[0])
        }
    },[archive.news])
    

    const showModalNews = () => {
        setisModalNews(true);
    };
    

    const handleCancel = () => {
        ConfirmAlert( editMode ? 'cancelEdit' : 'cancel').then((res) => {
            if (res.isConfirmed) {
                setisModalNews(false);
                setEditMode(false)
                setEditNews({title: '', body: '', picture: null});
            }
        })
    };
    
    const handleAdd = async (formValues: NewsType) => {
        setEditNews({ title: formValues.title, body: formValues.body, picture: formValues.picture })
        if (formValues.picture) {
            const validation = await ConfirmAlert('upload')
            if (validation.isConfirmed) {
                setLoading(true)
                try {
                    const result = await createNews({
                        title: formValues.title, 
                        body:formValues.body, 
                        picture:formValues.picture,
                        token: cookie.token
                    })
                    setLoading(false);
                    setisModalNews(false)
                    getNews({status: 'online', page: page, sort: sort})
                    setEditNews({title: '', body: '', picture: null});
                    Alert('upload')
                    return result
                } catch (error) {}
                setisModalNews(false)
                setLoading(false)
            }          
        } else {
            Alert('failImage')
            setEditNews({ title: formValues.title, body: formValues.body, picture: formValues.picture })
        }
    } 
    

    const handleEditModalNews = (id: number) => {
        setisModalNews(true)
        const selectedNews: any = news.find((item: any) => item.id_news === id);
        if (!selectedNews) {
            return;
        }
        setEditNews({
            title: selectedNews.title,
            body: selectedNews.body,        
            picture: selectedNews.picture,
            status: selectedNews.status
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
                const result = await editedNews({ title: formValues.title, body: formValues.body, picture: formValues.picture, id: selectedId, token: cookie.token})
                getNews({status: 'online', page: page, sort: sort})
                setLoading(false)
                setisModalNews(false)
                Alert('edit')
                return result
            } catch (error) {}
        }
    }
    
    const handleArchive = async (formValues: NewsType) => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await editedNews({id: selectedId, title: formValues.title, body: formValues.body, status: 'archive',  token: cookie.token})
                getNews({status: 'online', page: page, sort: sort})
                setLoading(false)
                dispatch(removeNewsFromArchive(formValues.title))
                setisModalNews(false)
                Alert('archive')
                return response
            } catch (error) {}
        } else if (validation.dismiss === Swal.DismissReason.cancel) {
            dispatch(removeNewsFromArchive(formValues.title))
        } 
    }
    const handleArchiveTable = async (id:number) => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await archiveNews({id: id, token: cookie.token})
                getNews({status: 'online', page: page, sort: sort})
                setLoading(false)
                setisModalNews(false)
                Alert('archive')
                return response
            } catch (error) {}
        } 
    }

    const handleDraft = async (formValues: NewsType) => {
        const validation = await ConfirmAlert('draft')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await draftNews({title: formValues.title, body: formValues.body, picture: formValues.picture, token: cookie.token})
                getNews({status: 'online', page: page, sort: sort})
                setLoading(false)
                setisModalNews(false)
                dispatch(removeNewsFromDraft(formValues.title))
                Alert('draft')
                return response
            } catch (error) {}
        } else if (validation.dismiss === Swal.DismissReason.cancel) {
            dispatch(removeNewsFromDraft(formValues.title))
        }
    }

    const handleDelete =async (id: number) => {
        const validation = await ConfirmAlert('delete')
        if (validation.isConfirmed) {
        setLoading(true)
        try {
            const result = await deleteNews({ id: id, token: cookie.token })
            getNews({status: 'online', page: page, sort: sort})
            setLoading(false)
            Alert('delete')
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
            label='Berita'
            />
            <div className="flex flex-row justify-between space-x-5 mx-auto w-11/12 my-10">
                <Button
                id='asset'
                size='normal'
                onClick={showModalNews}
                color='orange'
                label={<div className='flex justify-center items-center space-x-2'><img src={tambah} /> <span>Buat Berita</span></div>}
                />
            </div>                
            <div className="flex flex-col justify-center space-y-5 mx-auto w-11/12 my-10">
                <CustomCollapse 
                header='Berita'
                key={'1'}
                autoOpen
                > 
                <CustomTable
                data={news}
                handleEdit={handleEditModalNews}
                handleDelete={handleDelete}
                handleArchive={handleArchiveTable}
                handleSort={handleSort}
                isSort={toggle}
                />
                <Pagination size='small' total={totalOnlineNews} onChange={handlePageChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
                </CustomCollapse>
                <NewsModal
                open={isModalNews}
                isArchive={false}
                isDraft={false}
                handleCancel={handleCancel}
                editMode={editMode}
                onSubmit={editMode ? handleEdit : handleAdd}
                editValues={editNews}
                />
            </div>
            </Display>
        </>
    )
}

export default News