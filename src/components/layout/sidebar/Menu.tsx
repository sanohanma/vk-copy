// src/layout/sidebar/Menu.tsx
import React, { FC } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { menu } from './dataMenu';

const Menu: FC = () => {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        backgroundColor: '#F1F7FA',
        border: 'none',
        borderRadius: 3,
        marginTop: 5,
        marginBottom: 10,
      }}
    >
      <Link
        to="/profile"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: '#111',
          marginBottom: 12,
        }}
      >
        {/* <Box
          sx={{
            position: 'relative',
            marginRight: 2,
            borderRadius: '50%',
            width: 50,
            height: 50,
          }}
        >
          <Box
            sx={{
              backgroundColor: '#4FFB14',
              border: '1px solid #F1F7FA',
              width: 12,
              height: 12,
              position: 'absolute',
              bottom: 0,
              right: 0,
              borderRadius: '50%',
            }}
          />
        </Box> */}
     
      </Link>

      <List>
        {menu.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(item.link)}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default Menu;
