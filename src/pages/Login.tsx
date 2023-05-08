import React, { useEffect, useState } from 'react'
import { LoginType } from '../utils/types/DataType';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../stores/loginSLice';
import { APIUrl } from '../string';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup.object().shape({
  email: yup.string().required("Email tidak terdaftar atau salah"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "password must be 6 characters")
    .max(30, "password must not exceed 30 characters")
    .matches(/^(?=.*[A-Z])/, "password must contain one uppercase")
    .matches(/^(?=.*[0-9])/, "password must contain one number")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "password must contain one special character"
    ),
});

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
import InputPassword from '../components/CustomInput/InputPassword';
const Login = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState<LoginType>(initalFormValues)
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])
  const [disabled, setDisabled] = useState(true);
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

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
    setValue(initalFormValues);
    const user: LoginType = {
      email: value.email,
      password: value.password,
    };
    axios
      .post(`${APIUrl}admin/login`, user)
      .then((response) => {
        console.log("Responese", response.data);
        setCookie("token", response.data.data.token, { path: "/" });
        setCookie("id", response.data.data.id, { path: "/" });
        setCookie("name", response.data.data.name, { path: "/" });
        setCookie("email", response.data.data.email, { path: "/" });
        setCookie("foto", response.data.data.image, { path: "/" });
        dispatch(loginSuccess(user));
        navigate("/dashboard");
        Alert("archive");
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
  
  return (

    <div className="flex flex-cols w-screen">
      <LoadingAlert open={loading} loading={loading}/>
      <Box
      id='box-left'
      size='w-[900px] h-screen'
      customStyle='flex justify-center'
      >
        <img src='https://github.com/Project-waqf/alhambra-waqf-fe/blob/main/src/assets/logoAlhambra.png' className='my-auto' alt="logo" />
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
                <InputPassword
                  label='Password'
                  minilabel='Lupa Password ?'
                  onChange={handleInputChange}
                  value={value.password}
                  onClick={() => navigate('/forgot-password')}
                  changePassword={true}
                  error={errorPassword}
                />
                <Button
                type="submit"
                id='masuk'
                label='Masuk'
                color='orange'
                size='full'
                onClick={()=> console.log(value)}
                disabled={disabled}
                />
            </form>
        </Space>
      </Box>
    </div>
  )
}

export default Login

