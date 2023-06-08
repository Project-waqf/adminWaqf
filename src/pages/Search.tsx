import Headers from '../components/Headers/Headers'
import Display from '../components/DisplayContent/Display'
import Sidebar from '../components/Sidebar'
import React, { useEffect, useState } from 'react'
import SearchTable from '../components/Table/SearchTable'
import useNews from '../api/hooks/useNews'
import CustomCollapse from '../components/Collapse'
import useAsset from '../api/hooks/useAsset'
import useWakaf from '../api/hooks/useWakaf'
import { AllDataType } from '../utils/types/DataType'
import { Collapse, Input, theme } from 'antd'
import { FiSearch } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
const { Panel } = Collapse;
const Search = () => {

    const {allNews} = useNews()
    const {allAsset}= useAsset()
    const {allWakaf} = useWakaf()
    const location = useLocation()
    const [search, setSearch] = useState('')
    const [allData, setAllData] = useState<AllDataType[]>([])
    const [query, setQuery] = useState(location?.state?.query)

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

    useEffect(() => {
        if (search === "" && query!== '') {
            setSearch(query)
        } if (search.length !== query.length) {
            setQuery('')
        }
    }, [search, query])
    const { token } = theme.useToken();

    const panelStyle = {
        border: 'none',
        borderRadius: token.borderRadiusLG,
    };
    return (
        <>
        <Sidebar/>
        <Display>
        <Headers label='Search' isSearch={true}/>
        <div className="flex flex-col justify-center space-y-5 mx-auto w-11/12 my-10">
        <Collapse
            defaultActiveKey={['1']}
            expandIconPosition={"end"}
            size='large'
            className='w-full border-white shadow-xl'
            ghost
            >
            <Panel
                key={'1'}
                header={<div className='flex space-x-3'><div className='max-h-full w-4 mt-1 bg-primary-100 rounded-xl'></div><h3 className="text-3xl font-normal text-primary-100">Hasil Pencarian</h3></div>}
                style={panelStyle}
                className="bg-white overflow-hidden"
            >
                <Input
                    size='large'
                    placeholder="Search"
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    prefix={<FiSearch className="site-form-item-icon" />}
                    className='w-full text-base  text-neutral-80 mb-10'
                />
                <SearchTable data={allData?.filter((item)=> {
                    return search.toLocaleLowerCase() === "" ? item : item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                })}/>
            </Panel>
        </Collapse>
        </div>
        </Display>
        </>
    )
}

export default Search