import React, { FC } from 'react'
import {Box} from '@mui/system'
import {Link} from 'react-router-dom'

const Sidebar: FC = () => {
  return <div>
    <Box sx={{display:'flex',}}>
      <Link>
      <img src="" alt="" />
      <span>Коля Буткеевич</span>
      </Link>
     
      
    </Box>
    </div>
};

export default Sidebar

