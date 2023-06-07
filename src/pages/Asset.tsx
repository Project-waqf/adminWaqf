import React, { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar';
import Display from '../components/DisplayContent/Display';
import Headers from '../components/Headers/Headers';
import Button from '../components/CustomButton/Button';
import AssetModal from '../components/Modal/AssetModal';
import CustomCollapse from '../components/Collapse';
import CustomTable from '../components/Table';
import ConfirmAlert from '../components/Alert/ConfirmAlert';
import { AssetType } from '../utils/types/DataType';
import Alert from '../components/Alert/Alert';
import { useCookies } from 'react-cookie';
import useAsset from '../api/hooks/useAsset';
import { Pagination } from 'antd';
import LoadingAlert from '../components/Modal/LoadingAlert';
import { useDispatch, useSelector } from 'react-redux';
import { DraftState, removeAssetFromDraft } from '../stores/draftSilce';
import Swal from 'sweetalert2';
import { ArchiveState, removeAssetFromArchive } from '../stores/archiveSlice';

const initialFormValues: AssetType ={
    name: '',
    detail: '',
    picture: null
}

const Asset = () => {
    const [isModal, setIsModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectedId, setSelectedId] = useState<number>()
    const [value, setValue] = useState<AssetType>(initialFormValues)
    const [page, setPage] = useState<number>(1)
    const draft = useSelector((state: {draft: DraftState}) => state.draft)
    const archive = useSelector((state: {archive: ArchiveState}) => state.archive)
    const dispatch = useDispatch()
    const {asset,totalOnlineAsset, getAsset,createAsset, editedAsset, deleteAsset, draftAsset, archiveAsset} = useAsset()
    const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])

    useEffect(() => {
        getAsset({status: "online", page: page})
    }, [])


    useEffect(()=> {
        if (draft.asset[0] && !editMode) {
            handleDraft(draft.asset[0])
        }
    },[draft.asset])


    useEffect(()=> {
        if (archive.asset[0] && editMode) {
            handleArchive(archive.asset[0])
        }
    },[archive.asset])
    console.log("archive",archive.asset);

    const handlePageChange = (page: number) => {
        setPage(page)// data for the specified page
    };

    console.log("ini draft",draft.asset);
    
    const showModal = () => {
        setIsModal(true)
    }
    const handleCancel = () => {
        ConfirmAlert( editMode ? 'cancelEdit' : 'cancel').then((res) => {
            if (res.isConfirmed) {
                setIsModal(false);
                setEditMode(false)
                setValue({
                    name: '',
                    detail: '',        
                    picture: null,
                });
            }
        })
    };

    const handleAdd = async (formValues: AssetType) => {
        setLoading(true)
        setValue({ name: formValues.name, detail: formValues.detail, picture: formValues.picture })
            const validation = await ConfirmAlert('upload')
            if (validation.isConfirmed) {
                setLoading(true)
                try {
                    const result = await createAsset({name: formValues.name, detail: formValues.detail, picture: formValues.picture, token: cookie.token})
                    setLoading(false);
                    setIsModal(false)
                    getAsset({status: 'online', page: page})
                    return result
                } catch (error) {}

            }
        setLoading(false)
    };
    const handleEditModal = (id: number) => {
        setIsModal(true)
        setEditMode(true)
        const selecetedAsset: any = asset.find((item: any) => item.id_asset === id);
        if (!selecetedAsset) {
            return;
        }
        setValue({
            name: selecetedAsset.name,
            detail: selecetedAsset.detail,
        });
        setSelectedId(id);
    }

    const handleEdit = async(formValues: AssetType) => {
        setValue({ name: formValues.name, detail: formValues.detail, picture: formValues.picture })
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
                setIsModal(false)
                setLoading(false)
                getAsset({status: 'online', page: page})
                setValue({name: '', detail: ''})
                return result
            } catch (error) {}
            setLoading(false)
        }
    }

    const handleArchiveTable = async (id?:number) => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await archiveAsset({id: id, token: cookie.token})
                setLoading(false)
                getAsset({status: 'online', page: page})
                return response
            } catch (error) {}
        }
    }
    const handleArchive = async (formValues: AssetType) => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await editedAsset({id: selectedId, name: formValues.name, detail: formValues.detail, picture: formValues.picture, status: 'archive', token: cookie.token})
                setLoading(false)
                setIsModal(false)
                getAsset({status: 'online', page: page})
                dispatch(removeAssetFromArchive(formValues.name))
                return response
            } catch (error) {}
        } else if (validation.dismiss === Swal.DismissReason.cancel) {
            dispatch(removeAssetFromArchive(formValues.name))
        }
    }
    const handleDraft = async (formValues: AssetType) => {
        const validation = await ConfirmAlert('draft')
        if (validation.isConfirmed) {
            try {
                const response = await draftAsset({name: formValues.name, detail: formValues.detail, picture: formValues.picture, token: cookie.token})
                setLoading(false)
                setIsModal(false)
                dispatch(removeAssetFromDraft(formValues.name))
                return response
            } catch (error) {}
            setLoading(false)
        } else if (validation.dismiss === Swal.DismissReason.cancel) {
            dispatch(removeAssetFromDraft(formValues.name))
        }
    }
    const handleDelete =async (id: number) => {
        const validation = await ConfirmAlert('delete')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await deleteAsset({id: id, token: cookie.token})
                getAsset({status: 'online', page: page})
                setLoading(false)
                return response
            } catch (error) {}
        }
    }

    return (
        <>
            <Sidebar/>
            <Display>
                <LoadingAlert open={loading} loading={loading}/>
                <Headers
                label='Asset'
                />
                <div className="flex flex-row justify-between space-x-5 mx-auto w-11/12 my-10">
                    <Button
                    id='asset'
                    size=''
                    className='w-72'
                    onClick={showModal}
                    color='orange'
                    label="+ Buat Asset"
                    />
                    <Button
                    id='filter '
                    size='base'
                    // onClick={showModalNews}
                    label="Filter"
                    color='orangeBorder'
                    />
                </div> 
                <div className="flex flex-col justify-center space-y-5 mx-auto w-11/12 my-10">
                <CustomCollapse 
                header='Asset'
                key={0}
                > 
                <CustomTable
                data={asset}
                handleEdit={handleEditModal}
                handleDelete={handleDelete}
                handleArchive={handleArchiveTable}
                />
                <Pagination size='small' total={totalOnlineAsset} defaultPageSize={8} onChange={handlePageChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
                </CustomCollapse>
                <AssetModal
                open={isModal}
                handleCancel={handleCancel}
                editMode={editMode}
                onSubmit={editMode ? handleEdit : handleAdd}
                editValues={value}
                />
                </div>
            </Display>
        </>
    )
}

export default Asset