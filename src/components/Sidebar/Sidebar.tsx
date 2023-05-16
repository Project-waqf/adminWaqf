import React from 'react'
import {RiDashboardLine, RiInboxArchiveLine} from 'react-icons/ri'
import {BsFileEarmark} from 'react-icons/bs'
import { NavLink } from "react-router-dom";
import logo from "../../assets/logoAlhambra.png"

interface NavLinkStyleProps {
    isActive: boolean;
}

const Sidebar= () => {
    const navLinkStyle = ({ isActive }:NavLinkStyleProps): React.CSSProperties => {
        return {
        color: isActive ? "#204C94" : "#A5A6AC",
        };
    };
    const borderStyle = ({ isActive }:NavLinkStyleProps): React.CSSProperties => (
        { backgroundColor: isActive ? "#204C94" : "#FAFAFA" }
        )
    return (
        <aside id="default-sidebar" className="fixed top-0 left-0 h-screen w-[140px] transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full py-4 overflow-y-auto bg-white shadow-2xl flex flex-col">
                <NavLink to={'/dashboard'} className='mx-auto mb-8 mt-5'>
                    <img src={logo} alt="Logo" className='w-[75px]' />
                </NavLink>
                <ul className="flex flex-col text-[40px] list-none mx-auto">

                    <NavLink to={'/dashboard'} style={navLinkStyle} className="no-underline flex w-[140px] h-20 transition-transform hover:bg-[#FBFBFB]">
                        <NavLink to={'/dashboard'} style={borderStyle} className={`w-4 h-14 my-auto rounded-r-xl`}></NavLink>
                        <li className='flex mx-9 my-auto'>
                            <RiDashboardLine />
                        </li>
                    </NavLink>
                    <NavLink to={'/draft'} style={navLinkStyle} className="no-underline flex w-[140px] h-20 transition-transform hover:bg-[#FBFBFB]">
                    <NavLink to={'/draft'} style={borderStyle} className={`w-4 h-14 my-auto h-full rounded-r-xl`}></NavLink>
                        <li className='flex mx-9 my-auto'>
                            <BsFileEarmark/>
                        </li>
                    </NavLink>
                    <NavLink to={'/archive'} style={navLinkStyle} className="no-underline flex w-[140px] h-20 transition-transform hover:bg-[#FBFBFB]">
                    <NavLink to={'/archive'} style={borderStyle} className={`w-4 h-14 my-auto h-full rounded-r-xl`}></NavLink>
                        <li className='flex mx-9 my-auto'>
                            <RiInboxArchiveLine/>                
                        </li>
                    </NavLink>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar