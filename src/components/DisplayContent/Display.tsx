import React, { FC } from 'react'

interface DisplayProps{
    children: React.ReactNode
}

const Display: FC<DisplayProps> = ({children}) => {
    return (
        <div className="box-content w-[1200px] 2xl:w-[1500px] max-h-full lg:ml-[150px] xl:ml-[180px] 2xl:mx-[180px]">
        {children}
        </div>
    )
}

export default Display