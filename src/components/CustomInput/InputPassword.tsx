import React from 'react'
import Typography from '../Typography/Typography'
import { Input } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface InputProps{
    error?: string | any
    register?: any
    label?: string
    minilabel?: string
    value: string | any
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onClick?: React.MouseEventHandler
    changePassword?: boolean
}

const InputPassword: React.FC<InputProps> = ({
    error,
    register,
    label,
    minilabel,
    value,
    onChange,
    onClick,
    changePassword
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
                status={'error'}
                color='#EB2525'
                style={{ color: "#EB2525" }}
                className={`mt-2 h-12 border-neutral-80 ${error !== '' ? '' : "" }`}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={onChange}
                value={value}
                minLength={6}
                {...(register
                    ? register(name, {
                        onChange: onChange,
                    })
                : {})}
            />
            <div className="grid grid-cols-2 mt-2">
                <Typography variant='body3' color='error80' type='normal'>
                    {error}
                </Typography>
                <label 
                htmlFor="#" 
                className={changePassword ? minilabelStyle : ""}
                onClick={onClick}
                > 
                    <Typography variant='btnXS' color={changePassword ? "btnColor" : "white"} type='normal' className={changePassword ? "cursor-pointer" : ""}>
                        {minilabel}
                    </Typography>
                </label>
            </div>
        </div>
    )
}

export default InputPassword