import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Typography from '../components/Typography'
import { Pagination, Space } from 'antd'
import CustomCollapse from '../components/Collapse';
import { useCookies } from 'react-cookie';
import Display from '../components/DisplayContent/Display';
import { WakafType } from '../utils/types/DataType';
import ConfirmAlert from '../components/Alert/ConfirmAlert';
import LoadingAlert from '../components/Modal/LoadingAlert';
import Headers from '../components/Headers/Headers';
import WakafTable from '../components/Table/WakafTable';
import WakafModal from '../components/Modal/WakafModal';
import useWakaf from '../api/hooks/useWakaf';
import useDashboard from '../api/hooks/useDashboard';
import Card from '../components/Card/Card';
import Alert from '../components/Alert/Alert';

const initialEditValue: WakafType = {
    title: "",
    category: "",
    picture: null,
    detail: '',
    due_date: '',
    fund_target: 0,
    collected: 0
}
const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState<number>(1)
    const { wakaf, getWakaf, totalOnlineWakaf , editedWakaf, archiveWakaf, deleteWakaf } = useWakaf()
    const {dashboardData} = useDashboard()

    console.log(wakaf);
    
    
    useEffect(() => {
        getWakaf({status: 'online', page: page})
    }, [])
    

    const handlePageChange = (page: number) => {
        setPage(page)// data for the specified page
    };
    const handleCancel = () => {
        ConfirmAlert('cancelEdit').then((res) => {
            if (res.isConfirmed) {
                setShowModal(false);
                setEditMode(false)
                setEditValue({
                    title: '',
                    category: '',        
                    picture: null,
                    detail: '',
                    due_date: '',
                    fund_target: 0,
                    collected: 0
                });
            }
        })
    };
    

        const [editValue , setEditValue] = useState<WakafType>(initialEditValue)
        const [editMode, setEditMode] = useState(false)
        const [selectedId, setSelectedId] = useState<number>(0)
        
    const handleEditModal = (id: number) => {
        setShowModal(true)
        const selectedWakaf: any = wakaf.find((item: any) => item.id === id);
        if (!selectedWakaf) {
            return;
        }
        setEditValue({
            title: selectedWakaf.title,
            category: selectedWakaf.category,        
            picture: selectedWakaf.picture,
            detail: selectedWakaf.detail,
            due_date: selectedWakaf.due_date,
            fund_target: selectedWakaf.fund_target,
            collected: selectedWakaf.collected
        });
        setEditMode(true);
        setSelectedId(id);
    }

    const handleEdit = async (formValues: WakafType) => {
        setEditValue({ title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, collected: formValues.collected })
        const validation = await ConfirmAlert('edit')
        if (validation.isConfirmed) {
            setLoading(true);
            try {
            const result = await editedWakaf({
            title: formValues.title,
            category: formValues.category,
            picture: formValues.picture,
            detail: formValues.detail,
            due_date: formValues.due_date,
            fund_target: formValues.fund_target,
            id: selectedId,
            token: cookie.token
            })
            setShowModal(false)
            setLoading(false)
            getWakaf({status: 'online', page: page})
            return result
            } catch (error) {}
            setLoading(false)
        }
    }
    const handleArchive = async () => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await archiveWakaf({id: selectedId, token: cookie.token})
                getWakaf({status: 'online', page: page})
                setLoading(false)
                setShowModal(false)
                return response
            } catch (error) {}
            setLoading(false)
        }
    }
    const handleArchiveTable = async (id: number) => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await archiveWakaf({id: id, token: cookie.token})
                getWakaf({status: 'online', page: page})
                setLoading(false)
                setShowModal(false)
                return response
            } catch (error) {}
            setLoading(false)
        }
    }

    const handleDelete =async (id: number) => {
        const validation = await ConfirmAlert('delete')
        if (validation.isConfirmed) {
        setLoading(true)
            try {     
                const result = await deleteWakaf({
                id: id,
                token: cookie.token
                })
                getWakaf({status: 'online', page: page})
                setLoading(false)
                return result
            } catch (error) {}
        setLoading(false)
        }
    }
    return (
        <>
                <LoadingAlert open={loading} loading={loading}/>
            <Sidebar/>
            <Display>
                <Headers
                label={`Hello, ${cookie.name}!!!`}
                />
                <div className=" space-y-5 mx-auto w-11/12 my-10">
                <Space direction="horizontal" className='my-auto w-full space-x-[90px]'>
                    {dashboardData.data.map((item)=> {
                        return(
                            <Card
                            icon={item.icon}
                            header={item.header}
                            count={item.count}
                            />
                        )
                    })}
                </Space>
                </div>
                <div className="flex flex-col justify-center space-y-5 mx-auto w-11/12 my-10">
                <CustomCollapse 
                header='Produk Wakaf'
                key={'1'}
                >
                <WakafTable 
                data={wakaf}
                handleArchive={handleArchiveTable}
                handleDelete={handleDelete}
                dashboard={true}
                handleEdit={handleEditModal}
                />
                <Pagination size='small' total={totalOnlineWakaf} onChange={handlePageChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
                </CustomCollapse>
                <WakafModal
                open={showModal}
                handleCancel={handleCancel}
                handleArchive={handleArchive}
                editMode={editMode}
                onSubmit={handleEdit}
                editValues={editValue}
                /> 
                </div>
            </Display>
        </>
    )
}

export default Dashboard