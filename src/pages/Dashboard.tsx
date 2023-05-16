import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Typography from '../components/Typography'
import { Avatar, Button, Input } from 'antd'
import { FiSearch } from "react-icons/fi";
import CustomCollapse from '../components/Collapse';
import CustomTable from '../components/Table';
import { useCookies } from 'react-cookie';
import Display from '../components/DisplayContent/Display';
import profilePict from '../assets/default.png'
import NewsModal from '../components/Modal/NewsModal';
import { AssetType, NewsType } from '../utils/types/DataType';
import axios from 'axios';
import { APIUrl } from '../string';
import ConfirmAlert from '../components/Alert/ConfirmAlert';
import Alert from '../components/Alert/Alert';
import LoadingAlert from '../components/Modal/LoadingAlert';
import useNews from '../api/News';
import useAsset from '../api/Asset';
import AssetModal from '../components/Modal/AssetModal';
import useCrudApi from '../utils/hooks/useCrudApi';

const initialEditNewsValue: NewsType = {
    title: "",
    body: "",
    picture: null
}
const initialEditAssetValue: AssetType = {
    name: "",
    detail: "",
    picture: null
}

const Dashboard = () => {

    const [isModalNews, setisModalNews] = useState(false);
    const [isModalAsset, setisModalAsset] = useState(false);
    const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])
    const [loading, setLoading] = useState(false)
    // const { data: news, newsErrorLoading: errorloading } = useNews('online', 1)
    const { data: asset} = useAsset('online')
    const { getNews, news, createNews, editedNews } = useCrudApi()

    useEffect(() => {
        if(news === undefined){
            setLoading(true)
            getNews()
            setTimeout(() => {
                setLoading(false)
            }, 3000);
        }
    }, [news])
    

    const showModalNews = () => {
        setisModalNews(true);
    };
    const showModalAsset = () => {
        setisModalAsset(true);
    };
    console.log("ini asset",asset);
    
    const handleCancel = () => {
        ConfirmAlert('cancel').then((res) => {
            if (res.isConfirmed) {
                setisModalNews(false);
                setisModalAsset(false)
                setEditMode(false)
                setEditNews({
                    title: '',
                    body: '',        
                    picture: null,
                });
            }
        })
    };
    const handleNewsDraft = (news: any) => {
        
    }
    const handleAssetDraft = (news: any) => {
        
    }
    const handleAddNews = async (formValues: NewsType) => {
        setLoading(true)
        try {
            const result = await createNews({
                title: formValues.title, 
                body:formValues.body, 
                picture:formValues.picture,
                token: cookie.token
            })
            setLoading(false);
            setisModalNews(false)
            getNews()
            return result
        } catch (error) {}
        };
        
        const handleAddAsset = async (formValues: AssetType) => {
            
        }

        const [editNews , setEditNews] = useState<NewsType>(initialEditNewsValue)
        const [editAsset , setEditAsset] = useState<AssetType>(initialEditAssetValue)
        const [editMode, setEditMode] = useState(false)
        const [selectedId, setSelectedId] = useState<number>()
        
    const handleEditModalNews = (id: number) => {
        setisModalNews(true)
        const selectedNews: any = news.find((item: any) => item.id_news === id);
        if (!selectedNews) {
            return;
        }
        setEditNews({
            title: selectedNews.title,
            body: selectedNews.body,        
            picture: selectedNews.picture,
        });
        setEditMode(true);
        setSelectedId(id);
    }

    const handleEditModalAsset = (id:number) => {
        const selecetedAsset: any= asset.find((item: any) => item.id_asset === id)
        setisModalAsset(true)
        if (!selecetedAsset) {
            return;
        }
        setEditAsset({
            name: selecetedAsset.name,
            detail: selecetedAsset.detail,
            picture: selecetedAsset.picture
        })
    }

    const handleEditNews = async (formValues: NewsType) => {
        setLoading(true);
        try {
            const result = await editedNews({
                title: formValues.title,
                body: formValues.body,
                picture: formValues.picture,
                id: selectedId,
                token: cookie.token
            })
            setisModalNews(false)
            getNews()
            setLoading(false)
            return result
        } catch (error) {
            
        }
    }
    const handleEditAsset = async (formValues: AssetType) => {
        
    }

    console.log(asset);
    
    return (
        <>
            <Sidebar/>
            <Display>
                <LoadingAlert open={loading} loading={loading}/>
                <div className="flex justify-between w-11/12 mx-auto mt-10">
                    <Typography color='text01' variant='h2' type='medium'>
                        Hello Admin!
                    </Typography>
                    <Avatar size={80} src={cookie.foto ? cookie.foto : profilePict}/>
                </div>
                <div className="flex flex-row justify-center space-x-5 mx-auto w-11/12 my-10">
                    <Input
                        size='large'
                        placeholder="Enter your username"
                        prefix={<FiSearch className="site-form-item-icon" />}
                    />
                    
                    <Button 
                    size='large'
                    className=' hover:bg-primary-90 border-primary-100 text-primary-100 hover:text-white w-96'
                    onClick={showModalNews}>
                    + Buat Berita
                    </Button>
                    <Button 
                    size='large'
                    className=' hover:bg-primary-90 border-primary-100 text-primary-100 hover:text-white w-96'
                    onClick={showModalAsset}
                    >
                    + Buat Asset
                    </Button>
                </div>
                <div className="flex flex-col justify-center space-y-5 mx-auto w-11/12 my-10">
                    <CustomCollapse 
                    header='Berita'
                    key={0}
                    > 
                        <CustomTable
                        data={news}
                        handleEdit={handleEditModalNews}
                        />

                    </CustomCollapse>
                    <CustomCollapse 
                    header='Asset'
                    key={2}
                    >
                        <CustomTable
                        data={asset}
                        handleEdit={handleEditModalAsset}
                        />
                    </CustomCollapse>

                    <NewsModal
                    open={isModalNews}
                    handleDraft={handleNewsDraft}
                    handleCancel={handleCancel}
                    editMode={editMode}
                    onSubmit={editMode ? handleEditNews : handleAddNews}
                    editValues={editNews}
                    />
                    <AssetModal 
                    open={isModalAsset}
                    handleDraft={handleAssetDraft}
                    handleCancel={handleCancel}
                    editMode={editMode}
                    onSubmit={editMode ? handleAddAsset : handleEditAsset}
                    editValues={editAsset}
                    />
                </div>
            </Display>
            {/* <ConfirmModal
            open={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            rOrl={false}
            title='Yakin ingin menghapus?'
            /> */}
        </>
    )
}

export default Dashboard