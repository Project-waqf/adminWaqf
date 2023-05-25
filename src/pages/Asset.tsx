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
import useCrudApi from '../utils/hooks/useCrudApi';
import { useCookies } from 'react-cookie';
import useAsset from '../api/hooks/useAsset';
import { Pagination } from 'antd';

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
    const {asset,totalOnlineAsset, getAsset,createAsset, editedAsset, deleteAsset, draftAsset, archiveAsset} = useAsset()
    const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])

    useEffect(() => {
        getAsset({status: "online", page: page})
    }, [])
    const handlePageChange = (page: number) => {
        setPage(page)// data for the specified page
    };
    
    const showModal = () => {
        setIsModal(true)
    }
    const handleCancel = () => {
        ConfirmAlert('cancel').then((res) => {
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
                
                setLoading(false);
                setIsModal(false)
                Alert('upload')
                setValue({
                    name: '',
                    detail: '',
                    picture: null
                })
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
            picture: selecetedAsset.picture,
        });
        setEditMode(true);
        setSelectedId(id);
    }

    const handleEdit = async(formValues: AssetType) => {

    }

    const handleArchive = async() => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            try {
                const response = await archiveAsset({id: selectedId, token: cookie.token})
            } catch (error) {
                
            }
        }
    }

    const handleDelete =async (id: number) => {
        const validation = await ConfirmAlert('delete')
        if (validation.isConfirmed) {
            try {
                
            } catch (error) {
                
            }
        }
    }

    return (
        <>
            <Sidebar/>
            <Display>
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
                handleArchive={handleArchive}
                />
                <Pagination size='small' total={totalOnlineAsset} onChange={handlePageChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
                </CustomCollapse>
                <AssetModal
                open={isModal}
                handleCancel={handleCancel}
                handleArchive={handleArchive}
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