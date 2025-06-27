import React, { FC, useEffect, useState } from 'react';
import { IPost } from '../../../types';
import { collection, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../providers/useAuth';
import Card from '../../ui/Card';
import { Avatar, Box, ImageList, ImageListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { initialPosts } from './initialPosts';

const Posts: FC = () => {
  const { db } = useAuth();
  const [posts, setPosts] = useState<IPost[]>(initialPosts);
  

  useEffect(() => {
      const unsub = onSnapshot(collection(db,'posts'),doc =>{
        doc.forEach((d:any) =>{
          setPosts(prev => [...prev,d.data()])
        })
      })
  
    return () => {
      unsub();
    };
  }, [db]);
  return (
    <>
      {posts.map((post, idx) => (
        <Card key={idx}>
          <Link to={`/profile/${post.author.id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#111', marginBottom: 12 }}>
            <Box sx={{ position: 'relative', marginRight: 2, width: 50, height: 50 }}>
              <Avatar src={post.author.avatar} alt={post.author.name} sx={{ width: 46, height: 46 }} />
            </Box>
            <div>
              <div style={{ fontSize: 14 }}>{post.author.name}</div>
              <div style={{ fontSize: 14, opacity: 0.6 }}>{post.createdAt}</div>
            </div>
          </Link>
          <p>{post.content}</p>
          {post.images && post.images.length > 0 && (
            <ImageList variant="masonry" cols={3} gap={8}>
              {post.images.map((image) => (
                <ImageListItem key={image}>
                  <img src={image} alt="post-img" loading="lazy" />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </Card>
      ))}
    </>
  );
};

export default Posts;





