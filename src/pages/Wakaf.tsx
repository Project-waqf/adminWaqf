import React, { useEffect, useState } from 'react'
import Display from '../components/DisplayContent/Display'
import Headers from '../components/Headers/Headers';
import Sidebar from '../components/Sidebar';
import Button from '../components/CustomButton/Button';
import { Dropdown, MenuProps, Pagination } from 'antd';
import WakafModal from '../components/Modal/WakafModal';
import CustomCollapse from '../components/Collapse';
import ConfirmAlert from '../components/Alert/ConfirmAlert';
import Alert from '../components/Alert/Alert';
import { WakafType } from '../utils/types/DataType';
import WakafTable from '../components/Table/WakafTable';
import useWakaf from '../api/hooks/useWakaf';
import LoadingAlert from '../components/Modal/LoadingAlert';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { DraftState, removeWakafFromDraft } from '../stores/draftSilce';
import { DownOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { ArchiveState, removeWakafFromArchive } from '../stores/archiveSlice';
import { useLocation } from 'react-router-dom';

const initialEditValue: WakafType = {
    id: 0,
    title: "",
    category: "",
    picture: null,
    detail: '',
    due_date: null,
    fund_target: 0,
    collected: 0, 
    due_date_string: '',
    is_completed: false
}

const Wakaf = () => {
    
    const [showModal, setShowModal] = useState<boolean>(false)
    const [loading , setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)    
    const dispatch = useDispatch()
    const location = useLocation()
    const draft = useSelector((state: {draft: DraftState}) => state.draft)
    const archive = useSelector((state: {archive: ArchiveState}) => state.archive)
    const { wakaf, getWakaf, totalOnlineWakaf, createWakaf, editedWakaf, draftWakaf, archiveWakaf, deleteWakaf } = useWakaf()
    const [selectedId, setSelectedId] = useState<number>(0)
    const [cookie] = useCookies(['token'])
    const [wakafValue , setWakafValue] = useState<WakafType>(initialEditValue)
    const [editValue , setEditValue] = useState<WakafType>(initialEditValue)
    const [editMode, setEditMode] = useState(false)
    const [filter, setFilter] = useState('')
    const [filterParams, setFilterParams] = useState('')
    const [filterLocation, setFilterLocation] = useState(location?.state?.forFilter)
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
        if (filterLocation && filterParams === '') {
            setFilterParams('aktif')
            setFilter("Wakaf Aktif")
        }
    }, [filterLocation, filterParams])

    useEffect(() => {
        getWakaf({page: page, status: 'online', sort: sort, filter: filterParams})
    }, [page, sort, filterParams])

    useEffect(()=> {
        if (draft.wakaf[0] && !editMode) {
            handleDraft(draft.wakaf[0])
        }
    },[draft.wakaf])
    console.log(draft.wakaf);
    
    useEffect(()=> {
        if (archive.wakaf[0] && editMode) {
            handleArchive(archive.wakaf[0])
        }
    },[archive.wakaf])
    
    const handleShowModal = () => {
        setShowModal(true)
        setEditValue({
            id: 0,
            title: "",
            category: "",
            picture: null,
            detail: '',
            due_date: null,
            fund_target: 0,
            collected: 0, 
            due_date_string: '',
            is_completed: false
        });
    }

    const handlePageChange = (page: number) => {
        setPage(page)// data for the specified page
    };
    const handleCancel = () => {
        ConfirmAlert( editMode ? 'cancelEdit' : 'cancel').then((res) => {
            if (res.isConfirmed) {
                setShowModal(false);
                setEditMode(false)
                setEditValue({
                    id: 0,
                    title: "",
                    category: "",
                    picture: null,
                    detail: '',
                    due_date: null,
                    fund_target: 0,
                    collected: 0, 
                    due_date_string: '',
                    is_completed: false
                });
            }
        })
    };
    
    const handleAdd = async (formValues: WakafType) => {
        setEditValue({ title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, collected: formValues.collected, due_date_string: formValues.due_date_string })
        if (formValues.picture) {
            const validation = await ConfirmAlert('upload')
            if (validation.isConfirmed) {
                setLoading(true)
                try {
                    const result = await createWakaf({
                        title: formValues.title,
                        category: formValues.category,
                        picture: formValues.picture,
                        detail: formValues.detail,
                        due_date: formValues.due_date_string,
                        fund_target: formValues.fund_target,
                        id: selectedId,
                        token: cookie.token
                    }) 
                    setEditValue({title: '', category: '', detail: '', due_date: '', fund_target: 0, collected: 0, due_date_string: ''});
                    setLoading(false);
                    setShowModal(false)
                    Alert('upload')
                    getWakaf({page: page, status: 'online', sort: sort, filter: filterParams})
                    return result
                } catch (error) {}
            }          
        } else {
            Alert('failImage')
            setEditValue({ title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, collected: formValues.collected, due_date_string: formValues.due_date_string })
        }
    } 
    

        
    const handleEditModal = (id: number) => {
        setShowModal(true)
        const selectedWakaf: any = wakaf.find((item: any) => item.id === id);
        if (!selectedWakaf) {
            return;
        }
        setEditValue({
            id: id,
            title: selectedWakaf.title,
            category: selectedWakaf.category,        
            picture: selectedWakaf.picture,
            detail: selectedWakaf.detail,
            due_date: selectedWakaf.due_date,
            due_date_string: selectedWakaf.due_date_string,
            fund_target: selectedWakaf.fund_target,
            collected: selectedWakaf.collected,
            is_completed: selectedWakaf.is_complete
        });
        setEditMode(true);
        setSelectedId(id);
    }
    
    const handleEdit = async (formValues: WakafType) => {
        setEditValue({ title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, collected: formValues.collected, due_date_string: formValues.due_date_string })
        const validation = await ConfirmAlert('edit')
        if (validation.isConfirmed) {
            setLoading(true);
            try {
                const result = await editedWakaf({ title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date_string, fund_target: formValues.fund_target, id: selectedId, token: cookie.token})
                setShowModal(false)
                setLoading(false)
                getWakaf({page: page, status: 'online', sort: sort, filter: filterParams})
                Alert('edit')   
                return result         
            } catch (error) {}
        }
    }
    
    const handleArchive = async (formValues: WakafType) => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await editedWakaf({id: selectedId, status: 'archive', title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date_string, fund_target: formValues.fund_target, token: cookie.token})
                getWakaf({page: page, status: 'online', sort: sort, filter: filterParams})
                setLoading(false)
                setShowModal(false)
                dispatch(removeWakafFromArchive(formValues.title))
                Alert('archive')
                return response
            } catch (error) {}
        } else if (validation.dismiss === Swal.DismissReason.cancel) {
            dispatch(removeWakafFromArchive(formValues.title))
        }
    }

    const handleArchiveTable = async (id: number) => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await archiveWakaf({id: id, token: cookie.token})
                getWakaf({page: page, status: 'online', sort: sort, filter: filterParams})
                setLoading(false)
                Alert('archive')
                return response
            } catch (error) {}
            setLoading(false)
        }
    }
    const handleDraft = async (formValues: WakafType) => {
        const validation = await ConfirmAlert('draft')
        if (validation.isConfirmed) {
            try {
                const response = await draftWakaf({title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date_string, fund_target: formValues.fund_target, token: cookie.token})
                getWakaf({page: page, status: 'online', sort: sort, filter: filterParams})
                dispatch(removeWakafFromDraft(formValues.title))
                setShowModal(false)
                setLoading(false)
                Alert('draft')
                return response
            } catch (error) {}
        } else if (validation.dismiss === Swal.DismissReason.cancel) {
            dispatch(removeWakafFromDraft(formValues.title))
        }
    }

    const handleDelete =async (id: number) => {
        const validation = await ConfirmAlert('delete')
        if (validation.isConfirmed) {
        setLoading(true)   
        try {
            const result = await deleteWakaf({ id: id, token: cookie.token })
            getWakaf({page: page, status: 'online', sort: sort, filter: filterParams})
            setLoading(false)
            setShowModal(false)
            return result
        } catch (error) {}
        }
    }
    const items: MenuProps['items'] = [
        {
            label: (
                <div className={`font-normal text-sm ${filter === "Wakaf Aktif" ? "text-btnColor" : "text-text01"} hover:text-btnColor h-30`}>
                Wakaf Aktif
                </div>
            ),
            key: 0,
        },
        {
            type: "divider"
        },
        {
            label: (
                <div className={`font-normal text-sm ${filter === "Completed" ? "text-btnColor" : "text-text01"} hover:text-btnColor h-30`}>
                Complete
                </div>
            ),
            key: 1,
        },
        {
            type: "divider"
        },
        {
            label: (
                <div className={`font-normal text-sm ${filter === "Not Completed" ? "text-btnColor" : "text-text01"} hover:text-btnColor h-30`}>
                Not Complete
                </div>
            ),
            key: 2,
        },
        {
            type: "divider"
        },
    ];
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === "0" && filter !== "Wakaf Aktif") {
            setFilter("Wakaf Aktif")
            setFilterParams('aktif')
            setFilterLocation('')
        } else if (e.key === "1" && filter !== "Completed") {
            setFilter("Completed")
            setFilterParams('complete')
            setFilterLocation('')
        } else if (e.key === "2" && filter !== "Not Completed") {
            setFilter("Not Completed")
            setFilterParams('non_completed')
            setFilterLocation('')
        } else{
            setFilter('')
            setFilterLocation('')
            setFilterParams('')
        }
    };
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const handleSort = () => {
        setToggle(!toggle)
    }
    
    return (
        <>
            <LoadingAlert open={loading} loading={loading}/>
            <Sidebar/>
            <Display>
                <Headers
                label='Wakaf'
                />
                <div className="flex flex-row justify-between space-x-5 mx-auto w-11/12 my-10">
                    <Button
                    id='wakaf'
                    size=''
                    className='w-72'
                    onClick={handleShowModal}
                    color='orange'
                    label="+ Buat Wakaf"
                    />
                    <Dropdown menu={menuProps} className='w-[156px]'>
                        <a onClick={(e) => e.preventDefault()}>
                            <button className={`w-[156px] h-[46px] flex justify-between rounded-[8px] px-2 py-3 font-normal text-sm cursor-pointer transition-all ${filter ? "bg-btnColor border-none text-white" : "border border-btnColor outline-none bg-white text-btnColor"}`}>
                            {filter ? filter : "Filter"}
                            <DownOutlined className='mt-1' />
                            </button>
                        </a>
                    </Dropdown>
                </div>
                <div className="flex flex-col justify-center space-y-5 mx-auto w-11/12 my-10">
                <CustomCollapse 
                header='Produk Wakaf'
                key={'1'}
                autoOpen
                >
                <WakafTable 
                data={wakaf}
                handleArchive={handleArchiveTable}
                handleDelete={handleDelete}
                handleEdit={handleEditModal}
                handleSort={handleSort}
                isSort={toggle}
                />
                <Pagination size='small' total={totalOnlineWakaf} onChange={handlePageChange} showSizeChanger={false} className={filterParams ? 'hidden' : 'block z-90 my-7 float-right'}/>
                </CustomCollapse>
                <WakafModal
                open={showModal}
                handleCancel={handleCancel}
                editMode={editMode}
                handleDelete={handleDelete}
                onSubmit={editMode ? handleEdit : handleAdd}
                editValues={editMode ? editValue : wakafValue}
                /> 
                </div>
            </Display>
        </>
    )
}

export default Wakaf