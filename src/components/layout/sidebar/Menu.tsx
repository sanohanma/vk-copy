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
