import React, { FC } from 'react';
import { Box, Avatar, Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { QuestionAnswer } from '@mui/icons-material';



const UserItems: FC = () => {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{ padding: 2, backgroundColor: '#F1F7FA', border: 'none', borderRadius: 3 }}
    >
      {users.map(user => (
        <Link
          key={user.id}
          to={`/profile/${user.id}`}
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
              src={user.avatar}
              alt={user.name}
              sx={{ width: 46, height: 46, borderRadius: '50%' }}
            />
            {user.isInNetwork && (
              <Box
                sx={{
                  backgroundColor: '#4FFB14',
                  border: '1px solid #F1F7FA',
                  width: 12,
                  height: 12,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  borderRadius: '50%'
                }}
              />
            )}
          </Box>
          <span style={{ fontSize: 14 }}>{user.name}</span>
        </Link>
      ))}

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/messages')}>
            <ListItemIcon>
              <QuestionAnswer />
            </ListItemIcon>
            <ListItemText primary="Сообщения" />
          </ListItemButton>
        </ListItem>
      </List>
    </Card>
  );
};

export default UserItems;
