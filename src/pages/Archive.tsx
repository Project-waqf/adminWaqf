import React from 'react'
import Sidebar from '../components/Sidebar'

const Archive = () => {
  return (
    <Sidebar 
    isDashboard={false}
    isArchive={true}
    isDraft={false}
    />
  )
}

export default Archive