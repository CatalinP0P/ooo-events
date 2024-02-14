import React from 'react'
import Header from '../header/header'
import './layout.Module.scss'
import Footer from '../footer/footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <div className="layout__body">{children}</div>
      <Footer />

      <ToastContainer />
    </div>
  )
}
