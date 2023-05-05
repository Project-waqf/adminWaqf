import clsx from 'clsx'
import React from 'react'

interface ButtonProps {
    id: string
    label: string
    onClick?: React.MouseEventHandler
    color?: string
    size?: string
    disabled?: boolean
}
const Button: React.FC<ButtonProps> = ({id, label, onClick, color, size, disabled}) => {
    const btn_color = {
        Primary: "bg-btnColor py-2 px-4 md:py-2 md:px-6 lg:py-3 lg:px-6 ",
        Biru: "bg-task py-1 px-3 md:py-2 md:px-4 text-primary-90 text-[8px] md:text-[10px]",
    };
    const colorClassname = color ? color : btn_color.Primary;
    
    const defaultSize = "w-full"
    const sizeClassname = size ?  size : defaultSize
    return (
        <button
        className={clsx(
            `rounded-[8px] font-normal text-sm cursor-pointer`,
            {
            "bg-btnColor border-none text-white hover:text-btnColor hover:border-btnColor hover:bg-white": color === "orange",
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
        disabled={disabled}
        >
            {label}
        </button>
);
}

export default Button