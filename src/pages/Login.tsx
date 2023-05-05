import React, { useEffect, useState } from 'react'
import { LoginType } from '../utils/types/DataType';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../stores/loginSLice';
import { APIUrl } from '../string';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const initalFormValues : LoginType = {
  email: '',
  password: ''
}
// Component & Icons
import Box from '../components/Box'
import { Input, Space } from 'antd';
import Typography from '../components/Typography';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import CustomInput from '../components/CustomInput/CustomInput';
import Button from '../components/CustomButton/Button';
import LoadingAlert from '../components/Modal/LoadingAlert';
import Swal from 'sweetalert2';
import { DraftSuccess, UploadSuccess } from '../assets/svg/AlertIcon';
import Alert from '../components/Alert/Alert';
import InputPassword from '../components/CustomInput/InputPassword';
const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState<LoginType>(initalFormValues)
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies(['token', 'id'])

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value})
  }

  const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    setValue(initalFormValues)
    const user: LoginType = {
        email: value.email,
        password: value.password      
    }
    axios.post(`${APIUrl}admin/login`, user)
    .then((response) => {
      console.log("Responese",response.data);
      setCookie("token", response.data.data.token, {path: "/"})
      setCookie("id", response.data.data.id, {path: "/"})
      dispatch(loginSuccess(user))
      navigate('/dashboard')
      Alert('archive')
    })
    .catch((error) => {
      console.log(error);
    }).finally(() => setLoading(false))
  }
  
  return (

    <div className="flex flex-cols w-screen">
      <LoadingAlert open={loading} loading={loading}/>
      <Box
      id='box-left'
      size='w-[800px] h-screen'
      customStyle='flex justify-center'
      >
        <img src='image.png' className='my-auto' alt="logo" />
      </Box>
      <Box
      id='box-rigth'
      bg='bg-primary-100'
      customStyle='flex justify-center'
      >
        <Space direction="vertical" className='my-auto w-[450px]'>
            <div className="mb-5">
              <Typography variant='h3' color='white' type='normal'>
                Selamat Datang!
                <Typography variant='body3' color='white' type='normal' className='mt-2'>
                  Mohon masukan akun anda
                </Typography>
              </Typography>
            </div>
            <form onSubmit={handleLogin} className='flex flex-col space-y-6'>
                <CustomInput
                  name='email'
                  type='email'
                  label='Email'
                  placeholder='example@gmail.com'
                  value={value.email}
                  onChange={handleInputChange}
                />
                <InputPassword
                  label='Password'
                  minilabel='Lupa Password ?'
                  onChange={handleInputChange}
                  value={value.password}
                  onClick={() => navigate('/forgot-password')}
                />
                <Button
                id='masuk'
                label='Masuk'
                color='orange'
                size='full'
                />
            </form>
        </Space>
      </Box>
    </div>
  )
}

export default Login