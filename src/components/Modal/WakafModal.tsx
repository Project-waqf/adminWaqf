import React, { useEffect, useState } from 'react'
import { Input, Modal, Select,InputNumber, DatePicker, DatePickerProps } from "antd";
import Typography from '../Typography';
import Button from '../CustomButton/Button';
import { SmallLoading } from '../../assets/svg/SmallLoading';
import { WakafType } from '../../utils/types/DataType';
import TextArea from '../CustomInput/TextArea';
import { TbFileDescription } from "react-icons/tb";
import { wakafToDraft } from "../../stores/draftSilce";
import { wakafToArchive } from '../../stores/archiveSlice';
import { useDispatch, useSelector } from 'react-redux';
import CurrencyInput from 'react-currency-input-field';
import Editor from '../CustomInput/Editor';

    interface FormProps {
        onSubmit: (formValues: WakafType) => void;
        editValues: WakafType;
        editMode: boolean;
        open: boolean
        isArchive?: boolean
        isDraft?: boolean
        handleCancel: React.MouseEventHandler
    }

    const initialFormValues: WakafType = {
        title: "",
        category: "umum",
        picture: null,
        detail: '',
        due_date: '',
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
const WakafModal: React.FC<FormProps> = ({ onSubmit, editValues, editMode, open, isArchive, isDraft, handleCancel}) => {

    const [formValues, setFormValues] = useState<WakafType>(initialFormValues);
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState<string>()
    const dispatch = useDispatch()

    useEffect(() => {
        if (editMode || !editMode) {
            setFormValues(editValues);
        }
    }, [editValues, editMode]);

    const [disabled, setDisabled] = useState(true);

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
            fund_target: formValues.fund_target
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
            fund_target: formValues.fund_target
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
    
    return (
        <Modal
        open={open}
        onCancel={handleCancel} 
        centered closeIcon
        style={{padding: 5}}
        title={<Typography color='text01' variant='h2' type='semibold'>{editMode ? 'Edit Wakaf' : 'Tambah Wakaf'}</Typography>}
        width={1120}
        footer={<></>}>
                <div className="relative mx-5 my-8">
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
                                className={`mt-1 w-[430px]`}
                                value={formValues.title}
                                onChange={handleInputChange}
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
                                        Kategori
                                    </Typography>
                                </label>
                                <Select
                                size='large'
                                value={formValues.category ? formValues.category : options[0].value}
                                onChange={handleChange}
                                style={{ width: 238}}
                                options={options}
                                className='mt-1'
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
                                        Target
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
                                />
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                        <div className="">
                                <label htmlFor='due_date'>
                                    <Typography variant='h4' color='text01' type='medium' className=''>
                                        Hari
                                    </Typography>
                                </label>
                                <DatePicker name='due_date' onChange={dateChange} placeholder='/Hari' style={{width: 200}} size='large' className='mt-1'/>
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                    </div>
                    {/* <TextArea
                    label='Deskripsi Berita'
                    name='detail'
                    value={formValues.detail}
                    onChange={handleTextAreaChange}
                    /> */}
                    <Editor 
                    name={formValues.detail} 
                    onChange={handleChangeEditor}
                    />
                    {/* <FroalaEditorComponent
                    tag="textarea"
                    config={{
                        events: {
                            initialized: function () {
                              // Callback function to be executed when the editor is initialized
                                console.log('Editor initialized');
                              // Perform any additional actions or customization here
                            },
                        },
                        reactIgnoreAttrs: ['class', 'id'],
                        onChange: handleChangeEditor, 
                        placeholderText: 'Type here...',
                        toolbarButtons: ['bold', 'italic', 'underline', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',],
                        quickInsertButtons: ['image', 'table'],
                        customColorButton: '#F98D3E',
                        height: 300,
                    }}
                    model={formValues.detail}
                    onModelChange={handleChangeEditor}
                    /> */}
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
            </div>
        </Modal>
    )
}

export default WakafModal