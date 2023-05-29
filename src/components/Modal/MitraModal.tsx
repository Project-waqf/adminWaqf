import { Input, Modal } from 'antd';
import { MitraType } from '../../utils/types/DataType';
import React, { useEffect, useState } from 'react'
import Typography from '../Typography';
import { TbFileDescription } from 'react-icons/tb';
import { SmallLoading } from '../../assets/svg/SmallLoading';
import Button from '../CustomButton/Button';


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
    
    
    useEffect(() => {
        if (editMode || !editMode) {
            setFormValues(editValues);
        }
    }, [editValues, editMode]);
    console.log(formValues);
    
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
        style={{padding: 0}}
        title={<Typography color='text01' variant='h2' type='semibold' className='ml-[32px]'>{editMode ? 'Edit Mitra' : 'Tambah Mitra'}</Typography>}
        width={885}
        className='flex flex-col '
        footer={<></>}>
                <div className="relative mx-[12px] my-[36px]">
                    <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
                    <div className="flex space-x-8">
                        <div className="">
                            <label htmlFor='title'>
                                <Typography variant='h4' color='text01' type='medium' className=''>
                                    Nama Mitra
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