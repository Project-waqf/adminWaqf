import React, { useState } from 'react'
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

const { Panel } = Collapse;

const initialFormValues: ProfileType = {
    foto: '',
    name: 'paisall',
    email: 'faizatriasaa@gmail.com',
    password: 'jelemagoblog'
}

const Profile = () => {

    const panelStyle = {
        marginBottom: 24,
        border: 'none',
    };
    const [cookie, setCookie] = useCookies(['token', 'id', 'name', 'foto', 'email'])

    const [value, setValue] = useState<ProfileType>(initialFormValues)

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...value, [e.target.name]: e.target.value})
    }
    
    return (
    <>
        <Sidebar/>
        <Display>
            <div className="flex justify-between w-11/12 mx-auto my-10">
                <Typography color='text01' variant='h1' type='medium'>
                    Profile
                </Typography>
                <Avatar size={80} src={'https://lh3.googleusercontent.com/a/AGNmyxZN4w0j4ID5TlK9xm6gHM3tqz8J4f_mTbtJIgby=s96-c-rg-br100'}/>
            </div>
            <div className="flex flex-col bg-white h-fit rounded-xl p-10 space-y-5 mx-auto w-11/12 my-10">
                <div className="flex">
                    <Avatar style={{ verticalAlign: 'middle' }} size={150} src={cookie.foto}/>
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
                <form  className='flex flex-col w-full'>
                    <div className="flex mt-6 w-[1000px]">
                        <Typography color='text01' variant='h4' type='medium' className='w-44 my-4'>
                            Nama
                        </Typography>
                        <div className="w-[523px]">
                            <CustomInput
                            name='nama'
                            type='text'
                            placeholder='Your Name'
                            value={cookie.name}
                            onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="flex mt-6 w-[1000px]">
                        <Typography color='text01' variant='h4' type='medium' className='w-44 my-4'>
                            Email
                        </Typography>
                        <div className="w-[523px]">
                            <CustomInput
                            name='nama'
                            type='text'
                            placeholder='Your Email'
                            value={cookie.email}
                            onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        style={{ background: "#FAFAFA" }}
                        >
                    </Collapse>
                    <div className="flex flex-row justify-end mt-20 space-x-8">
                        <Button
                        id='cancel'
                        color='orangeBorder'
                        size='base'
                        label='Cancel'
                        />
                        <Button
                        id='simpan'
                        color='orange'
                        size='base'
                        label='Simpan'
                        />
                    </div>
                </form>
            </div>
        </Display>
    </>    
    )
}

export default Profile