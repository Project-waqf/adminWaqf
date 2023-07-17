import { DOMSerializer } from 'prosemirror-model';
import React, { useEffect, useState, useRef } from 'react'
import { Input, Modal, Select,InputNumber, DatePicker, DatePickerProps } from "antd";
import Typography from '../Typography';
import Button from '../CustomButton/Button';
import { SmallLoading } from '../../assets/svg/SmallLoading';
import { WakafType } from '../../utils/types/DataType';
import { FaRegTrashAlt } from 'react-icons/fa'
import { TbFileDescription } from "react-icons/tb";
import { wakafToDraft } from "../../stores/draftSilce";
import { wakafToArchive } from '../../stores/archiveSlice';
import { useDispatch } from 'react-redux';
import CurrencyInput from 'react-currency-input-field';
import TiptapEditor from '../CustomInput/TipTap';
import { Extension, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import moment from 'moment';
import dayjs from 'dayjs';
    interface FormProps {
        onSubmit: (formValues: WakafType) => void;
        handleDelete?: (id: any) => void
        editValues: WakafType;
        editMode?: boolean;
        open: boolean
        isArchive?: boolean
        isDraft?: boolean
        search?: boolean
        status?: any
        handleCancel: React.MouseEventHandler
    }

    const initialFormValues: WakafType = {
        id: 0,
        title: "",
        category: "",
        picture: null,
        detail: '',
        due_date: null,
        fund_target: 0,
        collected: 0, 
        due_date_string: '',
        is_completed: false
    };

    const options = [
        {
            value: '',
            label: `Pilih Kategori`,
        },
        {
            value: 'kesehatan',
            label: 'Program Kesehatan',
        },
        {
            value: 'pembangunan',
            label: 'Produktif Pembangunan',
        },
        {
            value: 'pendidikan',
            label: 'Program Pendidikan',
        },
        {
            value: 'quran',
            label: "Program Quran",
        },
        {
            value: 'dakwah',
            label: "Pijar Dakwah dan Pilar",
        },
        {
            value: 'produktif',
            label: 'Program Usaha Produktif',
        },
        {
            value: 'pangan_barokah',
            label: 'Pangan Barokah',
        },
        {
            value: 'kemanusiaan',
            label: 'Kemanusiaan dan Lingkungan',
        },
    ] 
const WakafModal: React.FC<FormProps> = ({ onSubmit, editValues, editMode, open, isArchive, isDraft, handleCancel, search, status, handleDelete}) => {

    const [formValues, setFormValues] = useState<WakafType>(initialFormValues);
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState<string>()
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalDays, setTotalDays] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch()
    const [content, setContent] = useState<string>(formValues.detail);
    const [resetFlag, setResetFlag] = useState<boolean>(false);
    const [detail, setDetail] = useState<string>('')
    const [imageString, setImageString] = useState('')

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
        } 
    }, [editValues, editMode]);

    useEffect(() => {
        if (formValues && editMode ){
            editor?.commands.setContent(formValues.detail)
        } 
        if (formValues && !editMode) {
            editor?.commands.setContent(formValues.detail)
        }
    }, [formValues.detail])
    

    useEffect(() => {
        if (formValues.due_date) {
            const endsDate = formValues.due_date
            setEndDate(formValues.due_date)
            const today = new Date();
            const formattedDate = today.toISOString().substr(0, 10);
            setStartDate(formattedDate);
            if (startDate) {
                calculateDays(startDate, endsDate)
            }
        }
    }, [formValues.due_date]);

    useEffect(()=>{
        if(detail){
            setFormValues({...formValues, detail: detail})
        } if(detail === '<p></p>') {
            setFormValues({...formValues, detail: ''})
        }
    }, [detail])

    useEffect(() => {
        if (formValues.title && formValues.category && formValues.fund_target && formValues.due_date_string && formValues.detail) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formValues]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
    
    const handleChange = (value: string) => {
        setFormValues({...formValues, category: value})
    }

    const dateChange: DatePickerProps['onChange'] = (date, dateString) => {
        setFormValues({...formValues, due_date_string: dateString})
    }

    const calculateDays = (startDate: any, endDate: any) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setTotalDays(days);
    };
    
    const parser = (displayValue: string | undefined): number | undefined => {
        if (!displayValue) {
            return undefined;
        }
        const numericValue = displayValue.replace(/\$\s?|(,*)/g, '');
        return Number(numericValue);
    };

    const handleTODraft = async (formValues: WakafType) => {
        const newItem: WakafType = {
            title: formValues.title,
            category: formValues.category,
            detail: formValues.detail,
            picture: formValues.picture,
            due_date: formValues.due_date,
            due_date_string: formValues.due_date_string,
            fund_target: formValues.fund_target,
            collected: formValues.collected
        }
        dispatch(wakafToDraft(newItem))
    }
    const handleTOArchive = async (formValues: WakafType) => {
        const newItem: WakafType = {
            title: formValues.title,
            category: formValues.category,
            detail: formValues.detail,
            picture: formValues.picture,
            due_date: formValues.due_date,
            fund_target: formValues.fund_target,
            collected: formValues.collected, 
            due_date_string: formValues.due_date_string
        }
        dispatch(wakafToArchive(newItem))
    }

    const handleImageChange = (e: any) => {
        setLoading(true)
        const file = e.target.files[0];
        const maxSize = 2 * 1024 * 1024; // 5MB in bytes
        if (file && file.size <= maxSize) {
            setFormValues((prev) => ({
                ...prev,
                picture: file
            }));
            setError('');
            setLoading(false)
        } else {
            setFormValues((prev) => ({
                ...prev,
                picture: null
            }));
            setError('File size exceeds the maximum allowed limit (5MB).');
            setLoading(false)
        }
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formValues);
        setFormValues(initialFormValues);
        setResetFlag(true)
    };
    
    useEffect(() => {
        const numberInput = document.getElementById('number-input') as HTMLInputElement | null;
        if (numberInput) {
            numberInput.addEventListener('input', formatCurrency);
        }
        
        return () => {
            if (numberInput) {
                numberInput.removeEventListener('input', formatCurrency);
            }
        };
    }, []);
    
    function formatCurrency() {
        const numberInput = document.getElementById('number-input') as HTMLInputElement | null;
        if (numberInput) {
            const value = parseFloat(numberInput.value);
            if (!isNaN(value)) {
                const formattedValue = value.toLocaleString('id-ID', {
                style: 'currency', 
                currency: 'IDR'
                });
                numberInput.value = formattedValue;
            }
        }
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: content.toString(),
        // Set initial content
        onUpdate({ editor }) {
            // Get the updated HTML content
            // setResetFlag(false)
            setDetail(editor.getHTML())
            console.log(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'focus:outline-none text-[18px] w-full h-[200px] overflow-auto border-solid border-slate-100 rounded-xl'
            }
        },
    });
