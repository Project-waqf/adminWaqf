import React from 'react'
import Typography from '../Typography'

interface CardProps {
    icon: string
    header: string
    count: string | number
    onClick: React.MouseEventHandler
}

const Card: React.FC<CardProps> = ({icon, header, count, onClick}) => {
    return (
        <div className="w-[300px] flex space-x-5 px-2 py-4 bg-white border border-gray-200 rounded-xl shadow-lg cursor-pointer" onClick={onClick}>
                <img src={icon} className='w-[84px] h-[84px]' alt="" />
                <div className="flex flex-col justify-center">
                <Typography color='text03' variant='body3' type='normal'>
                    {header}
                </Typography>
                <Typography color='text01' variant='h2' type='semibold'>
                    {count}
                </Typography>
            </div>
        </div>
    )
}

export default Card