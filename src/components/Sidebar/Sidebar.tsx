import React from 'react'
import {RiDashboardLine, RiInboxArchiveLine} from 'react-icons/ri'
import {BsFileEarmark} from 'react-icons/bs'
import { AiOutlineGold } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logoAlhambra.png"
import Typography from '../Typography';

interface NavLinkStyleProps {
    isActive: boolean;
}

const Sidebar= () => {
    const navLinkStyle = ({ isActive }:NavLinkStyleProps): React.CSSProperties => {
        return {
        color: isActive ? "#F98D3E" : "#A5A6AC",
        };
    };
    const borderStyle = ({ isActive }:NavLinkStyleProps): React.CSSProperties => (
        { backgroundColor: isActive ? "#F98D3E" : "#FFFFFF" }
        )
    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 h-screen w-[97px] hover:w-[235px] z-50 transition-all -translate-x-0" aria-label="Sidebar">
            <div className="h-full py-4 overflow-y-auto bg-white shadow-2xl flex flex-col overflow-hidden">
                <NavLink to={'/dashboard'} className='mb-8 mt-5 w-[235px] flex items-center no-underline relative'>
                    <img src={logo} alt="Logo" className='w-[56px] ml-5 h-[56px]' />
                    <Typography variant='h5' color='primary-90' type='bold' className='ml-5 w-26'>
                        AL-HAMBRA
                    </Typography>
                </NavLink>
                <ul className="flex flex-col text-[40px] list-none">

                    <NavLink to={'/dashboard'} style={navLinkStyle} className="no-underline flex w-[235px] h-14 transition-transform hover:bg-[#FBFBFB]">
                        <NavLink to={'/dashboard'} style={borderStyle} className={`w-[12px] h-[50px] my-auto rounded-r-xl`}></NavLink>
                        <li className='flex mx-6 my-auto hover:text-btnColor'>
                            <RiDashboardLine className='h-[24px] w-[24px]'/>
                            <Typography variant='body2' color='' type='normal' className='ml-10'>
                                Dashboard
                            </Typography>
                        </li>
                    </NavLink>
                    <NavLink to={'/wakaf'} style={navLinkStyle} className="no-underline flex w-[235px] h-14 transition-transform hover:bg-[#FBFBFB]">
                        <NavLink to={'/wakaf'} style={borderStyle} className={`w-[12px] h-[50px] my-auto rounded-r-xl`}></NavLink>
                        <li className='flex mx-6 my-auto hover:text-btnColor'>
                            <RiDashboardLine className='h-[24px] w-[24px]'/>
                            <Typography variant='body2' color='' type='normal' className='ml-10'>
                                Produk Wakaf
                            </Typography>
                        </li>
                    </NavLink>
                    <NavLink to={'/berita'} style={navLinkStyle} className="no-underline flex w-[235px] h-14 transition-transform hover:bg-[#FBFBFB]">
                        <NavLink to={'/berita'} style={borderStyle} className={`w-[12px] h-[50px] my-auto rounded-r-xl`}></NavLink>
                        <li className='flex mx-6 my-auto hover:text-btnColor'>
                            <RiDashboardLine className='h-[24px] w-[24px]'/>
                            <Typography variant='body2' color='' type='normal' className='ml-10'>
                                Berita
                            </Typography>
                        </li>
                    </NavLink>
                    <NavLink to={'/asset'} style={navLinkStyle} className="no-underline flex w-[235px] h-14 transition-transform hover:bg-[#FBFBFB]">
                        <NavLink to={'/asset'} style={borderStyle} className={`w-[12px] h-[50px] my-auto rounded-r-xl`}></NavLink>
                        <li className='flex mx-6 my-auto hover:text-btnColor'>
                            <AiOutlineGold className='h-[24px] w-[24px]'/>
                            <Typography variant='body2' color='' type='normal' className='ml-10'>
                                Asset
                            </Typography>
                        </li>
                    </NavLink>
                    <NavLink to={'/mitra'} style={navLinkStyle} className="no-underline flex w-[235px] h-14 transition-transform hover:bg-[#FBFBFB]">
                        <NavLink to={'/mitra'} style={borderStyle} className={`w-[12px] h-[50px] my-auto rounded-r-xl`}></NavLink>
                        <li className='flex mx-6 my-auto hover:text-btnColor'>
                            <RiDashboardLine className='h-[24px] w-[24px]'/>
                            <Typography variant='body2' color='' type='normal' className='ml-10'>
                                Mitra
                            </Typography>
                        </li>
                    </NavLink>
                    <NavLink to={'/draft'} style={navLinkStyle} className="no-underline flex w-[235px] h-14 transition-transform hover:bg-[#FBFBFB]">
                    <NavLink to={'/draft'} style={borderStyle} className={`w-3 h-12 my-auto h-full rounded-r-xl`}></NavLink>
                        <li className='flex mx-6 my-auto hover:text-btnColor hover:text-btnColor'>
                            <BsFileEarmark className='h-[24px] w-[24px]'/>
                            <Typography variant='body2' color='' type='normal' className='ml-10'>
                                Draft
                            </Typography>
                        </li>
                    </NavLink>
                    <NavLink to={'/archive'} style={navLinkStyle} className="no-underline flex w-[235px] h-14 transition-transform hover:bg-[#FBFBFB]">
                    <NavLink to={'/archive'} style={borderStyle} className={`w-4 h-14 my-auto h-full rounded-r-xl`}></NavLink>
                        <li className='flex mx-5 my-auto hover:text-btnColor'>
                            <RiInboxArchiveLine className='h-[24px] w-[24px]'/>
                            <Typography variant='body2' color='' type='normal' className='ml-10'>
                                Archive
                            </Typography>               
                        </li>
                    </NavLink>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar