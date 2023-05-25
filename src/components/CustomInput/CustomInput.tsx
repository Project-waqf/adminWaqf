import React from 'react'
import Typography from '../Typography'
import { Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "../..//styles/main.scss"
interface InputProps {
    register?: any
    error?: string | any
    name: string
    label?: string
    type: string
    placeholder: string
    value: string | any
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onClick?: React.MouseEventHandler
    minilabel?: string
    disable?: boolean
}

const CustomInput: React.FC<InputProps> = ({
    register,
    error,
    name,
    label,
    type,
    placeholder,
    value,
    onChange,
    onClick,
    minilabel,
    disable
}) => {
    return (
        <div>
        <label htmlFor={name}>
            <Typography variant='body3' color='white' type='normal' className=''>
                {label}
            </Typography>
        </label>
        {type === "password" ?
        <>
            <Input.Password
                name={name}
                placeholder="masukan password"
                size='large'
                status={error ? 'error' : ''}
                color='#EB2525'
                className={`mt-2 h-12 border-neutral-80 text-white`}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={onChange}
                value={value}
                minLength={6}
                disabled={disable}
                {...(register
                    ? register(name, {
                        onChange: onChange,
                        required: true
                    })
                : {})}
            />
            <div className="grid grid-cols-2 mt-2">
                <Typography variant='body3' color='error80' type='normal'>
                    {error}
                </Typography>
                <label 
                htmlFor="#" 
                className="flex justify-end  "
                onClick={onClick}
                > 
                    <Typography variant='btnXS' color="btnColor" type='normal' className="cursor-pointer">
                        {minilabel}
                    </Typography>
                </label>
            </div>
        </>
        : 
        <>
            <Input
                name={name}
                type={type}
                placeholder={placeholder}
                size='large'
                status={error ? 'error' : ''}
                className={`mt-2 h-12 bg-whiteBg border-neutral-80 ${error ? 'text-error-80' : "" }`}
                value={value}
                onChange={onChange}
                {...(register
                    ? register(name, {
                        onChange: onChange,
                        required: true
                    })
                : {})}
                disabled={disable}
            />
            <Typography variant='body3' color='error80' type='normal' className='my-2'>
                {error}
            </Typography>
        </>
        }
        </div>
    )
}

export default CustomInput