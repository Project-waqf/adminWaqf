import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Typography from '../components/Typography/Typography'
import { Avatar } from 'antd'
import CustomInput from '../components/CustomInput/CustomInput'
import Display from '../components/DisplayContent/Display'
import { ProfileType } from '../utils/types/DataType'
import InputPassword from '../components/CustomInput/InputPassword'
import Button from '../components/CustomButton/Button'
import { Collapse, theme } from 'antd';
import { useCookies } from 'react-cookie'
import Headers from '../components/Headers/Headers'
import { BsArrowDownShort } from 'react-icons/bs'
import ConfirmAlert from '../components/Alert/ConfirmAlert'
import Alert from '../components/Alert/Alert'
import axios from 'axios'
import { APIUrl } from '../string'
import profilePict from '../assets/default.png'
import { SmallLoading } from '../assets/svg/SmallLoading'

const { Panel } = Collapse;

const Profile = () => {
    
    const [cookie, setCookie] = useCookies(['token', 'id', 'name', 'foto', 'email'])
    const initialFormValues: ProfileType = {
        name: cookie.name,
        email: cookie.email,
        password: 'aasasasasasas',
        old_password: '',
        new_password: '',
        re_password: '',
    }
    

    const [value, setValue] = useState<ProfileType>(initialFormValues)
    const [loading, setLoading] = useState(false)
    const [errorPassword, setErrorPassword] = useState<string>('')
    const [errorOldPassword, setErrorOldPassword] = useState<string>('')
    const [errorValidationPassword, setErrorValidationPassword] = useState<string>('')
    const [withPassword, setWithPassword] = useState(false)
    const [changeFoto, setChangeFoto] = useState(false)
    const [changeImage, setChangeImage] = useState<File | any>()
    const [disable, setDisabled] = useState(false)

    
    useEffect(() => {
        if(value.old_password !== '' && value.re_password !== ''){
            setWithPassword(true)
        } else if(value.old_password === '' && value.re_password === ''){
            setWithPassword(false)
        }
    }, [value.old_password, value.re_password])
    
    useEffect(() => {
        if (changeImage) {
            setChangeFoto(true)
        }
    }, [changeImage])
    console.log(withPassword);
    
    
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...value, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if (value.new_password) {
            isPasswordValid(value.new_password)
        }
    }, [value.new_password])
    const isPasswordValid = (password: string) => {
        // Password validation regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(password);
    };
    

    const customExpandIcon = (panelProps: any) => {
        const { isActive } = panelProps;
        
        if (isActive) {
            return <BsArrowDownShort style={{color: '#FFFFFF'}}/>;
        } else {
            return <BsArrowDownShort style={{color: '#FFFFFF'}}/>;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        setValue(initialFormValues);
        const body = {
            name: value.name,
            email: value.email
        }
        const validation =  await ConfirmAlert('edit')
            if (validation.isConfirmed) {
                setLoading(true)
                try {
                    const response = await axios.put(APIUrl + 'admin/profile', body, {
                        headers: {
                            Authorization: `Bearer ${cookie.token}`,
                            "Content-Type": "application/json",
                        }
                    })
                    setCookie("name", response.data.data.name, { path: "/" });
                    setCookie("email", response.data.data.email, { path: "/" });
                    Alert('edit')
                    setLoading(false)
                    return response 
                } catch (error) {
                    
                }
                setLoading(false)
        }
        setLoading(false)
    };

    const handleSubmitWithPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        setValue(initialFormValues);
        const body = {
            name: value.name,
            email: value.email,
            old_password: value.old_password,
            password: value.new_password
        }
        if (value.new_password === value.re_password) {
            const validation =  await ConfirmAlert('edit')
            if (validation.isConfirmed) {
                setLoading(true)
                try {
                    const response = await axios.put(APIUrl + 'admin/profile', body, {
                        headers: {
                            Authorization: `Bearer ${cookie.token}`,
                            "Content-Type": "application/json",
                        }
                    })
                    Alert('edit')
                    setLoading(false)
                    return response 
                } catch (error:any) {
                    if (error.response.status === 401){
                        setValue({name: value.name,email: value.email, old_password: value.old_password, new_password: value.new_password, re_password: value.re_password, password: value.password})
                        setErrorOldPassword("Password yang anda masukan salah")
                    }
                }
                setLoading(false)
            }
        } else {
            setValue({name: value.name,email: value.email, old_password: value.old_password, new_password: value.new_password, re_password: '', password: value.password})
            setErrorPassword("Password yang anda masukan tidak serasi ")
        }
        setLoading(false)
    };
    const handleChangePicture = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        if (changeImage) {
            const formData = new FormData()
            formData.append('picture', changeImage)
            try {
                const response = await axios.put(APIUrl + 'admin/profile/image', formData, {
                    headers: {
                        Authorization: `Bearer ${cookie.token}`,
                        "Content-Type": "multipart/form-data",
                    }
                })
                setLoading(false)
                setChangeFoto(false)
                setCookie('foto', response.data.data, {path: '/'})
                return response
            } catch (error) {}
        }
    }
    return (
    <>
        <Sidebar/>
        <Display>
        <Headers label='Profile'/>
            <div className="flex flex-col bg-white h-fit rounded-xl p-10 space-y-2 mx-auto w-11/12 my-10 relative">
                <form  className='flex flex-col w-full' onSubmit={changeImage ? handleChangePicture :  withPassword ? handleSubmitWithPassword : handleSubmit}>
                <div className="flex">
                    {changeImage && (
                    <Avatar style={{ verticalAlign: 'middle' }} size={80} src={URL.createObjectURL(changeImage)}/>
                    )}
                    <Avatar style={{ verticalAlign: 'middle' }} size={80} className={changeImage ? "hidden" : 'block'} src={cookie.foto ? cookie.foto : profilePict }/>
                    <div className="flex flex-col justify-center ml-8">
                        <Typography color='text01' variant='h2' type='medium'>
                            {cookie.name}
                        </Typography>
                        <div className="cursor-pointer">
                        <label htmlFor="file_input">
                            <Typography color='btnColor' variant='body1' type='normal'>
                                Ganti Foto Profile
                            </Typography>
                            <input name='picture' onChange={(e)=> setChangeImage(e.target.files?.[0])} className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" aria-describedby="file_input_help" id="file_input" type="file"/>
                        </label>
                        </div>
                    </div>
                    {loading && changeFoto ?
                        <div className="mt-5 ml-5">
                        <SmallLoading/>
                        </div>
                        :
                        <></>
                    }
                </div>
                    <div className="flex mt-6 w-[1000px]">
                        <Typography color='text01' variant='h5' type='medium' className='w-44 my-4'>
                            Nama
                        </Typography>
                        <div className="w-[523px]">
                            <CustomInput
                            name='name'
                            type='text'
                            placeholder='Your Name'
                            value={value.name}
                            onChange={handleInputChange}
                            disable={changeFoto ? true : false}
                            />
                        </div>
                        {loading ?
                            <div className="mt-3 ml-3">
                            <SmallLoading/>
                            </div>
                            :
                            <></>
                        }
                    </div>
                    <div className="flex mt-6 w-[1000px]">
                        <Typography color='text01' variant='h5' type='medium' className='w-44 my-4'>
                            Email
                        </Typography>
                        <div className="w-[523px]">
                            <CustomInput
                            name='email'
                            type='text'
                            placeholder='Your Email'
                            value={value.email}
                            onChange={handleInputChange}
                            disable
                            />
                        </div>
                    </div>
                    <div className="flex mt-6 w-[1000px]">
                        <Typography color='text01' variant='h5' type='medium' className='w-44 my-4'>
                            Password
                        </Typography>
                        <div className="w-[523px]">
                            <CustomInput
                            name='password'
                            type='password'
                            placeholder='Your Email'
                            value={value.email}
                            onChange={handleInputChange}
                            disable={true}
                            />
                        </div>
                    </div>
                    <Collapse
                    bordered={false}
                    className='bg-white'
                    expandIcon={customExpandIcon}
                    >
                        <Panel
                        key={1}
                        header={<Typography variant='btnXS' color="btnColor" type='normal' className="cursor-pointer ml-36">Ganti Password?</Typography>}

                        className=" overflow-hidden bg-white"
                        >
                            <div className="flex mt-6 w-[1000px]">
                                <Typography color='primary-90' variant='h3' type='medium' className='w-44 my-4'>
                                    Ganti Password
                                </Typography>
                            </div>
                            <div className="flex mt-6 w-[1000px]">
                                <Typography color='text01' variant='h5' type='medium' className='w-44 my-4'>
                                    Password Lama
                                </Typography>
                                <div className="w-[523px]">
                                    <CustomInput
                                    name='old_password'
                                    type='password'
                                    value={value.old_password}
                                    onChange={handleInputChange}
                                    placeholder='Masukan Password Lama'
                                    disable={changeFoto ? true : false}
                                    error={errorOldPassword}
                                    />
                                </div>
                                {loading ?
                                <div className="mt-3 ml-3">
                                <SmallLoading/>
                                </div>
                                :
                                <></>
                                }
                            </div>
                            <div className="flex mt-6 w-[1000px]">
                                <Typography color='text01' variant='h5' type='medium' className='w-44 my-4'>
                                    Password Baru
                                </Typography>
                                <div className="w-[523px] flex flex-col">
                                    <CustomInput
                                    name='new_password'
                                    type='password'
                                    placeholder='Masukan Password Baru'
                                    value={value.new_password}
                                    disable={changeFoto ? true : false}
                                    onChange={handleInputChange}
                                    error={!isPasswordValid(value.password) && "*Minimal 6 karakter, dilengkapi minimal 1 huruf kapital, 1 simbol dan 1 angka."}
                                    />
                                    <Typography variant='btnXS' color='text01' type='normal' className='ml-1'>
                                    *Minimal 6 karakter, dilengkapi minimal 1 huruf kapital, 1 simbol dan 1 angka.
                                    </Typography>
                                </div>
                                {loading ?
                                <div className="mt-3 ml-3">
                                <SmallLoading/>
                                </div>
                                :
                                <></>
                                }
                            </div>
                            <div className="flex mt-6 w-[1000px]">
                                <Typography color='text01' variant='h5' type='medium' className='w-44 my-4'>
                                    Ulangin Password
                                </Typography>
                                <div className="w-[523px]">
                                    <CustomInput
                                    name='re_password'
                                    type='password'
                                    placeholder='Ulangi Password'
                                    value={value.re_password}
                                    onChange={handleInputChange}
                                    error={errorPassword}
                                    disable={changeFoto ? true : false}
                                    />
                                </div>
                                {loading ?
                                <div className="mt-3 ml-3">
                                <SmallLoading/>
                                </div>
                                :
                                <></>
                                }
                            </div>
                        </Panel>
                    </Collapse>
                    <div className="flex flex-row w-[720px] justify-end space-x-8">
                        <Button
                        type={'submit'}
                        id='simpan'
                        color='orange'
                        size='base'
                        label='Simpan'
                        disabled={changeFoto ? false : withPassword ? false : value.name !== cookie.name ? false : true}
                        />
                    </div>
                </form>
                        <Button
                        type={'button'}
                        id='cancel'
                        color='orangeBorder'
                        size='base'
                        label='Cancel'
                        className={changeFoto ? 'absolute transition-all bottom-10 right-80 mt-0.5 mr-60' : withPassword ? 'absolute transition-all bottom-10 right-80 mt-0.5 mr-60' : value.name !== cookie.name ? 'absolute transition-all bottom-10 right-80 mt-0.5 mr-60' : 'hidden'}
                        />
            </div>
        </Display>
    </>    
    )
}

export default Profile