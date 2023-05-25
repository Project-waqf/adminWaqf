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
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errorPassword, setErrorPassword] = useState<string>('') 
    
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...value, [e.target.name]: e.target.value})
    }

    const customExpandIcon = (panelProps: any) => {
        const { isActive } = panelProps;
        
        if (isActive) {
            return <BsArrowDownShort style={{color: '#FFFFFF'}}/>;
        } else {
            return <BsArrowDownShort style={{color: '#FFFFFF'}}/>;
        }
    };
    
    console.log(passwordsMatch);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        setValue(initialFormValues);
        const body = {
            name: value.name,
            email: value.email,
            old_password: value.old_password,
            new_password: value.new_password
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
                } catch (error) {
                    
                }
                setLoading(false)
            }
        } else {
            setErrorPassword("Password Tidak sama")
        }
        setLoading(false)
    };
    return (
    <>
        <Sidebar/>
        <Display>
        <Headers label='Profile'/>
            <div className="flex flex-col bg-white h-fit rounded-xl p-10 space-y-2 mx-auto w-11/12 my-10">
                <div className="flex">
                    <Avatar style={{ verticalAlign: 'middle' }} size={80} src={cookie.foto}/>
                    <div className="flex flex-col justify-center ml-8">
                        <Typography color='text01' variant='h2' type='medium'>
                            {cookie.name}
                        </Typography>
                        <div className="cursor-pointer">
                            <Typography color='btnColor' variant='body1' type='normal'>
                                Ganti Foto Profile
                            </Typography>
                        </div>
                    </div>
                </div>
                <form  className='flex flex-col w-full' onSubmit={handleSubmit}>
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
                            />
                        </div>
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
                                <div className="w-[523px]">
                                    <CustomInput
                                    name='new_password'
                                    type='password'
                                    placeholder='Masukan Password Baru'
                                    value={value.new_password}
                                    onChange={handleInputChange}
                                    error={errorPassword}
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
                        type={'button'}
                        id='cancel'
                        color='orangeBorder'
                        size='base'
                        label='Cancel'
                        />
                        <Button
                        type={'submit'}
                        id='simpan'
                        color='orange'
                        size='base'
                        label='Simpan'
                        onClick={()=> console.log(value)}
                        />
                    </div>
                </form>
            </div>
        </Display>
    </>    
    )
}

export default Profile