import React, { useEffect, useState } from 'react'
import { Input, Modal, } from "antd";
import Typography from '../Typography';
import Button from '../CustomButton/Button';
import { SmallLoading } from '../../assets/svg/SmallLoading';
import { NewsType } from '../../utils/types/DataType';
import TextArea from '../CustomInput/TextArea';
import { TbFileDescription } from "react-icons/tb";
import { DraftState, newsToDraft } from "../../stores/draftSilce";
import { newsToArchive, ArchiveState } from '../../stores/archiveSlice';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../CustomInput/Editor';
import { search } from 'jodit/types/plugins/search/search';


    interface FormProps {
        onSubmit: (formValues: NewsType) => void;
        editValues: NewsType;
        editMode?: boolean;
        isArchive?: boolean
        isDraft?: boolean
        search?: boolean
        status?: any
        open: boolean
        handleCancel: React.MouseEventHandler
    }
    const initialFormValues: NewsType = {
        title: "",
        body: "",
        picture: null
    };

const NewsModal: React.FC<FormProps> = ({ onSubmit, editValues, editMode, open, isArchive, isDraft, handleCancel, status, search}) => {
    
    const [formValues, setFormValues] = useState<NewsType>(initialFormValues);
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState<string>()
    const dispatch = useDispatch()
    const draft = useSelector((state: {draft: DraftState}) => state.draft)
    
    useEffect(() => {
        if (editMode || !editMode) {
            setFormValues(editValues);
        }
    }, [editValues, editMode]);

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (formValues.title && formValues.body) {
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
    
    const handleTODraft = async (formValues: NewsType) => {
        const newItem: NewsType = {
            title: formValues.title,
            body: formValues.body,
            picture: formValues.picture
        }
        dispatch(newsToDraft(newItem))
    }
    const handleTOArchive = async (formValues: NewsType) => {
        const newItem: NewsType = {
            title: formValues.title,
            body: formValues.body,
            picture: formValues.picture
        }
        dispatch(newsToArchive(newItem))
    }
    const handleChangeEditor = (newContent: string) => {
        setFormValues({...formValues, body: newContent});
    };
    const handleImageChange = (e: any) => {
        setLoading(true)
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file && file.size <= maxSize) {
            setFormValues((prev) => ({
                ...prev,
                picture: file
            }));
            setError('');
        } else {
            setFormValues((prev) => ({
                ...prev,
                picture: null
            }));
            setError('File size exceeds the maximum allowed limit (5MB).');
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
        style={{padding: 5}}
        title={<Typography color='text01' variant='h1' type='semibold'>{editMode && !search ? 'Edit Berita' : editMode && search ? 'Detail Berita' : 'Tambah Berita'}</Typography>}
        width={1120}
        footer={<></>}>
                <div className="relative mx-5 my-8">
                    <Typography variant='body1' color='text01' type='medium' className='mb-5'>
                        Status: <span className={status === "online" ? 'text-green-500':'text-primary-100'}>{status}</span>
                    </Typography>
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
                                className={`mt-2 h-12 w-[430px] border-neutral-80`}
                                value={formValues.title}
                                onChange={handleInputChange}
                                disabled={search}
                            />
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                        <div className="">
                            <Typography variant='h4' color='text01' type='medium' className=''>
                                Gambar
                            </Typography>
                            <label className={"block mt-2 bg-btnColor flex justify-center space-x-1 p-2 w-52 h-12 rounded-lg cursor-pointer"} htmlFor="file_input">
                                <TbFileDescription className='text-[28px] text-whiteBg' />
                                <Typography variant='h5' color='' type='normal' className='mt-0.5 text-whiteBg'>
                                    Upload Gambar
                                </Typography>
                            <input name='picture' onChange={handleImageChange} disabled={search} className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" aria-describedby="file_input_help" id="file_input" type="file"/>
                            </label>
                            <Typography variant='text' color={error ? 'error80' : 'neutral-90'} type='normal' className=''>
                                {error ? error : 'Max 5 mb'}
                            </Typography>
                            {loading ? <SmallLoading/> : <></>}
                        </div>
                    </div>
                    {/* <TextArea
                    label='Deskripsi Berita'
                    name='body'
                    value={formValues.body}
                    onChange={handleTextAreaChange}
                    /> */}
                    <Editor
                    name={formValues.body}
                    onChange={handleChangeEditor}
                    />
                <div className='flex mt-10 justify-end'>
                    <Button
                        type={'submit'}
                        label='Upload'
                        id={`tidak`}
                        color={'orange'}
                        size='base'
                        disabled={disabled || search}
                        onClick={()=> console.log(formValues)}
                    />
                </div>
            </form >
            {search ?
                <div className="w-[845px] absolute left-0 bottom-0">
                    <div className="flex justify-start w-full">
                        <Button
                            label='Tutup'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                            className={ formValues.title !== '' ? 'ml-0' : 'ml-auto'}
                        />
                    </div>
                </div>
                : 
                <div className="w-[845px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label={isArchive ? " Simpan & Perbarui Archive" : isDraft ? "Simpan & Perbarui Draft" : editMode ? 'Simpan Ke Archive' : 'Simpan Ke Draft'}
                            id={`draft`}
                            type={'submit'}
                            color={'orangeBorder'}
                            size='base'
                            onClick={isArchive? ()=>handleTOArchive(formValues) : isDraft ? ()=>handleTODraft(formValues) : editMode ? ()=>handleTOArchive(formValues) : ()=>handleTODraft(formValues)}
                            className={ formValues.title !== '' ? 'block' : 'hidden'}
                        />
                        <Button
                            label='Cancel'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                            className={ formValues.title !== '' ? 'ml-0' : 'ml-auto'}
                        />
                    </div>
                </div>
                }
            </div>
        </Modal>
    )
}

export default NewsModal