import React, { useEffect, useState } from 'react'
import { DatePicker, DatePickerProps, Input, InputNumber, Modal, Select, } from "antd";
import Typography from '../Typography';
import Button from '../CustomButton/Button';
import { SmallLoading } from '../../assets/svg/SmallLoading';
import { AssetType, NewsType, WakafType } from '../../utils/types/DataType';
import TextArea from '../CustomInput/TextArea';
import { TbFileDescription } from "react-icons/tb";
import { DraftState, newsToDraft } from "../../stores/draftSilce";
import { useDispatch, useSelector } from 'react-redux';
import Editor from '../CustomInput/Editor';
import CurrencyInput from 'react-currency-input-field';


    interface FormProps {
        onSubmit: (formValues: NewsType) => void
        editValues: NewsType 
        mode: boolean
        open: boolean
        handleCancel: React.MouseEventHandler
        type: string
    }
    const initialNewsFormValues: NewsType = {
        title: "",
        body: "",
        picture: null
    };
    const initialAssetFormValues: AssetType = {
        name: "",
        detail: "",
        picture: null
    };
    const initialWakafFormValues: WakafType = {
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
const ArchiveModal: React.FC<FormProps> = ({type, onSubmit, editValues, mode, open, handleCancel}) => {
    
    const [newsFormValues, setNewsFormValues] = useState<NewsType>(initialNewsFormValues);
    const [assetFormValues, setAssetFormValues] = useState<AssetType>(initialAssetFormValues);
    const [wakafFormValues, setWakafFormValues] = useState<WakafType>(initialWakafFormValues);
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState<string>()
    const dispatch = useDispatch()
    const draft = useSelector((state: {draft: DraftState}) => state.draft)
    const [disabled, setDisabled] = useState(true);
    
    useEffect(() => {
        if (mode || !mode) {
            setNewsFormValues(editValues);
        }
    }, [editValues, mode]);


    useEffect(() => {
        if (newsFormValues.title && newsFormValues.body) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [newsFormValues]);

    useEffect(() => {
        if (assetFormValues.name && assetFormValues.detail) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [assetFormValues]);  
    
    useEffect(() => {
        if (wakafFormValues.title && wakafFormValues.detail) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [wakafFormValues]);  

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewsFormValues({ ...newsFormValues, [e.target.name]: e.target.value });
        setAssetFormValues({ ...assetFormValues, [e.target.name]: e.target.value });
        setWakafFormValues({ ...wakafFormValues, [e.target.name]: e.target.value });
    }
    
    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewsFormValues({ ...newsFormValues, [e.target.name]: e.target.value });
        setAssetFormValues({ ...assetFormValues, [e.target.name]: e.target.value });
    };
    
    const handleTODraft = async (formValues: NewsType) => {
        const newItem: NewsType = {
            title: formValues.title,
            body: formValues.body,
            picture: formValues.picture
        }
        dispatch(newsToDraft(newItem))
    }
    const handleChangeEditor = (newContent: string) => {
        setNewsFormValues({...newsFormValues, body: newContent});
    };
    const handleImageChange = (e: any) => {
        setLoading(true)
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file && file.size <= maxSize) {
            setNewsFormValues((prev) => ({
                ...prev,
                picture: file
            }));
            setAssetFormValues((prev) => ({
                ...prev,
                picture: file
            }));
            setError('');
        } else {
            setNewsFormValues((prev) => ({
                ...prev,
                picture: null
            }));
            setAssetFormValues((prev) => ({
                ...prev,
                picture: null
            }));
            setError('File size exceeds the maximum allowed limit (5MB).');
        }
        setLoading(false)
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(newsFormValues);
        setNewsFormValues(initialNewsFormValues);
        
    };
    const charCount = assetFormValues.detail.length
    const maxLength = 160;
    const parser = (displayValue: string | undefined): number | undefined => {
        if (!displayValue) {
            return undefined;
        }
        
        const numericValue = displayValue.replace(/\$\s?|(,*)/g, '');
        return Number(numericValue);
    };
    const handleChange = (value: string) => {
        console.log(`Selected: ${value}`);
        setWakafFormValues({...wakafFormValues, category: value})
    };
    const dateChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        setWakafFormValues({...wakafFormValues, due_date: dateString})
    }
    return (
        type === 'news' ? 
        <Modal
        open={open}
        onCancel={handleCancel} 
        centered closeIcon
        style={{padding: 5}}
        title={<Typography color='text01' variant='h1' type='semibold'>{mode ? 'Edit Berita' : 'Tambah Berita'}</Typography>}
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
                                className={`mt-2 h-12 w-[430px] border-neutral-80`}
                                value={newsFormValues.title}
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
                            <Typography variant='text' color={error ? 'error80' : 'neutral-90'} type='normal' className=''>
                                {error ? error : 'Max 5 mb'}
                            </Typography>
                            {loading ? <SmallLoading/> : <></>}
                        </div>
                    </div>
                    {/* <TextArea
                    label='Deskripsi Berita'
                    name='body'
                    value={newsFormValues.body}
                    onChange={handleTextAreaChange}
                    /> */}
                    <Editor
                    name={newsFormValues.body}
                    onChange={handleChangeEditor}
                    />
                <div className='flex mt-10 justify-end'>
                    <Button
                        type={'submit'}
                        label='Upload'
                        id={`tidak`}
                        color={'orange'}
                        size='base'
                        disabled={disabled}
                        onClick={()=> console.log(newsFormValues)}
                    />
                </div>
            </form >
                <div className="w-[845px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label={mode ? 'Simpan Ke Archive' : 'Simpan Ke Draft'}
                            id={`draft`}
                            type={'submit'}
                            color={'orangeBorder'}
                            size='base'
                            className={ newsFormValues.title !== '' ? 'block' : 'hidden'}
                        />
                        <Button
                            label='Cancel'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                            className={ newsFormValues.title !== '' ? 'ml-0' : 'ml-auto'}
                        />
                    </div>
                </div>
            </div>
        </Modal>
        : type === 'asset' ? 
        <Modal
        open={open}
        onCancel={handleCancel} 
        centered closeIcon
        style={{padding: 0}}
        title={<Typography color='text01' variant='h1' type='semibold' className='ml-[32px]'>{mode ? 'Edit Asset' : 'Tambah Asset'}</Typography>}
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
                                value={assetFormValues.name}
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
                        className="block w-full mt-2 py-2 px-3 text-base text-text01 rounded-lg border-neutral-80 focus:outline-none focus:border-blue-500" placeholder='isi Detail' name='detail' value={assetFormValues.detail} onChange={handleTextAreaChange}></textarea>
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
                        onClick={()=> console.log(assetFormValues)}
                    />
            </div>
            </form >
                <div className="w-[640px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label={mode ? 'Simpan Ke Archive' : 'Simpan Ke Draft'}
                            id={`draft`}
                            color={'orangeBorder'}
                            size='base'
                            className={ assetFormValues.name !== '' ? 'block' : 'hidden'}
                        />
                        <Button
                            label='Cancel'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                            className={ assetFormValues.name !== '' ? 'ml-0' : 'ml-auto'}
                        />
                    </div>
                </div>
            </div>
        </Modal>
        : type === 'wakaf' ?
        <Modal
        open={open}
        onCancel={handleCancel} 
        centered closeIcon
        style={{padding: 5}}
        title={<Typography color='text01' variant='h2' type='semibold'>{mode ? 'Edit Wakaf' : 'Tambah Wakaf'}</Typography>}
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
                                value={wakafFormValues.title}
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
                                value={wakafFormValues.category ? wakafFormValues.category : options[0].value}
                                onChange={handleChange}
                                style={{ width: 238}}
                                options={options}
                                className='mt-1'
                                />
                            <Typography variant='body3' color='error80' type='normal' className='my-2'>

                            </Typography>
                        </div>
                        <div className={mode ? "block" : "hidden"}>
                                <label >
                                    <Typography variant='h4' color='text01' type='medium' className=''>
                                        Terkumpul
                                    </Typography>
                                </label>
                                <InputNumber
                                value={wakafFormValues.collected}
                                defaultValue={wakafFormValues.collected}
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
                                value={wakafFormValues.fund_target}
                                decimalsLimit={2}
                                onValueChange={(value, name) => setWakafFormValues({ ...wakafFormValues, fund_target: value ? parseInt(value) : 0 })}
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
                    name={wakafFormValues.detail} 
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
                        onClick={()=> console.log(wakafFormValues)}
                    />
            </div>
            </form >
                <div className="w-[845px] absolute left-0 bottom-0">
                    <div className="flex justify-between w-full">
                        <Button
                            label={mode ? 'Simpan Ke Archive' : 'Simpan Ke Draft'}
                            id={`draft`}
                            type={'submit'}
                            color={'orangeBorder'}
                            size='base'
                            className={ wakafFormValues.title !== '' ? 'block' : 'hidden'}
                        />
                        <Button
                            label='Cancel'
                            id={`tidak`}
                            color={'whiteOrange'}
                            size='base'
                            onClick={handleCancel}
                            className={ wakafFormValues.title !== '' ? 'ml-0' : 'ml-auto'}
                        />
                    </div>
                </div>
            </div>
        </Modal>
        :
        <>
        </>
    )
}

export default ArchiveModal