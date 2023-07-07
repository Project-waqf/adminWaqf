import React, { FC } from 'react'

interface DisplayProps{
    children: React.ReactNode
}

const Display: FC<DisplayProps> = ({children}) => {
    return (
        <div className="box-content lg:w-[1700px] xl:w-[1800px] 2xl:w-[2000px] max-h-full lg:ml-[100px] xl:ml-[100px] 2xl:mx-[100px]">
        {children}
        </div>
    )
}

export default Display