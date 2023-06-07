import React, { useState } from 'react'
import Typography from '../Typography'
import { Avatar, Input, Popover, AutoComplete, SelectProps } from 'antd'
import { FiSearch } from 'react-icons/fi'
import { useCookies } from 'react-cookie'
import profilePict from '../../assets/default.png'
import { logout } from '../../stores/loginSLice';
import { FaMixcloud } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useAsset from '../../api/hooks/useAsset'
import useNews from '../../api/hooks/useNews'
import debounce from 'lodash/debounce';
import axios from 'axios'
import { APIUrl } from '../../string'
interface props{
    label: string
}

const searchResult = async (query: string) => {
    try {
        const response = await axios.get(`${APIUrl}news?status=&page=`);
        console.log('data', response.data);
        const {data} = response.data
        const filteredData = data.filter((item:any)=> item.title.includes(query))
        return response.data.data.map((item: any, index: any) => ({
            value: item.title,
            label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                Found {item.title}
                </span>
            </div>
            ),
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
const Headers: React.FC<props> = ({label}) => {
    const [cookie, setCookie, removeCookie] = useCookies(['token', 'id', 'name', 'foto', 'email'])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [query, setQuery] = useState('');
    const content = (
        <span className='text-btnColor w-96'>
            <div className="w-28 flex text-[16px] flex-col space-y-3">
            <p className=' text-start my-auto cursor-pointer' onClick={()=> navigate('/profile')}>Profile</p>
            <p className=' text-start my-auto cursor-pointer' onClick={()=> handleLogout()}>Keluar</p>
            </div>
        </span>
    );
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);

    const handleSearch = async (value: string) => {
        if (value) {
        const results = await searchResult(value);
        setOptions(results);
        } else {
        setOptions([]);
        }
        console.log(value);
        
    };

    const onSelect = (value: string) => {
        console.log('onSelect', value);
    };
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
            <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{ width: 300 }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            className='ml-auto mt-2'
            >
            <Input
            size='large'
            placeholder="Search"
            prefix={<FiSearch className="site-form-item-icon " />}
            className='w-96 text-base  text-neutral-80'
            />
            </AutoComplete>
            <Popover placement="bottom" content={content}  className='cursor-pointer' trigger={'hover'}>
                <Avatar size={54} src={cookie.foto ? cookie.foto : profilePict} className='ml-10 cursor-pointer'/>
            </Popover>
        </div>
    )
}

export default Headers