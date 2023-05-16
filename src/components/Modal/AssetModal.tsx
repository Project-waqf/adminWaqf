import React, { useEffect, useState } from 'react'
import { Input, Modal, } from "antd";
import Typography from '../Typography';
import Button from '../CustomButton/Button';
import { SmallLoading } from '../../assets/svg/SmallLoading';
import { AssetType } from '../../utils/types/DataType';
import TextArea from '../CustomInput/TextArea';
import { TbFileDescription } from "react-icons/tb";



    interface FormProps {
        onSubmit: (formValues: AssetType) => void;
        editValues: AssetType;
        editMode: boolean;
        open: boolean
        handleCancel: React.MouseEventHandler
        handleDraft: React.MouseEventHandler
    }
    const initialFormValues: AssetType = {
        name: "",
        detail: "",
        picture: null
    };

const AssetModal: React.FC<FormProps> = ({ onSubmit, editValues, editMode, open, handleCancel, handleDraft}) => {
    
    const [formValues, setFormValues] = useState<AssetType>(initialFormValues);
    const [loading , setLoading] = useState(false)
    
    
    useEffect(() => {
        if (editMode || !editMode) {
            setFormValues(editValues);
        }
    }, [editValues, editMode]);
    console.log(formValues);
    
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (formValues.name && formValues.detail && formValues.picture) {
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
        setFormValues((prev) => ({
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
    return (
        <Modal
        open={open}
        onCancel={handleCancel} 
        centered closeIcon
        style={{padding: 5}}
        title={<Typography color='text01' variant='h1' type='semibold'>{editMode ? 'Edit Asset' : 'Tambah Asset'}</Typography>}
        width={1325}
        footer={<></>}>
                <div className="relative mx-5 my-12">
                    <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
                    <div className="flex space-x-8">
                        <div className="">
                                <label htmlFor='title'>
                                    <Typography variant='h4' color='text01' type='medium' className=''>
                                        Judul
                                    </Typography>
                                </label>
                                <Input
                                name='title'
                                type='text'
                                placeholder='Masukan Judul'
                                size='large'
                                className={`mt-2 h-12 w-[430px] bg-whiteBg border-neutral-80`}
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
                            <label className="block mt-2 bg-primary-60 flex justify-center space-x-1 p-2 w-52 h-12 rounded-lg cursor-pointer" htmlFor="file_input">
                                <TbFileDescription className='text-[28px] text-whiteBg' />
                                <Typography variant='h5' color='' type='normal' className='mt-0.5 text-whiteBg'>
                                    Upload Gambar
                                </Typography>
                            <input name='picture' onChange={handleImageChange} className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" aria-describedby="file_input_help" id="file_input" type="file"/>
                            </label>
                            {loading ? <SmallLoading/> : <></>}
                        </div>
                    </div>
                    <TextArea
                    name='body'
                    value={formValues.detail}
                    onChange={handleTextAreaChange}
                    />
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
                <div className="w-[1050px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label='Simpan Ke Draft'
                            id={`tidak`}
                            color={'orangeBorder'}
                            size='base'
                            onClick={()=> handleDraft}
                            className={editMode ? 'hidden' : formValues.name !== '' ? 'block' : 'hidden'}
                        />
                        <Button
                            label='Cancel'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                            className={formValues.name !== '' ? 'ml-0' : 'ml-[900px]'}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AssetModal