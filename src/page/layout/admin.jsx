import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../../components/ui/navigation/admin/sidebar'
import Heade from '../../components/ui/navigation/admin/heade'

export default function Admin() {
  return (
    <div className='w-full"'>
      <div className="flex p-3 bg-gray-100/5">
       <Sidebar />
        <div className="w-full">
          <div className="w-full">
          <Heade/>
          </div>
           <div className="px-4 mt-8">
           <Outlet />
           </div>
        </div>
      </div>
      

   
    </div>
  )
}
