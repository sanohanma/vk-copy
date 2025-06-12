import React, { FC, useState, KeyboardEvent } from 'react';
import { Box, TextField } from '@mui/material';
import { IPost, TypeSetState } from '../../../types';
import { users } from '../../layout/sidebar/dataUsers';

interface IAddPost {
  setPosts: TypeSetState<IPost[]>;
}

const AddPost: FC<IAddPost> = ({ setPosts }) => {
  const [content, setContent] = useState('');

  const addPostHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && content.trim()) {
      setPosts(prev => [
        {
          author: users[0],
          content,
          createdAt: '5 минут назад',
        },
        ...prev,
      ]);
      setContent('');
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid #e2e2e2',
        borderRadius: '10px',
        padding: '2px',
      }}
    >
      <TextField
        label="Расскажи,что у тебя нового"
        variant="outlined"
        InputProps={{
          sx: {
            borderRadius: '25px',
            width: '100%',
            bgcolor: '#F9F9F9',
          },
        }}
        sx={{
          width: '100%',
        }}
        onKeyDown={addPostHandler}  // поменял onKeyPress на onKeyDown
        onChange={e => setContent(e.target.value)}
        value={content}
      />
    </Box>
  );
};

export default AddPost;

