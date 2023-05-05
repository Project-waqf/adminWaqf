import React from 'react'

interface BoxProps {
  id: string
  bg?: string
  customStyle?: string
  size?: string
  children: React.ReactNode
}

const Box: React.FC<BoxProps> = ({ id, customStyle, bg, size, children }) => {
  const bg_color= "bg-whiteBg"
  
  const box_size = "w-full h-screen"

  const colorClassName = bg ? bg : bg_color
  const sizeClassName = size ? size : box_size
  return (
    <div id={id} className={`box-content ${sizeClassName} ${customStyle} ${colorClassName}`}>
      {children}
    </div>
  )
}

export default Box