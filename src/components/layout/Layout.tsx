import React, { FC, ReactNode } from 'react'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar' // не забудь импортировать Sidebar
import { Grid } from '@mui/material'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
    <div>
      <Header />
      <Grid container spacing={2}  paddingX={5}  marginTop={2}>
        <Grid item md ={3}>
        <Sidebar />
        </Grid>
        <Grid item md ={9}>
        {children}

        </Grid>


      </Grid>
     
      
    </div>
    </>
  )
}

export default Layout

