// src/pages/home/Home.tsx
import React  from 'react';
import { Box } from '@mui/material';
import AddPost from './AddPost';
import Posts from './Posts';


const Home = () => {


  return (
    <Box>
      <AddPost/>
      <Posts/>
    </Box>
  );
};

export default Home;

