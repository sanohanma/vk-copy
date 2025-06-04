import React from 'react'
import {Box} from '@mui/system'
import {Link} from 'react-router-dom'

const UserItems: FC = () => {
  return (
    <div>
    <Box sx={{display:'flex',alignItems:'center'}}>
       <Link to ='profile' >
       <Box sx={{position:'relative',marginRight:5}} >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s" alt="" />
       <Box sx={{bachgroundcolor:'green',width:4,height:4,position:'absolute',bottom:2,left:2}}/>
      </Box>
      <span>Коля Буткеевич</span>
      </Link>
     
      
    </Box>

    </div>
  )
}

export default UserItems

