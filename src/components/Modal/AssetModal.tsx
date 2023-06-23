import React, { useEffect, useState } from 'react'
import { Input, Modal } from "antd";
import Typography from '../Typography';
import Button from '../CustomButton/Button';
import { SmallLoading } from '../../assets/svg/SmallLoading';
import { TbFileDescription } from "react-icons/tb";
import { DraftState, assetToDraft } from "../../stores/draftSilce";
import { useDispatch, useSelector } from 'react-redux';
import { AssetType } from '../../utils/types/DataType';
import { assetToArchive } from '../../stores/archiveSlice';
import { FaRegTrashAlt } from 'react-icons/fa';


interface FormProps {
    onSubmit: (formValues: AssetType) => void;
    handleDelete?: (id: any) => void
    editValues: AssetType;
    editMode?: boolean;
    open: boolean
    isArchive?: boolean
    isDraft?: boolean
    search?:boolean
    status?: any 
    handleCancel: React.MouseEventHandler
}
const initialFormValues: AssetType = {
    id_asset: 0,
    name: "",
    detail: "",
    picture: null
};

const AssetModal: React.FC<FormProps> = ({ onSubmit, handleDelete, editValues, editMode, open, handleCancel, isArchive, isDraft, search, status}) => {
    
    const [formValues, setFormValues] = useState<AssetType>(initialFormValues);
    const dispatch  = useDispatch()
    const [loading , setLoading] = useState(false)
    
    
    useEffect(() => {
        if (editMode || !editMode) {
            setFormValues(editValues);
        }
    }, [editValues, editMode]);
    
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (formValues.name && formValues.detail ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formValues]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
    
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: any) => {
        setLoading(true)
        const selectedImage = e.target.files[0];
        setFormValues((prev: any) => ({
            ...prev,
            picture: selectedImage
        }));
        setLoading(false)
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formValues);
        setFormValues(initialFormValues);
        
    };
    
    const handleTODraft = (formValues: AssetType)=>{
        const newItem: AssetType = {
            name: formValues.name,
            detail: formValues.detail,
            picture: formValues.picture
        }
        dispatch(assetToDraft(newItem))
    }

    const handleTOArchive = (formValues: AssetType)=>{
        const newItem: AssetType = {
            name: formValues.name,
            detail: formValues.detail,
            picture: formValues.picture
        }
        dispatch(assetToArchive(newItem))
    }
    
    const charCount = formValues.detail.length
    const maxLength = 160;
    console.log(formValues);
    
    return (
        <Modal
        open={open}
        onCancel={handleCancel} 
        centered closeIcon={search ? false : true}
        style={{padding: 0}}
        title={<Typography color='text01' variant='h1' type='semibold' className='ml-[32px]'>{editMode && !search ? 'Edit Asset' : editMode && search ? "Detail Asset" : 'Tambah Asset'}</Typography>}
        width={938}
        footer={<></>}>
                <div className="relative mx-[32px] my-[36px]">
                    <Typography variant='body1' color='text01' type='medium' className={search ? 'block mb-5' : 'hidden' }>
                        Status: <span className={status === "online" ? 'text-green-500':'text-primary-100'}>{status}</span>
                    </Typography>
                    <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
                    <div className="flex space-x-8">
                        <div className="">
                                <label htmlFor='title'>
                                    <Typography variant='h4' color='text01' type='medium' className=''>
                                        Judul Aset <span className='text-error-90'>*</span>
                                    </Typography>
                                </label>
                                <Input
                                name='name'
                                type='text'
                                placeholder='Masukan Judul'
                                size='large'
                                className={`mt-2 h-12 w-[430px] border-neutral-80`}
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                        <div className="">
                            <Typography variant='h4' color='text01' type='medium' className=''>
                                Gambar <span className='text-error-90'>*</span>
                            </Typography>
                            <label className="block mt-2 bg-btnColor flex justify-center space-x-1 p-2 w-52 h-12 rounded-lg cursor-pointer" htmlFor="file_input">
                                <TbFileDescription className='text-[28px] text-whiteBg' />
                                <Typography variant='h5' color='' type='normal' className='mt-0.5 text-whiteBg'>
                                    Upload Gambar
                                </Typography>
                            <input name='picture' onChange={handleImageChange} className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" aria-describedby="file_input_help" id="file_input" type="file"/>
                            </label>
                            {loading ? <SmallLoading/> : <></>}
                        </div>
                    </div>
                    <div className='flex flex-col relative w-full rounded-lg overflow-hidden' x-data="{maximum: ''}">
                        <Typography variant='h4' color='text01' type='medium' className='mt-0.5'>
                        Deskrip Aset
                        </Typography>
                        <textarea rows={4} x-model="maximum" maxLength={maxLength} x-ref="maximum" style={{ resize: 'none' }}
                        disabled={search} className="block w-full mt-2 py-2 px-3 text-base text-text01 rounded-lg border-neutral-80 focus:outline-none focus:border-blue-500" name='detail' value={formValues.detail} onChange={handleTextAreaChange}></textarea>
                        <span className="absolute px-2 py-1 text-xs text-neutral-90 right-2 bottom-2">{charCount} / {maxLength}</span>
                    </div>
                    <div className='flex mt-10 justify-end'>
                    <Button
                        type={'submit'}
                        label='Upload'
                        id={`tidak`}
                        color={'orange'}
                        size='base'
                        disabled={disabled || search}
                    />
            </div>
            </form >
                {search ?
                <div className="w-[640px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label='Tutup'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                            className={ formValues.name !== '' ? 'ml-0' : 'ml-auto'}
                        />
                        <button onClick={()=> handleDelete && handleDelete(formValues.id_asset)} className={`w-[156px] h-[46px] flex justify-center rounded-[8px] px-2 py-3 font-normal text-sm cursor-pointer transition-all border-none outline-none bg-white text-btnColor hover:bg-btnColor hover:text-white`}>
                            <FaRegTrashAlt className='mt-1 mr-2' />
                            Hapus
                        </button>
                    </div>
                </div>
                : 
                <div className="w-[640px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label={isArchive ? " Simpan & Perbarui Archive" : isDraft ? "Simpan & Perbarui Draft" : editMode ? 'Simpan Ke Archive' : 'Simpan Ke Draft'}
                            id={`draft`}
                            type={'submit'}
                            color={'orangeBorder'}
                            size={isArchive || isDraft ? 'normal' : 'base'}
                            onClick={isArchive? ()=>handleTOArchive(formValues) : isDraft ? ()=>handleTODraft(formValues) : editMode ? ()=>handleTOArchive(formValues) : ()=>handleTODraft(formValues)}
                            className={ formValues.name !== '' ? 'block' : 'hidden'}
                        />
                        <Button
                            label='Tutup'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                            className={ formValues.name !== '' ? 'ml-0' : 'ml-auto'}
                        />
                    </div>
                </div>
                }
            </div>
        </Modal>
    )
}

export default AssetModal