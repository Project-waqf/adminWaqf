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
interface props{
    label: string
}
const renderTitle = (title: string) => (
    <span>
        {title}
        <a
            style={{ float: 'right' }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
        >
            more
        </a>
    </span>
);
const renderItem = (title: string, status: string) => ({
    value: title,
    label: (
        <div
            style={{
            display: 'flex',
            justifyContent: 'space-between',
            }}
        >
            {title}
            <span>
            <FaMixcloud /> {status}
            </span>
        </div>
    ),
});
const getRandomInt = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const Headers: React.FC<props> = ({label}) => {
    const [cookie, setCookie, removeCookie] = useCookies(['token', 'id', 'name', 'foto', 'email'])
    const dispatch = useDispatch()
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const navigate = useNavigate()
    const {allAsset, totalAllAsset} = useAsset()
    const {allNews, totalAllNews} = useNews()
    console.log(allNews);
    console.log(totalAllNews);
    
    const content = (
        <span className='text-btnColor w-96'>
            <div className="w-28 flex text-[16px] flex-col space-y-3">
            <p className=' text-start my-auto cursor-pointer' onClick={()=> navigate('/profile')}>Profile</p>
            <p className=' text-start my-auto cursor-pointer' onClick={()=> handleLogout()}>Keluar</p>
            </div>
        </span>
    );
    const renderOptions = () =>
    allNews.map((item:any) => renderItem(item.title, item.status));
    // const options = [
    //     {
    //         label: renderTitle('Wakaf'),
    //         options: renderOptions(),
    //     },
    //     {
    //         label: renderTitle('Berita'),
    //         options: [renderItem('AntDesign UI FAQ', 'Online'), renderItem('AntDesign FAQ', 'Online')],
    //     },
    //     {
    //         label: renderTitle('Asset'),
    //         options: [renderItem('AntDesign design language', 'Online')],
    //     },
    // ];
    const generateOptions = (data:any) => {
        return data.map((item:any) => {        
            return {
                value: item,
                label: (
                <div
                    style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    }}
                >
                    <span>
                    Found {item.title} on{' '}
                    <a
                        href={`https://s.taobao.com/search?q=${item.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {item.status}
                    </a>
                    </span>
                    <span>{item.id} results</span>
                </div>
                ),
            };
            });
        };
        const handleSearch = (value: string) => {
            setOptions(value ? generateOptions(allNews) : []);
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
            dropdownMatchSelectWidth={250}
            style={{ width: 250 }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            >
            <Input
            size='large'
            placeholder="Search"
            prefix={<FiSearch className="site-form-item-icon " />}
            className='w-96 text-base  text-neutral-80 ml-auto'
            />
            </AutoComplete>
            <Popover placement="bottom" content={content}  className='cursor-pointer' trigger={'hover'}>
                <Avatar size={54} src={cookie.foto ? cookie.foto : profilePict} className='ml-10 cursor-pointer'/>
            </Popover>
        </div>
    )
}

export default Headers