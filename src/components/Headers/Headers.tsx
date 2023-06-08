import React, { useEffect, useState } from 'react'
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
import axios from 'axios'
import { APIUrl } from '../../string'
import useWakaf from '../../api/hooks/useWakaf'
import { AllDataType } from '../../utils/types/DataType'
interface props{
    label: string
    isSearch?: boolean
}
const Headers: React.FC<props> = ({label, isSearch}) => {
    const [cookie, setCookie, removeCookie] = useCookies(['token', 'id', 'name', 'foto', 'email'])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [query, setQuery] = useState('');
    const [search, setSearch] = useState('')
    const content = (
        <span className='text-btnColor w-96'>
            <div className="w-28 flex text-[16px] flex-col space-y-3">
            <p className=' text-start my-auto cursor-pointer' onClick={()=> navigate('/profile')}>Profile</p>
            <p className=' text-start my-auto cursor-pointer' onClick={()=> handleLogout()}>Keluar</p>
            </div>
        </span>
    );
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const {allNews} = useNews()
    const {allAsset}= useAsset()
    const {allWakaf} = useWakaf()
    const [allData, setAllData] = useState<AllDataType[]>([])
    
    useEffect(() => {
        if (allNews) {
        const newsData: any[] = [] 
            for (let i = 0; i < allNews.length; i++) {
            newsData.push(allNews[i]);
            } 
            if (newsData.length === allNews.length && allAsset) {
            const modifAsset = allAsset.map((item:any)=>{return{...item, title: item.name, name:undefined}})
            const assetData: any[]= []
            for (let i = 0; i < modifAsset.length; i++) {
                assetData.push(modifAsset[i]);
            } if (assetData.length === allAsset.length && allWakaf) {
                const wakafData: any[] = []
                for (let i = 0; i < allWakaf.length; i++) {
                    wakafData.push(allWakaf[i])
                }
                setAllData([...newsData, ...assetData, ...wakafData])
            }
        }
        }
    }, [allNews, allWakaf, allAsset])
    
    const searchResult = async (query: string) => {
            return allData?.filter((item:any) => {
                return query.toLocaleLowerCase() === '' ? item : item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
            }).map((item:any) => ({ 
                    value: item.title,
                    label: (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className='overflow-hidden'>
                        {item.title}
                        </span>
                        </div>
                )
            }))
    };

    const handleSearch = async (value: string) => {
        if (value) {
        const results = await searchResult(value);
        setOptions(results);
        } else {
        setOptions([]);
        }        
    };
    const onSelect = (value: string) => {
        navigate(`/search/${value}`,{
            state: {
            query: value
            }
        })
    };
    const onHandleSearch = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        navigate(`/search/${search}`,{
            state: {
            query: search
            }
        })
    }
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
            <form onSubmit={onHandleSearch} className='ml-auto mt-2'>
            <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{ width: 300 }}
            options={options}
            onSelect={onSelect}
            onSearch={handleSearch}
            disabled={isSearch ? true : false}
            >
            <Input
            onChange={(e)=> setSearch(e.target.value)}
            size='large'
            placeholder="Search"
            prefix={<FiSearch className="site-form-item-icon " />}
            className='w-96 text-base  text-neutral-80'
            />
            </AutoComplete>
            </form>
            <Popover placement="bottom" content={content}  className='cursor-pointer' trigger={'hover'}>
                <Avatar size={54} src={cookie.foto ? cookie.foto : profilePict} className='ml-10 cursor-pointer'/>
            </Popover>
        </div>
    )
}

export default Headers