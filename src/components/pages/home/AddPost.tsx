



import React, { FC, KeyboardEvent, useState } from 'react';
import { Alert, Box, TextField } from '@mui/material';
import { useAuth } from '../../providers/useAuth';
import { addDoc, collection } from 'firebase/firestore';

const AddPost: FC = () => {
  const [content, setContent] = useState('');
  const { user, db } = useAuth();
  const [error, setError] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const addPostHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && content.trim()) {
      try {
        // Логируем пост перед отправкой
        console.log('Adding post:', { author: user, content, createdAt: new Date().toISOString(), images: imageUrls });

        // Добавление поста в Firestore
        await addDoc(collection(db, 'posts'), {
          author: user,
          content,
          createdAt: new Date().toISOString(),
          images: imageUrls,  // отправляем массив изображений
        });

        setContent('');
        setImageUrls([]);
      } catch (e: any) {
        setError(e.message || 'Ошибка при добавлении поста');
      }
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" style={{ marginBottom: 20 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ border: '1px solid #e2e2e2', borderRadius: '10px', padding: '2px' }}>
        <TextField
          label="Расскажи, что у тебя нового"
          variant="outlined"
          InputProps={{
            sx: {
              borderRadius: '25px',
              width: '100%',
              bgcolor: '#F9F9F9',
            },
          }}
          sx={{ width: '100%' }}
          onKeyDown={addPostHandler}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </Box>
    </>
  );
};

export default AddPost;