import React, { useEffect, useState } from 'react'
import { Input, Modal } from "antd";
import Typography from '../Typography';
import Button from '../CustomButton/Button';
import { SmallLoading } from '../../assets/svg/SmallLoading';
import { TbFileDescription } from "react-icons/tb";
import { DraftState, assetToDraft } from "../../stores/draftSilce";
import { useDispatch, useSelector } from 'react-redux';
import { AssetType } from '../../utils/types/DataType';

const {TextArea} = Input

interface FormProps {
    onSubmit: (formValues: AssetType) => void;
    editValues: AssetType;
    editMode: boolean;
    open: boolean
    handleCancel: React.MouseEventHandler
    handleArchive: React.MouseEventHandler
}
const initialFormValues: AssetType = {
    name: "",
    detail: "",
    picture: null
};

const AssetModal: React.FC<FormProps> = ({ onSubmit, editValues, editMode, open, handleCancel, handleArchive}) => {
    
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
    
    const charCount = formValues.detail.length
    const maxLength = 160;
    
    return (
        <Modal
        open={open}
        onCancel={handleCancel} 
        centered closeIcon
        style={{padding: 0}}
        title={<Typography color='text01' variant='h1' type='semibold' className='ml-[32px]'>{editMode ? 'Edit Asset' : 'Tambah Asset'}</Typography>}
        width={938}
        footer={<></>}>
                <div className="relative mx-[32px] my-[36px]">
                    <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
                    <div className="flex space-x-8">
                        <div className="">
                                <label htmlFor='title'>
                                    <Typography variant='h4' color='text01' type='medium' className=''>
                                        Judul
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
                                Gambar
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
                            Isi Detail
                        </Typography>
                        <textarea rows={4} x-model="maximum" maxLength={maxLength} x-ref="maximum" style={{ resize: 'none' }}
                        className="block w-full mt-2 py-2 px-3 text-base text-text01 rounded-lg border-neutral-80 focus:outline-none focus:border-blue-500" placeholder='isi Detail' name='detail' value={formValues.detail} onChange={handleTextAreaChange}></textarea>
                        <span className="absolute px-2 py-1 text-xs text-neutral-90 right-2 bottom-2">{charCount} / {maxLength}</span>
                    </div>
                    <div className='flex mt-10 justify-end'>
                    <Button
                        type={'submit'}
                        label='Upload'
                        id={`tidak`}
                        color={'orange'}
                        size='base'
                        disabled={disabled}
                        onClick={()=> console.log(formValues)}
                    />
            </div>
            </form >
                <div className="w-[640px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label={editMode ? 'Simpan Ke Archive' : 'Simpan Ke Draft'}
                            id={`draft`}
                            color={'orangeBorder'}
                            size='base'
                            onClick={editMode ? handleArchive : ()=>handleTODraft(formValues)}
                            className={ formValues.name !== '' ? 'block' : 'hidden'}
                        />
                        <Button
                            label='Cancel'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                            className={ formValues.name !== '' ? 'ml-0' : 'ml-auto'}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AssetModal