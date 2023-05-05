import React from 'react'
import Typography from '../Typography'
import { Input } from 'antd'

interface InputProps {
    name: string
    label: string
    type: string
    placeholder: string
    value: string | any
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const CustomInput: React.FC<InputProps> = ({
    name,
    label,
    type,
    placeholder,
    value,
    onChange
}) => {
    return (
        <div>
        <label htmlFor={name}>
            <Typography variant='body3' color='white' type='normal' className=''>
                {label}
            </Typography>
        </label>
        <Input
            name={name}
            type={type}
            placeholder={placeholder}
            size='large'
            className='mt-2'
            value={value}
            onChange={onChange}
        />
        </div>
    )
}

export default CustomInput