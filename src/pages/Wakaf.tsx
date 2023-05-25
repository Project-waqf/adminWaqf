import React, { useEffect, useState } from 'react'
import Display from '../components/DisplayContent/Display'
import Headers from '../components/Headers/Headers';
import Sidebar from '../components/Sidebar';
import Button from '../components/CustomButton/Button';
import { Pagination } from 'antd';
import WakafModal from '../components/Modal/WakafModal';
import CustomCollapse from '../components/Collapse';
import ConfirmAlert from '../components/Alert/ConfirmAlert';
import useCrudApi from '../utils/hooks/useCrudApi';
import Alert from '../components/Alert/Alert';
import { WakafType } from '../utils/types/DataType';
import WakafTable from '../components/Table/WakafTable';
import useWakaf from '../api/hooks/useWakaf';
import LoadingAlert from '../components/Modal/LoadingAlert';

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
    const { wakaf, getWakaf, totalOnlineWakaf, createWakaf, editedWakaf, draftWakaf, archiveWakaf, deleteWakaf } = useWakaf()

    useEffect(() => {
        getWakaf({page: page, status: 'online'})
    }, [page])
    
    const headers: Record<any, string> = {
        created_at: "Tanggal",
        title: "Judul",
        collected: "Terkumpul",
        fund_target: "Target",
        due_date: "Hari",
        alat: "Alat",
    };

    const handlePageChange = (page: number) => {
        setPage(page)// data for the specified page
    };
    const handleCancel = () => {
        ConfirmAlert('cancel').then((res) => {
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
        //     try {
        //     // const result = await createNews({
        //     //     title: formValues.title, 
        //     //     category:formValues.category, 
        //     //     picture:formValues.picture,
        //     //     token: cookie.token
        //     // })
        //     setLoading(false);
        //     setShowModal(false)
        //     Alert('upload')
        //     setEditValue({
        //         title: "",
        //         category: "",
        //         picture: null,
        //         detail: '',
        //         due_date: '',
        //         fund_target: 0
        //     })
        //     getWakaf({status: 'online', page: page})
        //     return result
        //     } catch (error) {}
        //     setLoading(false)
        }          
    } 
    

        const [editValue , setEditValue] = useState<WakafType>(initialEditValue)
        const [editMode, setEditMode] = useState(false)
        const [selectedId, setSelectedId] = useState<number>(0)
        
    const handleEditModal = (id: number) => {
        setShowModal(true)
        const selectedWakaf: any = wakaf.find((item: any) => item.id_wakaf === id);
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
            // const result = await editedNews({
            // title: formValues.title,
            // category: formValues.category,
            // picture: formValues.picture,
            // id: selectedId,
            // token: cookie.token
            // })
            // Alert('edit')
            // setShowModal(false)
            // setLoading(false)
            // getWakaf({status: 'online', page: page})
            // return result
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
                // const response = await archiveNews({id: selectedId, token: cookie.token})
                // Alert('archive')
                // getWakaf({status: 'online', page: page})
                // setLoading(false)
                // setShowModal(false)
                // return response
            } catch (error) {}
            setLoading(false)
        }
    }

    const handleDraft = async (formValues: WakafType) => {
        const validation = await ConfirmAlert('draft')
        if (validation.isConfirmed) {
            try {
                // const response = await draftNews({title: formValues.title, category: formValues.category, picture: formValues.picture, token: cookie.token})
                // Alert('draft')
                // getWakaf({status: 'online', page: page})
                // setLoading(false)
                // setShowModal(false)
                // return response
            } catch (error) {}
            setLoading(false)
        }
    }

    const handleDelete =async (id: number) => {
        const validation = await ConfirmAlert('delete')
        if (validation.isConfirmed) {
        setLoading(true)
            // try {     
            //     const result = await deleteNews({
            //     id: id,
            //     token: cookie.token
            //     })
            //     Alert('delete')    
            //     getWakaf({status: 'online', page: page})
            //     setLoading(false)
            //     return result
            // } catch (error) {}
        setLoading(false)
        }
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
                    // onClick={showModalNews}
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
                handleArchive={handleArchive}
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