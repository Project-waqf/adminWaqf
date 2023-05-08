import clsx from 'clsx'
import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    id: string
    label: string
    onClick?: React.MouseEventHandler
    color?: string
    size?: string
    disabled?: boolean
    type?: any
}
const Button: React.FC<ButtonProps> = ({id, label, onClick, color, size, disabled, type}) => {


    return (
        <button
        type={type}
        disabled={disabled}
        className={clsx(
            `rounded-[8px] font-normal text-sm cursor-pointer ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`,
            {
            "bg-btnColor border-none text-white hover:text-btnColor hover:border-btnColor hover:bg-white disabled:bg-disable ": color === "orange",
            "border border-btnColor outline-none bg-white text-btnColor": color === "orangeBorder",
            "border-none bg-white text-btnColor": color === "whiteOrange",
            "border-primary-100 bg-white text-primary-100": color === "primaryBorder"
            },
            {
            "w-full py-3 px-4": size === "full",
            "w-fit py-3 px-4": size === "fit",
            "w-96 py-3 px-4": size === "large",
            "w-80 py-3 px-4": size === "semiLarge",
            "w-[230px] py-3": size === "normal",
            "w-40 py-3 px-4": size === "base"
            }
        )}
        id={id}
        onClick={onClick}
        >
            {label}
        </button>
);
}

export default Button