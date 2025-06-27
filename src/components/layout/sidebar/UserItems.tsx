// src/layout/sidebar/UserItems.tsx
import React from 'react';
import {
  Box,
  Avatar,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { QuestionAnswer } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { users } from './dataUsers';
import { useAuth } from '../../providers/useAuth';

const UserItems = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Удаляем текущего пользователя из списка
  const friends = users.filter(u => u.id !== user?.id);

  return (
    <Card
      variant="outlined"
      sx={{ padding: 2, backgroundColor: '#F1F7FA', border: 'none', borderRadius: 3 }}
    >
      {friends.map(friend => (
        <Link
          key={friend.id}
          to={`/message/${friend.id}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#111',
            marginBottom: 12,
          }}
        >
          <Box sx={{ position: 'relative', marginRight: 2, width: 50, height: 50 }}>
            <Avatar src={friend.avatar} alt={friend.name} sx={{ width: 46, height: 46 }} />
            {friend.isInNetwork && (
              <Box
                sx={{
                  backgroundColor: '#4FFB14',
                  border: '2px solid white',
                  width: 12,
                  height: 12,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  borderRadius: '50%',
                }}
              />
            )}
          </Box>
          <span style={{ fontSize: 14 }}>{friend.name}</span>
        </Link>
      ))}
    </Card>
  );
};

export default UserItems;



