import React, { useEffect, useState } from 'react'
import { Input, Modal, Select,InputNumber, DatePicker, DatePickerProps } from "antd";
import Typography from '../Typography';
import Button from '../CustomButton/Button';
import { SmallLoading } from '../../assets/svg/SmallLoading';
import { WakafType } from '../../utils/types/DataType';
import { TbFileDescription } from "react-icons/tb";
import { wakafToDraft } from "../../stores/draftSilce";
import { wakafToArchive } from '../../stores/archiveSlice';
import { useDispatch } from 'react-redux';
import CurrencyInput from 'react-currency-input-field';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

    interface FormProps {
        onSubmit: (formValues: WakafType) => void;
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
        title: "",
        category: "umum",
        picture: null,
        detail: '',
        due_date: null,
        fund_target: 0,
        collected: 0
    };

    const options = [
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
const WakafModal: React.FC<FormProps> = ({ onSubmit, editValues, editMode, open, isArchive, isDraft, handleCancel, search, status}) => {

    const [formValues, setFormValues] = useState<WakafType>(initialFormValues);
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState<string>()
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalDays, setTotalDays] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        if (editMode) {
            setFormValues(editValues);
        }
    }, [editValues, editMode]);

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

    useEffect(() => {
        if (formValues.title && formValues.detail) {
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
    const handleChange = (value: string) => {
        console.log(`Selected: ${value}`);
        setFormValues({...formValues, category: value})
    };
    const dateChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        setFormValues({...formValues, due_date: dateString})
    }
    const calculateDays = (startDate: any, endDate: any) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
        setTotalDays(days);
    };
    console.log(startDate);
    
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
            collected: formValues.collected
        }
        dispatch(wakafToArchive(newItem))
    }

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
    };
    console.log(formValues);

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

    const handleChangeEditor = (newContent: string) => {
        setFormValues({...formValues, detail: newContent});
    };
    console.log(formValues);
    var toolbarOptions = [['bold', 'italic', 'underline'], [{'align': []}]];
    const module = {
        toolbar: toolbarOptions
    }
    return (
        <Modal
        open={open}
        onCancel={handleCancel} 
        centered closeIcon={search ? false : true}
        style={{padding: 5}}
        title={<Typography color='text01' variant='h2' type='semibold'>{editMode && !search ? 'Edit Wakaf' : editMode && search ? 'Detail Wakaf' : 'Tambah Wakaf'}</Typography>}
        width={1120}
        footer={<></>}>
                <div className="relative mx-5 my-8">
                    <Typography variant='body1' color='text01' type='medium' className={search ? 'block mb-5' : 'hidden' }>
                        Status: <span className={status === "online" ? 'text-green-500':'text-primary-100'}>{status}</span>
                    </Typography>
                    <form className='flex flex-col space-y-5 mb-10' onSubmit={handleSubmit}>
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
                                className={`mt-1 w-[430px]`}
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
                            <label className="block mt-1 bg-btnColor flex justify-center space-x-1 px-2 py-1 w-52 h-10 rounded-lg cursor-pointer" htmlFor="file_input">
                                <TbFileDescription className='text-[24px] mt-0.5 text-whiteBg' />
                                <Typography variant='body1' color='' type='normal' className='text-whiteBg'>
                                    Upload Gambar
                                </Typography>
                            <input name='picture' onChange={handleImageChange} className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" aria-describedby="file_input_help" id="file_input" type="file"/>
                            </label>
                            <Typography variant='text' color={error ? 'error80' : 'neutral-90'} type='normal' className=''>
                                {error ? error : 'Max 5 mb'}
                            </Typography>
                            {loading ? <SmallLoading/> : <></>}
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <div className="">
                                <label htmlFor='category'>
                                    <Typography variant='h4' color='text01' type='medium' className=''>
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
                                disabled={search}
                                />
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                        <div className={editMode ? "block" : "hidden"}>
                                <label >
                                    <Typography variant='h4' color='text01' type='medium' className=''>
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
                                    <Typography variant='h4' color='text01' type='medium' className=''>
                                        Target <span className='text-error-90'>*</span>
                                    </Typography>
                                </label>
                                <CurrencyInput
                                className='input input-bordered h-10 shadow-sm focus:outline-0 focus:border-sky-500 hover:border-sky-500 transition-all placeholder-gray-400 mt-1 w-[200px]'
                                id="fund_target"
                                name="fund_target"
                                prefix='Rp. '
                                decimalSeparator=','
                                groupSeparator='.'
                                placeholder="Rp. "
                                value={formValues.fund_target}
                                decimalsLimit={2}
                                onValueChange={(value, name) => setFormValues({ ...formValues, fund_target: value ? parseInt(value) : 0 })}
                                disabled={search}
                                />
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                        <div className="">
                                <label htmlFor='due_date'>
                                    <Typography variant='h4' color='text01' type='medium' className=''>
                                        Hari <span className='text-error-90'>*</span>
                                    </Typography>
                                </label>
                                <DatePicker name='due_date' onChange={dateChange} placeholder='/Hari' style={{width: 200}} size='large' className='mt-1' disabled={search}/>
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                    </div>
                    {/* <Editor 
                    name={formValues.detail} 
                    onChange={handleChangeEditor}
                    /> */}
                    <div className="h-[280px]">
                        <label htmlFor='due_date'>
                            <Typography variant='h4' color='text01' type='medium' className='mb-1'>
                                Deskripsi Produk
                            </Typography>
                        </label>
                        <ReactQuill modules={module} theme='snow' className='h-[200px]' value={formValues.detail} onChange={(value) => setFormValues({ ...formValues, detail: value})}/>
                    </div>
                    <div className='flex mt-10 justify-end'>
                    <Button
                        type={'submit'}
                        label='Upload'
                        id={`tidak`}
                        color={'orange'}
                        size='base'
                        disabled={disabled}
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
                            size={isArchive || isDraft ? 'normal' : 'base'}
                            onClick={isArchive? ()=>handleTOArchive(formValues) : isDraft ? ()=>handleTODraft(formValues) : editMode ? ()=>handleTOArchive(formValues) : ()=>handleTODraft(formValues)}
                            className={ formValues.title !== '' && formValues.category !== '' && formValues.fund_target !== 0 && formValues.due_date !== '' ? 'block' : 'hidden'}
                        />
                        <Button
                            label='Tutup'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                            className={ formValues.title !== '' && formValues.category !== '' && formValues.fund_target !== 0 && formValues.due_date !== '' ? 'ml-0' : 'ml-auto'}
                        />
                    </div>
                </div>
            }
            </div>
        </Modal>
    )
}

export default WakafModal