import React, { FC, ReactNode } from 'react';
import { Grid, Box } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12} sx={{ backgroundColor: '#eee' }}>
          Sidebar
        </Grid>
        <Grid item md={9} xs={12} sx={{ backgroundColor: '#ccc' }}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;




