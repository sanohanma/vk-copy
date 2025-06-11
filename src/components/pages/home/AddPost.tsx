import React, {FC} from 'react'
import {Box, TextField} from '@mui/material'
import { IPost, TypeSetState } from '../../../types'
interface IAddPost{
    setPosts:TypeSetState<IPost[]>

}

const AddPost: FC<IAddPost> = ({setPosts}) => {
 const [content,setContent] = useState()

 const addPostHandler = () =>{
    setPosts(prev =>[...prev,{
        author:
    }])

 }
  return (
    <Box sx={{
        border:'1px solid #e2e2e2',
        borderRadius:'10px',
        padding:'2px'
      }}
    >
        <TextField 
        label='Расскажи,что у тебя нового'
        variant ='outlined'
        InputProps={{
            sx:{bordeRadius:'25px',
                width:'100%',
                bgcolor:'F9F9F9'} 
            }}
            sx={{
            width:'100%',
            }}
            onKeyPress={addPostHandler}
            onChange={e => setContent(e.target.value)}
            value ={content}
        />
  
  
      </Box>
  )
}

export default AddPost