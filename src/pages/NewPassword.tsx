import React, {useState} from 'react'
import { LoginType } from '../utils/types/DataType';
import Box from '../components/Box'
import { Input, Space } from 'antd';
import Typography from '../components/Typography';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Button from '../components/CustomButton/Button';
import InputPassword from '../components/CustomInput/InputPassword';
import LoadingAlert from '../components/Modal/LoadingAlert';

const initalFormValues : LoginType = {
  password: ''
}

const NewPassword = () => {
  const [value, setValue] = useState<LoginType>(initalFormValues) 
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value})
  }

  const handleLogin =async (e:React.FormEvent<HTMLFormElement>) => {
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
          <form onSubmit={handleLogin} className='flex flex-col space-y-5'>
            <div className="">
              <Typography variant='h3' color='white' type='normal'>
                Reset Password
              </Typography>
            </div>
            <div className="">
              <InputPassword
              label='Password'
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
            onClick={()=> console.log(value)}/>
          </form>
        </Space>
      </Box>
    </div>
  )
}

export default NewPassword