// src/pages/profile/Profile.tsx
import React, { FC } from 'react';
import Card from '../../ui/Card';
import { Avatar } from '@mui/material';
import { useAuth } from '../../providers/useAuth';

const Profile: FC = () => {
  const { user } = useAuth();
  return (
    <Card>
      <Avatar src={user?.avatar} />
      <h1>{user?.name}</h1>
    </Card>
  );
};

export default Profile
