import React from 'react'
import Typography from '../Typography'
import { Avatar, Input, Popover } from 'antd'
import { FiSearch } from 'react-icons/fi'
import { useCookies } from 'react-cookie'
import profilePict from '../../assets/default.png'
import { logout } from '../../stores/loginSLice';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
interface props{
    label: string
}

const Headers: React.FC<props> = ({label}) => {
    const [cookie, setCookie, removeCookie] = useCookies(['token', 'id', 'name', 'foto', 'email'])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const content = (
        <span className='text-btnColor w-96'>
            <div className="w-28 flex text-[16px] flex-col space-y-3">
            <p className=' text-start my-auto cursor-pointer' onClick={()=> navigate('/profile')}>Profile</p>
            <p className=' text-start my-auto cursor-pointer' onClick={()=> handleLogout()}>Keluar</p>
            </div>
        </span>
    );
    const handleLogout = () => {
        dispatch(logout());
        removeCookie('name');
        removeCookie('token');
        removeCookie('id');
        removeCookie('foto');
        removeCookie('email');
        navigate("/");
    }
    return (
        <div className="flex justify-between w-11/12 mx-auto mt-10">
            <Typography color='text01' variant='h2' type='medium'>
                {label}
            </Typography>
            <Input
            size='large'
            placeholder="Search"
            prefix={<FiSearch className="site-form-item-icon " />}
            className='w-96 text-base  text-neutral-80 ml-auto'
            />
            <Popover placement="bottom" content={content}  className='cursor-pointer' trigger={'hover'}>
                <Avatar size={54} src={cookie.foto ? cookie.foto : profilePict} className='ml-10 cursor-pointer'/>
            </Popover>
        </div>
    )
}

export default Headers