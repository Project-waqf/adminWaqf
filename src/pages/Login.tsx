import React, { useEffect, useState } from 'react'
import { LoginType } from '../utils/types/DataType';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../stores/loginSLice';
import { APIUrl } from '../string';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import logo from '../assets/logo.svg';



const initalFormValues : LoginType = {
  email: '',
  password: ''
}
// Component & Icons
import Box from '../components/Box'
import { Space } from 'antd';
import Typography from '../components/Typography';
import CustomInput from '../components/CustomInput/CustomInput';
import Button from '../components/CustomButton/Button';
import LoadingAlert from '../components/Modal/LoadingAlert';
import Alert from '../components/Alert/Alert';

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState<LoginType>(initalFormValues)
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (value.email && value.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value.email, value.password]);
  
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value})
  }

  const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + 2 * 60 * 60 * 1000);
    setValue(initalFormValues);
    const user: LoginType = {
      email: value.email,
      password: value.password,
    };
    axios
      .post(`${APIUrl}admin/login`, user)
      .then((response) => {
        setCookie("token", response.data.data.token, { path: "/", expires: expiration});
        setCookie("id", response.data.data.id, { path: "/" });
        setCookie("name", response.data.data.name, { path: "/" });
        setCookie("email", response.data.data.email, { path: "/" });
        setCookie("foto", response.data.data.image, { path: "/" });
        dispatch(loginSuccess(user));
        navigate("/dashboard");
        Alert()
      })
      .catch((error) => {
        if(error.response.status === 404){
          setValue({email: value.email})
          setErrorEmail("Email tidak terdaftar atau salah")
        } else if (error.response.status === 401){
          setValue({email: value.email, password: value.password})
          setErrorPassword("Password salah")
        }
      })
      .finally(() => setLoading(false));
    };


  useEffect(() => {
    
  }, [])
  
  
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
                  error={errorEmail}
                />
                <CustomInput
                  name='password'
                  type='password'
                  label='Password'
                  placeholder='Masukan password'
                  value={value.password}
                  onChange={handleInputChange}
                  error={errorPassword}
                  minilabel='Lupa password?'
                  onClick={()=> navigate('/forgot-password')}
                />
                <Button
                type="submit"
                id='masuk'
                label={loading ? "loading..." : 'Masuk'}
                color='orange'
                size='full'
                disabled={disabled} 
                />
            </form>
        </Space>
      </Box>
    </div>
  )
}

export default Login

