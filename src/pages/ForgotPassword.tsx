import React, { useEffect, useState } from 'react'
import { LoginType } from '../utils/types/DataType';
import Box from '../components/Box'
import { Space } from 'antd';
import Typography from '../components/Typography';
import Button from '../components/CustomButton/Button';
import CustomInput from '../components/CustomInput/CustomInput';
import LoadingAlert from '../components/Modal/LoadingAlert';
import { APIUrl } from '../string';
import axios from 'axios';
import Alert from '../components/Alert/Alert';
import logo from '../assets/logo.svg'
import Swal from 'sweetalert2';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const initalFormValues : LoginType = {
  email: ''
}
const ForgotPassword = () => {
  const [value, setValue] = useState<LoginType>(initalFormValues) 
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true);
  const [errorEmail, setErrorEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (value.email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value.email]);
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value})
  }

  const handleForgot =async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setValue(initalFormValues)
    axios.post(`${APIUrl}admin/forgot`, {email: value.email})
    .then((response) => {
      Swal.fire({
        icon: "info",
        title: "Silahkan Cek Email Anda",
        confirmButtonText: "Cek Email",
        confirmButtonColor: "#F98D3E",
      }).then((cekEmail) => {
        if (cekEmail.isConfirmed) {
          window.open(`https://mail.google.com/mail/u/0/#inbox`)
        }
      })
    })
    .catch((error) => {
      Alert('fail')
      if(error.response.status === 404){
        setValue({email: value.email})
        setErrorEmail("Email tidak terdaftar atau salah")
      }
    }).finally(() => setLoading(false))
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
      customStyle='relative flex justify-center'
      >
        <button 
        onClick={()=> navigate('/')}
        className="btn btn-circle bg-white text-btnColor hover:text-white text-[25px] w-12 h-10 hover:bg-btnColor hover:border-none border-none absolute top-14 left-10">
          <IoIosArrowBack className='text-40'/>
        </button>
        <Space direction="vertical" className='my-auto w-[490px]'>
          <form onSubmit={handleForgot} className='flex flex-col space-y-7'>
            <div className="">
              <Typography variant='h1' color='white' type='normal'>
                Lupa Password?
                <Typography variant='body3' color='white' type='normal' className='mt-2'>
                Masukan alamat email yang anda gunakan saat bergabung dan kami akan mengirimkan instruksi untuk mengatur ulang kata sandi anda.
                </Typography>
              </Typography>
            </div>
              <CustomInput
                error={errorEmail}
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
            disabled={disabled}/>
          </form>
        </Space>
      </Box>
    </div>
  )
}

export default ForgotPassword