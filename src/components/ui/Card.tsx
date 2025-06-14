// src/ui/Card.tsx
import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
  return (
    <Box
      sx={{
        border: '1px solid #e2e2e2',
        borderRadius: '10px',
        padding: 2,
        marginTop: 4,
      }}
    >
      {children}
    </Box>
  );
};

export default Card;
