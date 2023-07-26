import React, { useEffect, useRef, useState } from 'react'
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
import { FaRegTrashAlt } from 'react-icons/fa';
import TiptapEditor from '../CustomInput/TipTap';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';


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
    const [detail, setDetail] = useState<string>('')
    const [disabled, setDisabled] = useState(true);
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
            setFormValues({title: editValues.title, body:editValues.body, picture: editValues.picture});
            setError('')
        }
    }, [editValues, editMode]);

    
    useEffect(() => {
        if (formValues.title && formValues.body) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formValues]);

    useEffect(() => {
        if (formValues && editMode ){
            editor?.commands.setContent(formValues.body)
        } 
        if (formValues && !editMode) {
            editor?.commands.setContent(formValues.body)
        }
    }, [formValues.body])

    useEffect(()=>{
        if(detail){
            setFormValues({...formValues, body: detail})
        } if(detail === '<p></p>') {
            setFormValues({...formValues, body: ''})
        }
    }, [detail])

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
    console.log(detail);
    const handleEditorChange = (value: any) => {
         // Get the updated HTML content
        setDetail(value)
    }
    const editor = useEditor({
        extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        ],
        content: formValues.body.toString(),
         // Set initial content
        onUpdate:({editor})=>{
            const content = editor.getHTML()
            handleEditorChange(content)
        },
        editorProps: {
            attributes: {
                class: 'focus:outline-none text-[18px] w-full h-[200px] overflow-auto border-solid border-neutral-80 border-solid border-slate-100 rounded-xl'
            }
        }
    });
    
    return (
        <Modal
        open={open}
        onCancel={handleCancel} 
        centered closeIcon
        style={{padding: 5}}
        title={<Typography color='text01' variant='h3' type='semibold'>{editMode && !search ? 'Edit Berita' : editMode && search ? 'Detail Berita' : 'Tambah Berita'}</Typography>}
        width={1120}
        footer={<></>}>
                <div className="relative mx-5 my-8">
                    <Typography variant='body1' color='text01' type='medium' className={search ? 'block mb-5' : 'hidden' }>
                        Status: <span className={status === "online" ? 'text-green-500':'text-primary-100'}>{status}</span>
                    </Typography>
                    <form className='flex flex-col space-y-2' onSubmit={handleSubmit}>
                    <div className="flex space-x-8">
                        <div className="">
                            <label htmlFor='title'>
                                <Typography variant='body1' color='text01' type='medium' className=''>
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
                            />
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                        <div className="">
                            <Typography variant='body1' color='text01' type='medium' className=''>
                                Gambar <span className='text-error-90'>*</span>
                            </Typography>
                            <label className={"block mt-2 bg-btnColor flex justify-center space-x-1 p-2 w-52 h-12 rounded-lg cursor-pointer"} htmlFor="file_input">
                                <TbFileDescription className='text-[28px] text-whiteBg' />
                                <Typography variant='h5' color='' type='normal' className='mt-0.5 text-whiteBg'>
                                    Upload Gambar
                                </Typography>
                            <input 
                            name='picture' 
                            onChange={handleImageChange} 
                            className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" 
                            id="file_input" 
                            type="file"
                            ref={fileInputRef}
                            />
                            </label>
                            <Typography variant='text' color={error ? 'error80' : 'neutral-90'} type='normal' className=''>
                                {error ? error : formValues.picture ? imageString : 'Max 2 mb'}
                            </Typography>
                            {loading ? <SmallLoading/> : <></>}
                        </div>
                    </div>
                    <div className="h-[280px]">
                        <label htmlFor='due_date'>
                            <Typography variant='body1' color='text01' type='medium' className='mb-1'>
                                Deskripsi Berita
                            </Typography>
                        </label>
                        <TiptapEditor editor={editor} value={formValues.body} />
                    </div>
                <div className='flex mt-10 justify-end'>
                    <Button
                        type={'submit'}
                        label={editMode && !isDraft && !isArchive ? "Simpan & dan Perbarui" : 'Upload'}
                        id={`tidak`}
                        color={'orange'}
                        size='normal'
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
                <div className="w-[780px] absolute left-0 bottom-0">
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