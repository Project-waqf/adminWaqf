import React from 'react'
import Typography from '../Typography/Typography'
import { Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface InputProps{
    label: string
    minilabel: string
    value: string | any
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onClick?: React.MouseEventHandler
}

const InputPassword: React.FC<InputProps> = ({
    label,
    minilabel,
    value,
    onChange,
    onClick
}) => {
    const minilabelStyle = 'flex justify-end'
    return (
        <div>
            <label htmlFor="password">
                <Typography variant='body3' color='white' type='normal' className=''>
                    {label}
                </Typography>
            </label>
            <Input.Password
                name="password"
                placeholder="masukan password"
                size='large'
                className='my-2'
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={onChange}
                value={value}
                minLength={6}
            />
            <label 
            htmlFor="#" 
            className={minilabel === "Lupa Password ?" ? minilabelStyle : ""}
            onClick={onClick}
            > 
                <Typography variant='btnXS' color={minilabel === "Lupa Password ?" ? "btnColor" : "white"} type='normal' className={minilabel === "Lupa Password ?" ? "cursor-pointer" : ""}>
                    {minilabel}
                </Typography>
            </label>
        </div>
    )
}

export default InputPassword