import React, {useState} from 'react'
import { LoginType } from '../utils/types/DataType';
import Box from '../components/Box'
import { Input, Space } from 'antd';
import Typography from '../components/Typography';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Button from '../components/CustomButton/Button';
import InputPassword from '../components/CustomInput/InputPassword';
import LoadingAlert from '../components/Modal/LoadingAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APIUrl } from '../string';
import logo from '../assets/logo.svg'
import Alert from '../components/Alert/Alert';
import CustomInput from '../components/CustomInput/CustomInput';

const initalFormValues : LoginType = {
  password: ''
}

const NewPassword = () => {
  
  const location = useLocation();
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const [value, setValue] = useState<LoginType>(initalFormValues) 
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value})
  }

  const handleResetPassword =async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setValue(initalFormValues)
    axios.post(`${APIUrl}admin/forgot/update`, {
      token: token,
      password: value.password
    })
    .then((response) => {
      navigate('/')
      Alert('upload')
    })
    .catch((error) => {})
    .finally(() => setLoading(false))
  }
  
  return (
    <div className="flex flex-cols w-screen">
      <LoadingAlert open={loading} loading={loading}/>
      <Box
      id='box-left'
      size='w-[900px] h-screen'
      customStyle='flex justify-center'
      >
        <img src={logo} className='my-auto' alt="logo" />
      </Box>
      <Box
      id='box-rigth'
      bg='bg-primary-100'
      customStyle='flex justify-center'
      >
        <Space direction="vertical" className='my-auto w-[450px]'>
          <form onSubmit={handleResetPassword} className='flex flex-col space-y-5'>
            <div className="">
              <Typography variant='h3' color='white' type='normal'>
                Reset Password
              </Typography>
            </div>
            <div className="">
              <CustomInput
              type='password'
              name='password'
              label='Password'
              placeholder='masukan password baru'
              minilabel='* minimal 6 karakter'
              onChange={handleInputChange}
              value={value.password}
              />
            </div>
            <Button 
            id='resest-intruksi'
            label='Reset Password'
            size='semiLarge' 
            color='orange'
            />
          </form>
        </Space>
      </Box>
    </div>
  )
}

export default NewPassword