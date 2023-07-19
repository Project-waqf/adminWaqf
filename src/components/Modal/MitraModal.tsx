import { Input, Modal } from 'antd';
import { MitraType } from '../../utils/types/DataType';
import React, { useEffect, useRef, useState } from 'react'
import Typography from '../Typography';
import { TbFileDescription } from 'react-icons/tb';
import { SmallLoading } from '../../assets/svg/SmallLoading';
import Button from '../CustomButton/Button';
import "../../styles/main.scss"


interface FormProps {
    onSubmit: (formValues: MitraType) => void;
    editValues: MitraType;
    editMode: boolean;
    open: boolean
    handleCancel: React.MouseEventHandler

}
const initialFormValues: MitraType = {
    name: "",
    link: "",
    picture: null
};
const MitraModal: React.FC<FormProps> = ({onSubmit, editMode, editValues, open, handleCancel}) => {
    
    const [formValues, setFormValues] = useState<MitraType>(initialFormValues);
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState('')
    const [imageString, setImageString] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        if (formValues.picture) {
            if (formValues.picture.name) {
                setImageString(formValues.picture.name)
            } else if (typeof formValues.picture === 'string') {
                const img: string = formValues.picture
                const modifiedUrl = img.replace('https://ik.imagekit.io/', '');
                setImageString(modifiedUrl)
            }
        }
    }, [formValues.picture])
    useEffect(() => {
        if (editMode || !editMode) {
            setFormValues(editValues);
            setError('')
        }
    }, [editValues, editMode]);
    
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (formValues.name && formValues.link) {
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
        const file = e.target.files[0];
        const maxSize = 2 * 1024 * 1024; // 5MB in bytes
        if (file && file.size <= maxSize) {
            const fileName = file.name.toLowerCase()
            const validExtensions = [".png", ".jpg", ".jpeg"];
            if (validExtensions.some((extension) => fileName.endsWith(extension))) {
                // Image is valid
                // Do something with the image file, such as upload or display it
                setFormValues((prev) => ({
                    ...prev,
                    picture: file
                }));
                setError('');
                setLoading(false)
            } else {
                // Invalid image file type
                setError('File must be PNG, JPG or JPEG')
            }
        } else {
            setFormValues((prev) => ({
                ...prev,
                picture: null
            }));
            setError('File size exceeds the maximum allowed limit (5MB).');
            setLoading(false)
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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
        style={{padding: 0}}
        title={<Typography color='text01' variant='h3' type='semibold' >{editMode ? 'Edit Mitra' : 'Tambah Mitra'}</Typography>}
        width={885}
        className='flex flex-col '
        footer={<></>}>
                <div className="relative mx-[12px] my-[36px]">
                    <form className='flex flex-col space-y-2' onSubmit={handleSubmit}>
                    <div className="flex space-x-8">
                        <div className="">
                            <label htmlFor='title'>
                                <Typography variant='body1' color='text01' type='medium' className=''>
                                    Nama Mitra <span className='text-error-90'>*</span>
                                </Typography>
                            </label>
                            <Input
                            name='name'
                            type='text'
                            placeholder='Masukan Nama Mitra'
                            size='large'
                            className={`mt-2 h-12 w-[584px] border-neutral-80`}
                            value={formValues.name}
                            onChange={handleInputChange}
                            />
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                        <div className="">
                            <Typography variant='body1' color='text01' type='medium' className=''>
                                Gambar <span className='text-error-90'>*</span>
                            </Typography>
                            <label className="block mt-2 bg-btnColor flex justify-center space-x-1 p-2 w-52 h-12 rounded-lg cursor-pointer" htmlFor="file_input">
                                <TbFileDescription className='text-[28px] text-whiteBg' />
                                <Typography variant='h5' color='' type='normal' className='mt-0.5 text-whiteBg'>
                                    Upload Gambar
                                </Typography>
                            <input name='picture' ref={fileInputRef} onChange={handleImageChange} className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="file_input" type="file"/>
                            </label>
                            <Typography variant='text' color={error ? 'error80' : 'neutral-90'} type='normal' className='overflow-hidden truncate w-40'>
                                {error ? error : formValues.picture ? imageString : "Max 2 mb" }
                            </Typography>
                            {loading ? <SmallLoading/> : <></>}
                        </div>
                    </div>
                    <div className='flex flex-col relative w-full rounded-lg overflow-hidden' x-data="{maximum: ''}">
                        <Typography variant='body1' color='text01' type='medium' className='mt-0.5'>
                            Link
                        </Typography>
                        <Input
                        name='link'
                        type='text'
                        placeholder='Masukan Link Mitra/Perusahaan'
                        size='large'
                        className={`mt-2 h-12 w-[584px] border-neutral-80`}
                        value={formValues.link}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex justify-end'>
                    <Button
                        type={'submit'}
                        label={ editMode ? 'Simpan & Perbarui' : 'Upload'}
                        id={`tidak`}
                        color={'orange'}
                        size='normal'
                        className='mt-10'
                        disabled={disabled}
                    />
                    </div>
            </form >
                <div className="w-[640px] absolute left-0 bottom-0">
                        <Button
                            label='Tutup'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                        />
                </div>
            </div>
        </Modal>
    )
}

export default MitraModal