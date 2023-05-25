import React, { FC } from 'react'

interface DisplayProps{
    children: React.ReactNode
}

const Display: FC<DisplayProps> = ({children}) => {
    return (
        <div className="box-content w-[1200px] 2xl:w-[1700px] max-h-full lg:ml-[120px] xl:ml-[150px] 2xl:mx-[150px]">
        {children}
        </div>
    )
}

export default Display