import React, { useState } from 'react'
import {RiDashboardLine, RiInboxArchiveLine} from 'react-icons/ri'
import {BsFileEarmark} from 'react-icons/bs'
import { NavLink } from "react-router-dom";
import logo from "../../assets/logoAlhambra.png"

interface SidebarProps {
    isDashboard: boolean,
    isArchive: boolean,
    isDraft: boolean, 
}

const Sidebar: React.FC<SidebarProps> = ({isArchive, isDashboard, isDraft}) => {
    const navLinkStyle = ({ isActive }) => {
        return {
        color: isActive ? "#204C94" : "#A5A6AC",
        };
    };
    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full py-4 overflow-y-auto bg-white shadow-2xl flex flex-col">
                <NavLink to={'/dashboard'} className='mx-auto mb-8 mt-5'>
                    <img src={logo} alt="Logo" className='w-[75px]' />
                </NavLink>
                <ul className="flex flex-col space-y-8 text-[40px] list-none mx-auto">

                    <NavLink to={'/dashboard'} style={navLinkStyle} className="no-underline flex w-28 transition-transform hover:bg-gray-100">
                        <div className={`w-2 h-full ${isDashboard ? `bg-primary-100` : `bg-white`} rounded-r-xl`}></div>
                        <li className='flex mx-7'>
                            <RiDashboardLine />
                        </li>
                    </NavLink>
                    <NavLink to={'/draft'} style={navLinkStyle} className="no-underline flex w-28 transition-transform hover:bg-gray-100">
                        <div className={`w-2 h-full ${isDraft ? `bg-primary-100` : `bg-white`} rounded-r-xl`}></div>
                        <li className='flex mx-7'>
                            <BsFileEarmark/>
                        </li>
                    </NavLink>
                    <NavLink to={'/archive'} style={navLinkStyle} className="no-underline flex w-28 transition-transform hover:bg-gray-100">
                        <div className={`w-2 h-full ${isArchive ? `bg-primary-100` : `bg-white`} rounded-r-xl`}></div>
                        <li className='flex mx-7'>
                            <RiInboxArchiveLine/>                
                        </li>
                    </NavLink>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar