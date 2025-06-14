import React, { FC, ReactNode } from 'react';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import { Box } from '@mui/material';
import { useAuth } from '../providers/useAuth';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          padding: '0 40px',
          marginTop: 16,
          gap: 24,
        }}
      >
        {user && (
          <Box
            sx={{
              width: '25%', // примерно 3 из 12 колонок
              minWidth: 250,
            }}
          >
            <Sidebar />
          </Box>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: user ? '75%' : '100%',
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;




