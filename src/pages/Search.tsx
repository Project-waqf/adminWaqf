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
import ConfirmAlert from '../components/Alert/ConfirmAlert'
import LoadingAlert from '../components/Modal/LoadingAlert'
import Alert from '../components/Alert/Alert'
import { useCookies } from 'react-cookie'
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

    const {allNews, getAllNews, editedNews, deleteNews} = useNews()
    const {allAsset, getAllAsset, editedAsset, deleteAsset}= useAsset()
    const {allWakaf, getAllWakaf, editedWakaf, deleteWakaf} = useWakaf()
    const location = useLocation()
    const [news, setNews] = useState<any>(initialEditNewsValue)
    const [asset, setAsset] = useState<any>(initialEditAssetValue)
    const [wakaf, setWakaf] = useState<any>(initialEditWakafValue)
    const [isModalNews, setIsModalNews] = useState(false)
    const [isModalAsset, setIsModalAsset] = useState(false)
    const [isModalWakaf, setIsModalWakaf] = useState(false) 
    const [loading, setLoading] = useState(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const [cookie] = useCookies(['token'])
    const [search, setSearch] = useState('')
    const [allData, setAllData] = useState<AllDataType[]>([])
    const [query, setQuery] = useState(location?.state?.query)
    
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const title = searchParams.get('title');    

    useEffect(() => {
        const newsData = allNews?.map((item:any)=> {return {...item, type: 'news'}}) ?? [];
        const modifAsset = allAsset?.map((item:any) => ({ ...item, title: item.name, name: undefined, type: 'asset' })) ?? [];
        const wakafData = allWakaf?.map((item:any)=> {return {...item, type: 'wakaf'}}) ?? [];

        setAllData([...newsData, ...modifAsset, ...wakafData]);
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
                id_news: selectedNews.id_news,
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
                id_asset: id,
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
                id: id,
                title: selectedWakaf.title,
                category: selectedWakaf.category,
                detail: selectedWakaf.detail,
                due_date: selectedWakaf.due_date,
                due_date_string: selectedWakaf.due_date_string,
                fund_target: selectedWakaf.fund_target,
                collected: selectedWakaf.collected,
                status: selectedWakaf.status,
                is_completed: selectedWakaf.is_complete
            })
            setIsModalWakaf(true)
        }
        setSelectedId(id)
    }
    const handleSubmitNews = async (formValues: NewsType) => {
        const validation = await ConfirmAlert('edit')
        if (validation.isConfirmed) {
            setLoading(true);
            try {
                const result = await editedNews({ title: formValues.title, body: formValues.body, picture: formValues.picture, id: selectedId, token: cookie.token})
                getAllAsset()
                getAllNews()
                getAllWakaf()
                setLoading(false)
                setIsModalNews(false)
                Alert('edit')
                return result
            } catch (error) {}
        }
    }
    const handleSubmitWakaf = async (formValues: WakafType) => {
        const validation = await ConfirmAlert('edit')
        if (validation.isConfirmed) {
            setLoading(true);
            try {
                const result = await editedWakaf({ title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date_string, fund_target: formValues.fund_target, id: selectedId, token: cookie.token})
                setIsModalWakaf(false)
                setLoading(false)
                getAllAsset()
                getAllNews()
                getAllWakaf()
                Alert('edit')   
                return result         
            } catch (error) {}
        }
    }
    const handleSubmitAsset = async (formValues: AssetType) => {
        const validation = await ConfirmAlert('edit')
        if (validation.isConfirmed) {
            setLoading(true);
            try {
                const result = await editedAsset({name: formValues.name, detail: formValues.detail, picture: formValues.picture, id: selectedId, token: cookie.token})
                setIsModalAsset(false)
                setLoading(false)
                getAllAsset()
                getAllNews()
                getAllWakaf()
                Alert("edit")
                return result
            } catch (error) {}
        }
    }
    const handleDeleteAsset =async (id: number) => {
        const validation = await ConfirmAlert('delete')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await deleteAsset({id: id, token: cookie.token})
                getAllAsset()
                getAllNews()
                getAllWakaf()
                setIsModalAsset(false)
                setLoading(false)
                Alert("delete")
                return response
            } catch (error) {}
        }
    }
    const handleDeleteWakaf =async (id: number) => {
        const validation = await ConfirmAlert('delete')
        if (validation.isConfirmed) {
        setLoading(true)   
        try {
            const result = await deleteWakaf({ id: id, token: cookie.token })
            getAllAsset()
            getAllNews()
            getAllWakaf()
            setLoading(false)
            setIsModalWakaf(false)
            return result
        } catch (error) {}
        }
    }
    const handleDeleteNews =async (id: number) => {
        const validation = await ConfirmAlert('delete')
        if (validation.isConfirmed) {
        setLoading(true)
        try {
            const result = await deleteNews({ id: selectedId, token: cookie.token })
            getAllAsset()
            getAllNews()
            getAllWakaf()
            setIsModalNews(false)
            setLoading(false)
            Alert('delete')
            return result
        } catch (error) {}
        setLoading(false)
        }
    }
    return (
        <>
        <Sidebar/>
        <Display>
        <LoadingAlert loading={loading} open={loading} />
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
        onSubmit={handleSubmitNews}
        editMode={true}
        handleDelete={handleDeleteNews}
        search={true}
        status={news.status}
        />
        <AssetModal
        open={isModalAsset}
        editValues={asset}
        handleCancel={handleCancle}
        onSubmit={handleSubmitAsset}
        editMode={true}
        handleDelete={handleDeleteAsset}
        search={true}
        status={asset.status}
        />
        <WakafModal
        open={isModalWakaf}
        editValues={wakaf}
        handleCancel={handleCancle}
        onSubmit={handleSubmitWakaf}
        editMode={true}
        handleDelete={handleDeleteWakaf}
        search={true}
        status={wakaf.status}
        />
        </div>
        </Display>
        </>
    )
}

export default Search