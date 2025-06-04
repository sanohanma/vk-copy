import React, { FC, ReactNode } from 'react'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar' // не забудь импортировать Sidebar

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
    <div>
      <Header />
      <Sidebar />
      <main>{children}</main>
    </div>
    </>
  )
}

export default Layout

