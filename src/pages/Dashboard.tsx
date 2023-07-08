import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Typography from '../components/Typography'
import { Pagination, Space } from 'antd'
import CustomCollapse from '../components/Collapse';
import { useCookies } from 'react-cookie';
import Display from '../components/DisplayContent/Display';
import { DashboardType, DataDashboard, WakafType } from '../utils/types/DataType';
import ConfirmAlert from '../components/Alert/ConfirmAlert';
import LoadingAlert from '../components/Modal/LoadingAlert';
import Headers from '../components/Headers/Headers';
import WakafTable from '../components/Table/WakafTable';
import WakafModal from '../components/Modal/WakafModal';
import useWakaf from '../api/hooks/useWakaf';
import Card from '../components/Card/Card';
import Alert from '../components/Alert/Alert';
import assetIcon from "../assets/Group 26958.svg";
import aktifIcon from "../assets/Group 26957 (2).svg";
import succesIcon from "../assets/Group 26957.svg";
import { useDispatch, useSelector } from 'react-redux';
import { ArchiveState, removeWakafFromArchive } from '../stores/archiveSlice';
import Swal from 'sweetalert2';
import axios from 'axios';
import { APIUrl } from '../string';
import { useNavigate } from 'react-router-dom';

const initialEditValue: WakafType = {
    title: "",
    category: "",
    picture: null,
    detail: '',
    due_date: '',
    fund_target: 0,
    collected: 0,
    due_date_string: '',
    is_completed: false
}

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState<number>(1)
    const [dashboardData, setDashboardData] = useState<DataDashboard>({data: [],});
    const { wakaf, getWakaf, totalOnlineWakaf , editedWakaf, archiveWakaf, deleteWakaf, allWakaf } = useWakaf()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const archive = useSelector((state: {archive: ArchiveState}) => state.archive)
    const [editValue , setEditValue] = useState<WakafType>(initialEditValue)
    const [editMode, setEditMode] = useState(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const [summary, setSummary] = useState<any>({})
    const [wakafCompleted, setWakafCompleted] = useState<number>(0) 
    const [sort, setSort] = useState<string>('desc')
    const [toggle, setToggle] = useState(false)
    
    useEffect(() => {
        if (toggle === false) {
            setSort('desc')
        } else if (toggle === true) {
            setSort('asc')
        }
    }, [toggle])
    
    useEffect(() => {
        if(allWakaf){
            let total: number = 0            
            for (const wakaf of allWakaf) {
                if (wakaf.collected === wakaf.fund_target) {
                    total += 1
                }
            }
            setWakafCompleted(total)
        }
    }, [allWakaf])

    useEffect(() => {
        if (summary) {
            const initialData: DashboardType[] = [
                {
                    id: 1,
                    icon: aktifIcon,
                    header: 'Wakaf Online',
                    count: summary.total_wakif,
                },
                {
                    id: 2,
                    icon: succesIcon,
                    header: 'Wakaf Selesai',
                    count: wakafCompleted ? wakafCompleted : 0,
                },
                {
                    id: 2,
                    icon: assetIcon,
                    header: 'Jumlah Asset',
                    count: summary.total_program,
                },
            ];
            setDashboardData({data: initialData})
        }
    }, [summary, wakafCompleted])
    

    const getSummary = async () => {
        try {
            const response = await axios.get(APIUrl + 'wakaf/summary')
            setSummary(response.data.data) 
            return response
        } catch (error) {}
    }
    useEffect(() => {
        getSummary()
    }, [])
    
    useEffect(() => {
        getWakaf({status: 'online', page: page, sort: sort, filter: ''})
    }, [page, sort])
    
    useEffect(()=> {
        if (archive.wakaf[0] && editMode) {
            handleArchive(archive.wakaf[0])
        }
    },[archive.wakaf])

    const handlePageChange = (page: number) => {
        setPage(page)// data for the specified page
    };
    const handleCancel = () => {
        ConfirmAlert('cancelEdit').then((res) => {
            if (res.isConfirmed) {
                setShowModal(false);
                setEditMode(false)
            }
        })
    };
    

        
    const handleEditModal = (id: number) => {
        setShowModal(true)
        const selectedWakaf: any = wakaf.find((item: any) => item.id === id);
        if (!selectedWakaf) {
            return;
        }
        setEditValue({
            id: id,
            title: selectedWakaf.title,
            category: selectedWakaf.category,        
            picture: selectedWakaf.picture,
            detail: selectedWakaf.detail,
            due_date: selectedWakaf.due_date,
            due_date_string: selectedWakaf.due_date_string,
            fund_target: selectedWakaf.fund_target,
            collected: selectedWakaf.collected,
            is_completed: selectedWakaf.is_complete
        });
        setEditMode(true);
        setSelectedId(id);
    }

    const handleEdit = async (formValues: WakafType) => {
        setEditValue({ title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, collected: formValues.collected, due_date_string: formValues.due_date_string })
        const validation = await ConfirmAlert('edit')
        if (validation.isConfirmed) {
            setLoading(true);
            try {
                const result = await editedWakaf({
                title: formValues.title,
                category: formValues.category,
                picture: formValues.picture,
                detail: formValues.detail,
                due_date: formValues.due_date_string,
                fund_target: formValues.fund_target,
                id: selectedId,
                token: cookie.token
                })
                setShowModal(false)
                setLoading(false)
                Alert('edit')
                getWakaf({status: 'online', page: page, sort: sort, filter: ''})
                return result
            } catch (error) {}
            setLoading(false)
        }
    }
    const handleArchive = async (formValues: WakafType) => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await editedWakaf({id: selectedId, status: 'archive', title: formValues.title, category: formValues.category, picture: formValues.picture, detail: formValues.detail, due_date: formValues.due_date, fund_target: formValues.fund_target, token: cookie.token})
                getWakaf({status: 'online', page: page, sort: sort, filter: ''})
                setLoading(false)
                setShowModal(false)
                Alert('archive')
                dispatch(removeWakafFromArchive(formValues.title))
                return response
            } catch (error) {}
            setLoading(false)
        } else if (validation.dismiss === Swal.DismissReason.cancel) {
            dispatch(removeWakafFromArchive(formValues.title))
        }
    }
    const handleArchiveTable = async (id: number) => {
        const validation = await ConfirmAlert('archive')
        if (validation.isConfirmed) {
            setLoading(true)
            try {
                const response = await archiveWakaf({id: id, token: cookie.token})
                getWakaf({status: 'online', page: page, sort: sort, filter: ''})
                setLoading(false)
                setShowModal(false)
                Alert('archive')
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
                getWakaf({status: 'online', page: page, sort: sort, filter: ''})
                setLoading(false)
                return result
            } catch (error) {}
        setLoading(false)
        }
    }
    const handleSort = () => {
        setToggle(!toggle)
    }
    return (
        <>
            <LoadingAlert open={loading} loading={loading}/>
            <Sidebar/>
            <Display>
                <Headers
                label={`Hello, ${cookie.name}!!!`}
                />
                <div className="grid grid-cols-3 gap-10 mx-auto w-11/12 my-10">
                    {dashboardData.data.map((item)=> {
                        return(
                            <Card
                            icon={item.icon}
                            header={item.header}
                            count={item.count}
                            onClick={()=> {item.header === "Wakaf Online" ?  navigate('/wakaf', {state: {forFilter: 'aktif'}}) : item.header === "Wakaf Selesai" ? navigate('/wakaf', {state: {forFilter: 'complete'}}) : navigate('/asset')}}
                            />
                        )
                    })}
                </div>
                <div className="flex flex-col justify-center space-y-5 mx-auto w-11/12 my-10">
                <CustomCollapse 
                header='Produk Wakaf'
                key={'1'}
                autoOpen
                >
                <WakafTable 
                data={wakaf}
                handleArchive={handleArchiveTable}
                handleDelete={handleDelete}
                dashboard={true}
                handleEdit={handleEditModal}
                handleSort={handleSort}
                isSort={toggle}
                draft={false}
                archives={false}
                />
                <Pagination size='small' total={totalOnlineWakaf} onChange={handlePageChange} showSizeChanger={false} className='z-90 my-7 float-right'/>
                </CustomCollapse>
                <WakafModal
                open={showModal}
                handleCancel={handleCancel}
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