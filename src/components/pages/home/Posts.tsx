import React,{FC} from 'react'
import { IPost } from '../../../types'
import { Box, Avatar} from '@mui/material';
import { Link } from 'react-router-dom';
import { ImageList } from '@mui/material';
import {ImageListItem} from '@mui/material'


interface IPosts {
    posts:IPost[]
}

const Posts : FC <IPosts> = ({posts}) => {
  return( 
  <> 
  {posts.map((post,idx) => (
    <Box sx={{
        border:'1px solid #e2e2e2',
        borderRadius:'10px',
        padding:2,
        marginTop:4,
      }}
      key={`Post-${idx}`}
    >
   

       
     <Link
    key={post.author.id}
    to={`/profile/${post.author.id}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: '#111',
      marginBottom: 12
    }}
  >
    <Box
      sx={{
        position: 'relative',
        marginRight: 2,
        width: 50,
        height: 50
      }}
    >
      <Avatar
        src={post.author.avatar}
        alt={post.author.name}
        sx={{ width: 46, height: 46, borderRadius: '50%' }}
      />
    </Box>
    <div>
    <div style={{ fontSize: 14 }}>{post.author.name}</div>
    <div style={{ fontSize: 14,opacity:'0.6'}}>{post.createdAt}</div>
    </div>
    
  </Link>
  <p>
    {post.content}
  </p>
  {post?.images?.length &&
  (
    <ImageList variant="masonry" cols={3} gap={8}>
        { post. images.map(image => (
            <ImageListItem key={image}>
            <img
              srcSet={image}
              loading="lazy"
            />
          </ImageListItem>

        ))}


    </ImageList>
  ) 
 }
    

</Box>
))}</>
   
  )
}

export default Posts 