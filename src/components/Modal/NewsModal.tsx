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
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { FaRegTrashAlt } from 'react-icons/fa';


    interface FormProps {
        onSubmit: (formValues: NewsType) => void;
        handleDelete?: (id: any) => void
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
        id_news: 0,
        title: "",
        body: "",
        picture: null,
        status: ''
    };

const NewsModal: React.FC<FormProps> = ({ onSubmit, handleDelete, editValues, editMode, open, isArchive, isDraft, handleCancel, status, search}) => {
    
    const [formValues, setFormValues] = useState<NewsType>(initialFormValues);
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState<string>()
    const dispatch = useDispatch()
    const draft = useSelector((state: {draft: DraftState}) => state.draft)
    console.log(formValues);
    
    useEffect(() => {
        if (editMode || !editMode) {
            setFormValues({title: editValues.title, body:editValues.body, picture: editValues.picture});
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

    var toolbarOptions = [['bold', 'italic', 'underline'], [{'align': []}]];
    const module = {
        toolbar: toolbarOptions
    }
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
                    <Typography variant='body1' color='text01' type='medium' className={search ? 'block mb-5' : 'hidden' }>
                        Status: <span className={status === "online" ? 'text-green-500':'text-primary-100'}>{status}</span>
                    </Typography>
                    <form className='flex flex-col space-y-5' onSubmit={handleSubmit}>
                    <div className="flex space-x-8">
                        <div className="">
                            <label htmlFor='title'>
                                <Typography variant='h4' color='text01' type='medium' className=''>
                                    Judul <span className='text-error-90'>*</span>
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
                                Gambar <span className='text-error-90'>*</span>
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
                    <div className="h-[280px]">
                        <label htmlFor='due_date'>
                            <Typography variant='h4' color='text01' type='medium' className='mb-1'>
                                Deskripsi Berita
                            </Typography>
                        </label>
                        <ReactQuill modules={module} theme='snow' className='h-[200px]' defaultValue={formValues.body} onChange={(value) => setFormValues({ ...formValues, body: value})}/>
                    </div>
                <div className='flex mt-10 justify-end'>
                    <Button
                        type={'submit'}
                        label='Upload'
                        id={`tidak`}
                        color={'orange'}
                        size='base'
                        disabled={editMode ? false : disabled}
                    />
                </div>
            </form >
            {search ?
                <div className="w-[845px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label='Tutup'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                            className={ formValues.title !== '' ? 'ml-0' : 'ml-auto'}
                        />
                        <button onClick={()=> handleDelete && handleDelete(formValues.id_news)} className={`w-[156px] h-[46px] flex justify-center rounded-[8px] px-2 py-3 font-normal text-sm cursor-pointer transition-all border-none outline-none bg-white text-btnColor hover:bg-btnColor hover:text-white`}>
                            <FaRegTrashAlt className='mt-1 mr-2' />
                            Hapus
                        </button>
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
                            size={isArchive || isDraft ? 'normal' : 'base'}
                            onClick={isArchive? ()=>handleTOArchive(formValues) : isDraft ? ()=>handleTODraft(formValues) : editMode ? ()=>handleTOArchive(formValues) : ()=>handleTODraft(formValues)}
                            className={ formValues.title !== '' ? 'block' : 'hidden'}
                        />
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
                }
            </div>
        </Modal>
    )
}

export default NewsModal