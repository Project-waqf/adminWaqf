import React from 'react'
interface LayoutProps {
    children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div>
            <div className="w-full h-full overflow-hidden ">{children}</div>
        </div>
    )
}

export default Layout