import React, { FC, ReactNode } from 'react';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import { Box } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '25% 1fr',
          paddingX: 5,
          marginTop: 2,
          gap: 2,
        }}
      >
        <Sidebar />
        <Box>{children}</Box>
      </Box>
    </>
  );
};

export default Layout;





