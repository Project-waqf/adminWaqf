import React from 'react'
import Typography from '../Typography'
import { Input } from 'antd'

interface InputProps {
    register?: any
    error: string | any
    name: string
    label?: string
    type: string
    placeholder: string
    value: string | any
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

const CustomInput: React.FC<InputProps> = ({
    register,
    error,
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
            className={`mt-2 h-12 bg-whiteBg border-neutral-80 ${error ? 'text-error-80' : "" }`}
            value={value}
            onChange={onChange}
            {...(register
                ? register(name, {
                    onChange: onChange,
                })
            : {})}
        />
        <Typography variant='body3' color='error80' type='normal' className='my-2'>
            {error}
        </Typography>
        </div>
    )
}

export default CustomInput