import Headers from '../components/Headers/Headers'
import Display from '../components/DisplayContent/Display'
import Sidebar from '../components/Sidebar'
import React, { useEffect, useState } from 'react'
import SearchTable from '../components/Table/SearchTable'
import useNews from '../api/hooks/useNews'
import CustomCollapse from '../components/Collapse'
import useAsset from '../api/hooks/useAsset'
import useWakaf from '../api/hooks/useWakaf'
import { AllDataType, AssetType, NewsType, WakafType } from '../utils/types/DataType'
import { Collapse, Input, theme } from 'antd'
import { FiSearch } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import NewsModal from '../components/Modal/NewsModal'
import AssetModal from '../components/Modal/AssetModal'
import WakafModal from '../components/Modal/WakafModal'
const { Panel } = Collapse;
const initialEditNewsValue = {
    title: "",
    body: "",
    picture: null,
    status: ''
}
const initialEditAssetValue = {
    name: '',
    detail: '',
    picture: null,
    status: ""
}
const initialEditWakafValue = {
    title: "",
    category: "",
    picture: null,
    detail: '',
    due_date: '',
    fund_target: 0,
    collected: 0,
    status: ''
}
const Search = () => {

    const {allNews} = useNews()
    const {allAsset}= useAsset()
    const {allWakaf} = useWakaf()
    const location = useLocation()
    const [news, setNews] = useState<any>(initialEditNewsValue)
    const [asset, setAsset] = useState<any>(initialEditAssetValue)
    const [wakaf, setWakaf] = useState<any>(initialEditWakafValue)
    const [isModalNews, setIsModalNews] = useState(false)
    const [isModalAsset, setIsModalAsset] = useState(false)
    const [isModalWakaf, setIsModalWakaf] = useState(false) 
    const [search, setSearch] = useState('')
    const [allData, setAllData] = useState<AllDataType[]>([])
    const [query, setQuery] = useState(location?.state?.query)

    useEffect(() => {
        if (allNews) {
        const newsData: any[] = [] 
        const modifNews = allNews.map((item:any)=> {return {...item, type: 'news'}})
            for (let i = 0; i < modifNews.length; i++) {
            newsData.push(modifNews[i]);
            } 
            if (newsData.length === allNews.length && allAsset) {
                const assetData: any[]= []
                const modifAsset = allAsset.map((item:any)=>{return{...item, title: item.name, type: 'asset', name:undefined}})
            for (let i = 0; i < modifAsset.length; i++) {
                assetData.push(modifAsset[i]);
            } if (assetData.length === allAsset.length && allWakaf) {
                const wakafData: any[] = []
                const modifWakaf = allWakaf.map((item:any)=> {return {...item, type: 'wakaf'}})
                for (let i = 0; i < modifWakaf.length; i++) {
                    wakafData.push(modifWakaf[i])
                }
                setAllData([...newsData, ...assetData, ...wakafData])
            }
        }
        }
    }, [allNews, allWakaf, allAsset])

    console.log(allData);
    
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
    console.log('news', news);
    console.log('asset', asset);
    console.log('wakaf', wakaf);
    const handleCancle = () => {
        setIsModalAsset(false)
        setIsModalNews(false)
        setIsModalWakaf(false)
    }
    const handleDetail = async (id:number, type:string) => {
        if (type === 'news'){
            const selectedNews = allData.find((item:any)=> item.id_news === id)
            if (!selectedNews) {
                return;
            }
            setNews({
                title: selectedNews.title,
                body: selectedNews.body,
                status: selectedNews.status
            })
            setIsModalNews(true)
        }if (type === 'asset'){
            const selectedAsset = allData.find((item:any)=> item.id_asset === id)
            if (!selectedAsset) {
                return;
            }
            setAsset({
                name: selectedAsset.title,
                detail: selectedAsset.detail,
                status: selectedAsset.status
            })
            setIsModalAsset(true)
        }if (type === 'wakaf'){
            const selectedWakaf = allData.find((item:any)=> item.id === id)
            if (!selectedWakaf) {
                return;
            }
            setWakaf({
                title: selectedWakaf.title,
                detail: selectedWakaf.detail,
                fund_target: selectedWakaf.fund_target,
                collected: selectedWakaf.collected,
                due_date: selectedWakaf.due_date,
                status: selectedWakaf.status
            })
            setIsModalWakaf(true)
        }
    }
    const handleSubmit = () => {

    }
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
                    return search.toLocaleLowerCase() === "" ? item : item?.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                })}
                handleDetail={handleDetail}
                />
            </Panel>
        </Collapse>
        <NewsModal
        open={isModalNews}
        editValues={news}
        handleCancel={handleCancle}
        onSubmit={handleSubmit}
        editMode={true}
        search={true}
        status={news.status}
        />
        <AssetModal
        open={isModalAsset}
        editValues={asset}
        handleCancel={handleCancle}
        onSubmit={handleSubmit}
        editMode={true}
        search={true}
        status={asset.status}
        />
        <WakafModal
        open={isModalWakaf}
        editValues={wakaf}
        handleCancel={handleCancle}
        onSubmit={handleSubmit}
        editMode={true}
        search={true}
        status={wakaf.status}
        />
        </div>
        </Display>
        </>
    )
}

export default Search