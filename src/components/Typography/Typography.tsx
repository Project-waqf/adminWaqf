import React from "react";
import clsx from "clsx";

interface TypographyProps {
    children: React.ReactNode, 
    color:string, 
    variant:string, 
    type:string, 
    className?:string
}

const Typography : React.FC<TypographyProps> = ({ children, color, variant, type, className }) => {
    return (
        <div
        className={clsx(
            {
            "text-white": color === "white",
            "text-primary-90": color === "primary-90",
            "text-primary-80": color === "primary-80",
            "text-primary-70": color === "primary-70",
            "text-primary-60": color === "primary-60",
            "text-neutral-80": color === "neutral-80",
            "text-neutral-90": color === "neutral-90",
            "text-text01": color === "text01",
            "text-text02": color === "text02",
            "text-text03": color === "text03",
            "text-subText": color === "subText",
            "text-btnColor": color === "btnColor",
            "text-error-70": color === "error70",
            "text-error-80": color === "error80",
            "text-error-90": color === "error90",
            "text-green-500": color === "green",
            },
            {
            "text-[48px] leading-[60px]": variant === "h1",
            "text-[32px] leading-[40px]": variant === "h2",
            "text-[24px] leading-[32px]": variant === "h3",
            "text-2xl leading-7": variant === "h4",
            "text-xl leading-6": variant === "h5",
            "text-lg leading-7": variant === "body1",
            "text-base leading-6": variant === "body2",
            "text-sm leading-5": variant === "body3",
            "text-lg leading-6": variant === " btnL",
            "text-sm leading-4": variant === "btnS",
            "text-xs leading-4": variant === "btnXS",
            "text-xs": variant === "text",
            },
            {
            "font-normal": type === "normal",
            "font-medium": type === "medium",
            "font-semibold": type === "semibold",
            "font-bold": type === "bold",
            "font-extrabold": type === "extrabold",
            },
            className,
        )}
        >
        {children}
        </div>
    );
}
export default Typography