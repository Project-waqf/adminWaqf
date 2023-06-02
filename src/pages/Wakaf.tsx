import React, { useEffect, useState } from 'react'
import Display from '../components/DisplayContent/Display'
import Headers from '../components/Headers/Headers';
import Sidebar from '../components/Sidebar';
import Button from '../components/CustomButton/Button';
import { Pagination } from 'antd';
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
import Swal from 'sweetalert2';

const initialEditValue: WakafType = {
    title: "",
    category: "",
    picture: null,
    detail: '',
    due_date: '',
    fund_target: 0,
    collected: 0
}

const Wakaf = () => {
    
    const [showModal, setShowModal] = useState<boolean>(false)
    const [loading , setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)    
    const dispatch = useDispatch()
    const draft = useSelector((state: {draft: DraftState}) => state.draft)
    const { wakaf, getWakaf, totalOnlineWakaf, createWakaf, editedWakaf, draftWakaf, archiveWakaf, deleteWakaf } = useWakaf()
    const [cookie] = useCookies(['token'])

    useEffect(() => {
        getWakaf({page: page, status: 'online'})
    }, [page])

    useEffect(()=> {
        if (draft.wakaf[0] && !editMode) {
            handleDraft(draft.wakaf[0])
        }
    },[draft.wakaf])
    console.log(draft.wakaf);
    
    const handlePageChange = (page: number) => {
        setPage(page)// data for the specified page
    };
    const handleCancel = () => {
        ConfirmAlert( editMode ? 'cancelEdit' : 'cancel').then((res) => {
            if (res.isConfirmed) {
                setShowModal(false);
                setEditMode(false)
                setEditValue({
                    title: '',
                    category: '',        
                    picture: null,
                    detail: '',
                    due_date: '',
                    fund_target: 0,
                    collected: 0
                });
            }
        })
    };
    
    const handleAdd = async (formValues: WakafType) => {
        setEditValue({ title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, collected: formValues.collected })
        const validation = await ConfirmAlert('upload')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
            const result = await createWakaf({
                title: formValues.title,
                category: formValues.category,
                picture: formValues.picture,
                detail: formValues.detail,
                due_date: formValues.due_date,
                fund_target: formValues.fund_target,
                id: selectedId,
                token: cookie.token
            })
            setEditValue({title: '', category: '', picture: null, detail: '', due_date: '', fund_target: 0, collected: 0});
            setLoading(false);
            setShowModal(false)
            Alert('upload')
            getWakaf({status: 'online', page: page})
            return result
            } catch (error) {}
            setLoading(false)
        }          
    } 
    

        const [editValue , setEditValue] = useState<WakafType>(initialEditValue)
        const [editMode, setEditMode] = useState(false)
        const [selectedId, setSelectedId] = useState<number>(0)
        
    const handleEditModal = (id: number) => {
        setShowModal(true)
        const selectedWakaf: any = wakaf.find((item: any) => item.id === id);
        if (!selectedWakaf) {
            return;
        }
        setEditValue({
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

    const handleEdit = async (formValues: WakafType) => {
        setEditValue({ title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, collected: formValues.collected })
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
            setShowModal(false)
            setLoading(false)
            getWakaf({status: 'online', page: page})
            Alert('edit')
            return result
            } catch (error) {}
            setLoading(false)
        }
    }
    console.log(wakaf);
    
    const handleArchive = async () => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await archiveWakaf({id: selectedId, token: cookie.token})
                getWakaf({status: 'online', page: page})
                setLoading(false)
                setShowModal(false)
                Alert('archive')
                return response
            } catch (error) {}
            setLoading(false)
        }
    }

    const handleArchiveTable = async (id: number) => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await archiveWakaf({id: id, token: cookie.token})
                getWakaf({status: 'online', page: page})
                setLoading(false)
                setShowModal(false)
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
                const response = await draftWakaf({title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, token: cookie.token})
                getWakaf({status: 'online', page: page})
                setLoading(false)
                setShowModal(false)
                Alert('draft')
                dispatch(removeWakafFromDraft(formValues.title))
                return response
            } catch (error) {}
            setLoading(false)
        } else if (validation.dismiss === Swal.DismissReason.cancel) {
            dispatch(removeWakafFromDraft(formValues.title))
        }
    }

    const handleDelete =async (id: number) => {
        const validation = await ConfirmAlert('delete')
        if (validation.isConfirmed) {
        setLoading(true)
            try {     
                const result = await deleteWakaf({
                id: id,
                token: cookie.token
                })
                getWakaf({status: 'online', page: page})
                setLoading(false)
                Alert('delete')
                return result
            } catch (error) {}
        setLoading(false)
        }
    }
    const testAlert = () => {
        Alert()
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
                    onClick={()=> setShowModal(true)}
                    color='orange'
                    label="+ Buat Wakaf"
                    />
                    <Button
                    id='filter'
                    size='base'
                    onClick={testAlert}
                    label="Filter"
                    color='orangeBorder'
                    />
                </div>
                <div className="flex flex-col justify-center space-y-5 mx-auto w-11/12 my-10">
                <CustomCollapse 
                header='Produk Wakaf'
                key={'1'}
                >
                <WakafTable 
                data={wakaf}
                handleArchive={handleArchiveTable}
                handleDelete={handleDelete}
                handleEdit={handleEditModal}
                />
                <Pagination size='small' total={totalOnlineWakaf} onChange={handlePageChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
                </CustomCollapse>
                <WakafModal
                open={showModal}
                handleCancel={handleCancel}
                handleArchive={handleArchive}
                editMode={editMode}
                onSubmit={editMode ? handleEdit : handleAdd}
                editValues={editValue}
                /> 
                </div>
            </Display>
        </>
    )
}

export default Wakaf