function disabledDate(current: any) {
    // Disable yesterday's date
    return current && current.isBefore(moment().startOf('day'));
    }
console.log(formValues);

    return (
        <Modal
        open={open}
        onCancel={handleCancel} 
        centered closeIcon={search ? false : true}
        style={{padding: 5}}
        title={<Typography color='text01' variant='h3' type='semibold'>{editMode && !search ? 'Edit Wakaf' : editMode && search ? 'Detail Wakaf' : 'Tambah Wakaf'}</Typography>}
        width={1120}
        footer={<></>}>
                <div className="relative mx-5 my-8">
                    <Typography variant='body1' color='neutral-80' type='reguler' className={search ? 'block mb-5' : 'hidden' }>
                        Status: <span className={status === "online" ? 'text-primary-100':'text-neutral-90'}>{status}</span> 
                        <span className={ formValues.is_completed ? 'text-green-500' : !formValues.is_completed && formValues.due_date > 0 ? 'text-green-500' : 'text-error-90'}>{status === 'draft' ? '' : formValues.is_completed ? '- Completed' : !formValues.is_completed && formValues.due_date > 0 ? '' : '- Not Completed'}</span>
                    </Typography>
                    <form className='flex flex-col space-y-2 mb-10' onSubmit={handleSubmit}>
                    <div className="flex space-x-8">
                        <div className="">
                                <label htmlFor='title'>
                                    <Typography variant='body1' color='text01' type='medium' className=''>
                                        Judul Produk <span className='text-error-90'>*</span>
                                    </Typography>
                                </label>
                                <Input
                                name='title'
                                type='text'
                                placeholder='Masukan Judul'
                                size='large'
                                className={`mt-1 w-[430px]`}
                                value={formValues.title}
                                onChange={handleInputChange}
                                disabled={formValues.is_completed || formValues.due_date === 0 && !isArchive && !isDraft}
                                />
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                        <div className="">
                            <Typography variant='body1' color='text01' type='medium' className='flex'>
                                Gambar <span className={`ml-3 text-error-90 ${isDraft || isArchive ? 'block' : 'hidden'}`}>*</span>
                            </Typography>
                            <label className="block mt-1 bg-btnColor flex justify-center space-x-1 px-2 py-1 w-52 h-10 rounded-lg cursor-pointer" htmlFor="file_input">
                                <TbFileDescription className='text-[24px] mt-0.5 text-whiteBg' />
                                <Typography variant='body1' color='' type='normal' className='text-whiteBg'>
                                    Upload Gambar
                                </Typography>
                            <input disabled={formValues.is_completed || formValues.due_date === 0 && !isArchive && !isDraft} name='picture' onChange={handleImageChange} className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" aria-describedby="file_input_help" id="file_input" type="file"/>
                            </label>
                            <Typography variant='text' color={error ? 'error80' : 'neutral-90'} type='normal' className=''>
                                {error ? error : formValues.picture ? imageString : "Max 2 mb" }
                            </Typography>
                            {loading ? <SmallLoading/> : <></>}
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <div className="">
                                <label htmlFor='category'>
                                    <Typography variant='body1' color='text01' type='medium' className=''>
                                        Kategori <span className='text-error-90'>*</span>
                                    </Typography>
                                </label>
                                <Select
                                size='large'
                                value={formValues.category ? formValues.category : options[0].value}
                                onChange={handleChange}
                                style={{ width: 238}}
                                options={options}
                                className='mt-1'
                                disabled={formValues.is_completed || formValues.due_date === 0 && !isArchive && !isDraft && editMode}
                                />
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                        <div className={editMode && !isDraft ? "block" : "hidden"}>
                                <label >
                                    <Typography variant='body1' color='text01' type='medium' className=''>
                                        Terkumpul
                                    </Typography>
                                </label>
                                <InputNumber
                                value={formValues.collected}
                                defaultValue={formValues.collected}
                                size='large'
                                className='mt-1 text-green-500'
                                style={{width: 200}}
                                formatter={(value) => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={parser as (displayValue: string | undefined) => number | undefined}
                                disabled
                                />
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                        <div className="">
                                <label htmlFor='fund_date'>
                                    <Typography variant='body1' color='text01' type='medium' className=''>
                                        Target <span className='text-error-90'>*</span>
                                    </Typography>
                                </label>
                                <CurrencyInput
                                className='input input-bordered h-10 shadow-sm focus:outline-0 focus:border-sky-500 hover:border-sky-500 transition-all placeholder-gray-400 mt-1 w-[200px] dark:bg-white dark:text-text01'
                                id="fund_target"
                                name="fund_target"
                                prefix='Rp. '
                                decimalSeparator=','
                                groupSeparator='.'
                                placeholder="Rp. "
                                value={formValues.fund_target}
                                decimalsLimit={2}
                                onValueChange={(value, name) => setFormValues({ ...formValues, fund_target: value ? parseInt(value) : 0 })}
                                disabled={formValues.is_completed || formValues.due_date === 0 && !isArchive && !isDraft}
                                />
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                        <div className="">
                                <label htmlFor='due_date'>
                                    <Typography variant='body1' color='text01' type='medium' className=''>
                                        Hari <span className='text-error-90'>*</span>
                                    </Typography>
                                </label>
                                <DatePicker 
                                disabledDate={disabledDate} 
                                name='due_date_string' 
                                defaultValue={formValues.due_date_string} onChange={dateChange} placeholder={`${formValues.due_date_string ? formValues.due_date_string : 'hari' }`} style={{width: 200}} size='large' className='mt-1' disabled={formValues.is_completed} />
                            <Typography variant='body3' color={formValues.due_date < 5 ? 'error90' : 'text01'} type='normal' className={editMode ? 'block my-1' : 'hidden'}>
                                sisa {formValues.due_date} hari
                            </Typography>
                        </div>
                    </div>
                    {/* <Editor 
                    name={formValues.detail} 
                    onChange={handleChangeEditor}
                    /> */}
                    <div className={"h-[280px]"}>
                        <label htmlFor='due_date'>
                            <Typography variant='body1' color='text01' type='medium' className='mb-1'>
                                Deskripsi Produk
                            </Typography>
                        </label>
                        <TiptapEditor editor={editor} value={formValues.detail}/>
                    </div>
                    <div className='flex mt-10 justify-end'>
                    <Button
                        type={'submit'}
                        label={editMode && !isDraft && !isArchive ? "Simpan & dan Perbarui" : 'Upload'}
                        id={`tidak`}
                        color={'orange'}
                        size='normal'
                        className={formValues.is_completed ? "hidden" : "block"}
                        disabled={disabled}
                    />
            </div>
            </form >
            {search ?
                formValues.is_completed ?
                <div className="w-full absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label='Tutup'
                            id={`tidak`}
                            color={'orangeBorder'}
                            size='base'
                            onClick={handleCancel}
                            className={ formValues.title !== '' ? 'ml-0' : 'ml-auto'}
                        />
                        <button onClick={()=> handleDelete && handleDelete(formValues.id)} className={`w-[156px] h-[46px] flex justify-center rounded-[8px] px-2 py-3 font-normal text-sm cursor-pointer transition-all border-none outline-none bg-white text-btnColor hover:bg-btnColor hover:text-white`}>
                            <FaRegTrashAlt className='mt-1 mr-2' />
                            Hapus
                        </button>
                    </div>
                </div>
                : !formValues.is_completed && formValues.due_date === 0 && !isArchive && !isDraft ?
                <div className="w-[765px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label='Tutup'
                            id={`tidak`}
                            color={'orangeBorder'}
                            size='base'
                            onClick={handleCancel}
                            className={ formValues.title !== '' ? 'ml-0' : 'ml-auto'}
                        />
                        <button onClick={()=> handleDelete && handleDelete(formValues.id)} className={`w-[156px] h-[46px] flex justify-center rounded-[8px] px-2 py-3 font-normal text-sm cursor-pointer transition-all border-none outline-none bg-white text-btnColor hover:bg-btnColor hover:text-white`}>
                            <FaRegTrashAlt className='mt-1 mr-2' />
                            Hapus
                        </button>
                    </div>
                </div>
                :
                <div className="w-[765px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label='Tutup'
                            id={`tidak`}
                            color={'orangeBorder'}
                            size='base'
                            onClick={handleCancel}
                            className={ formValues.title !== '' ? 'ml-0' : 'ml-auto'}
                        />
                        <button onClick={()=> handleDelete && handleDelete(formValues.id)} className={`w-[156px] h-[46px] flex justify-center rounded-[8px] px-2 py-3 font-normal text-sm cursor-pointer transition-all border-none outline-none bg-white text-btnColor hover:bg-btnColor hover:text-white`}>
                            <FaRegTrashAlt className='mt-1 mr-2' />
                            Hapus
                        </button>
                    </div>
                </div>
                : formValues.is_completed ?
                <div className="w-full absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label={isArchive ? " Simpan & Perbarui Archive" : isDraft ? "Simpan & Perbarui Draft" : editMode ? 'Simpan Ke Archive' : 'Simpan Ke Draft'}
                            id={`draft`}
                            type={'submit'}
                            color={'orangeBorder'}
                            size={isArchive || isDraft ? 'normal' : 'base'}
                            onClick={isArchive? ()=>handleTOArchive(formValues) : isDraft ? ()=>handleTODraft(formValues) : editMode ? ()=>handleTOArchive(formValues) : ()=>handleTODraft(formValues)}
                            className={ formValues.title !== '' && formValues.category !== '' && formValues.fund_target !== 0 && formValues.due_date !== '' ? 'block' : 'hidden'}
                        />
                        <div className={`flex flex-row space-x-5 justify-end ${ formValues.title !== '' && formValues.category !== '' && formValues.fund_target !== 0 && formValues.due_date !== '' ? 'ml-0' : 'ml-auto'}`}>
                        <button onClick={()=> handleDelete && handleDelete(formValues.id)} className={`w-[156px] h-[46px] flex justify-center rounded-[8px] px-2 py-3 font-normal text-sm cursor-pointer transition-all border-none outline-none bg-white text-btnColor hover:bg-btnColor hover:text-white`}>
                            <FaRegTrashAlt className='mt-1 mr-2' />
                            Hapus
                        </button>
                        <Button
                        label='Tutup'
                        id={`tidak`}
                        color={'orange'}
                        size='base'
                        onClick={handleCancel}
                        />
                        </div>
                    </div>
                </div>
                : !formValues.is_completed && formValues.due_date === 0 && !isArchive && !isDraft ?
                <div className="w-[765px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label={'Tutup'}
                            id={`draft`}
                            type={'submit'}
                            color={'orangeBorder'}
                            size={isArchive || isDraft ? 'normal' : 'base'}
                            onClick={handleCancel}
                            className={ formValues.title !== '' && formValues.category !== '' && formValues.fund_target !== 0 && formValues.due_date_string !== '' ? 'block' : 'hidden'}
                        />
                        <button onClick={()=> handleDelete && handleDelete(formValues.id)} className={`w-[156px] h-[46px] flex justify-center rounded-[8px] px-2 py-3 font-normal text-sm cursor-pointer transition-all border-none outline-none bg-white text-btnColor hover:bg-btnColor hover:text-white`}>
                            <FaRegTrashAlt className='mt-1 mr-2' />
                            Hapus
                        </button>
                    </div>
                </div>
                : 
                <div className="w-[765px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label={isArchive ? " Simpan & Perbarui Archive" : isDraft ? "Simpan & Perbarui Draft" : editMode ? 'Simpan Ke Archive' : 'Simpan Ke Draft'}
                            id={`draft`}
                            type={'submit'}
                            color={'orangeBorder'}
                            size={isArchive || isDraft ? 'normal' : 'base'}
                            onClick={isArchive? ()=>handleTOArchive(formValues) : isDraft ? ()=>handleTODraft(formValues) : editMode ? ()=>handleTOArchive(formValues) : ()=>handleTODraft(formValues)}
                            className={ formValues.title !== '' && formValues.category !== '' && formValues.fund_target !== 0 && formValues.due_date_string !== '' ? 'block' : 'hidden'}
                        />
                        <Button
                            label='Tutup'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                            className={ formValues.title !== '' && formValues.category !== '' && formValues.fund_target !== 0 && formValues.due_date_string !== '' ? 'ml-0' : 'ml-auto'}
                        />
                    </div>
                </div>
            }
            </div>
        </Modal>
    )
}

export default WakafModal