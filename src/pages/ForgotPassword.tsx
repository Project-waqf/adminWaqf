import React, { useState } from 'react'
import { LoginType } from '../utils/types/DataType';
import Box from '../components/Box'
import { Space } from 'antd';
import Typography from '../components/Typography';
import Button from '../components/CustomButton/Button';
import CustomInput from '../components/CustomInput/CustomInput';
import LoadingAlert from '../components/Modal/LoadingAlert';

const initalFormValues : LoginType = {
  email: ''
}
const ForgotPassword = () => {
  const [value, setValue] = useState<LoginType>(initalFormValues) 
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value})
  }

  const handleForgot =async (e:React.FormEvent<HTMLFormElement>) => {
    setValue(initalFormValues)
  }
  return (
    <div className="flex flex-cols w-screen">
      <LoadingAlert open={loading} loading={loading}/>
      <Box
      id='box-left'
      size='w-[800px] h-screen'
      customStyle='flex justify-center'
      >
        <img src='../assets/logoAlhambra.png' className='my-auto' alt="logo" />
      </Box>
      <Box
      id='box-rigth'
      bg='bg-primary-100'
      customStyle='flex justify-center'
      >
        <Space direction="vertical" className='my-auto w-[450px]'>
          <form onSubmit={handleForgot} className='flex flex-col space-y-7'>
            <div className="">
              <Typography variant='h3' color='white' type='normal'>
                Lupa Password?
                <Typography variant='body3' color='white' type='normal' className='mt-2'>
                  Masukkan alamat email yang Anda gunakan saat bergabung dan kami akan mengirimkan instruksi untuk mengatur ulang kata sandi Anda.
                </Typography>
              </Typography>
            </div>
              <CustomInput
                name='email'
                type='email'
                label='Email'
                placeholder='example@gmail.com'
                value={value.email}
                onChange={handleInputChange}
              />
            <Button 
            id='resest-intruksi'
            label='Kirim Reset Intruksi'
            size='semiLarge' 
            color='orange' 
            onClick={()=> console.log(value)}/>
          </form>
        </Space>
      </Box>
    </div>
  )
}

export default ForgotPassword