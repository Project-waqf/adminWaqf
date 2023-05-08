import React from 'react'
interface LayoutProps {
    children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="min-h-screen flex bg-whiteBg overflow-hidden ">
            <div className="flex flex-rows w-screen">
                {children}
            </div>
        </div>
    )
}

export default Layout