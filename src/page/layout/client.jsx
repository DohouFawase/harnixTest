import React from 'react'
import { Outlet } from 'react-router'
import Nav from '../../components/ui/navigation/home/nav'
import Footer from '../../components/ui/navigation/home/footer'

export default function Client() {
  return (
    <div>
        <Nav />
      <Outlet/>
      <Footer />
    </div>
  )
}
