import React from 'react'

class Loading extends React.Component{
    render() {
        return (
            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-gradient-to-tl from-[#10A016] to-green-100 animate-spin">
                <div className="h-[100px] w-[100px] rounded-full bg-white"></div>
            </div>
        )
    }
}

export default Loading