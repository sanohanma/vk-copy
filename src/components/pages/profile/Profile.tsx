// src/pages/profile/Profile.tsx
import React, { FC } from 'react';
import Card from '../../ui/Card'; // Убедись, что путь к Card правильный
import { Avatar, Typography, Box, Divider, Button } from '@mui/material'; // Добавили Button на всякий случай
// import { useAuth } from '../../providers/useAuth'; // Эту строку мы ЗАКОММЕНТИРУЕМ, чтобы не использовать динамические данные

const Profile: FC = () => {
  // const { user, isLoading } = useAuth(); // Эту строку мы ЗАКОММЕНТИРУЕМ

  // Статичные данные для Ислама (только для вёрстки)
  const islamStatic = {
    id: '9fxqMJHOHlaSqcgB5qqua4ybp6w1', // Его реальный UID (для красоты, но не используется)
    avatar: 'https://picsum.photos/id/237/200/200', // Красивый аватар Ислама, чуть больше размер
    name: 'Ислам Догдурбаев',
    email: 'islam.dogdurbayev@example.com',
    isInNetwork: true,
    bio: 'Frontend разработчик. Люблю React и Firebase. В постоянном поиске вдохновения и новых идей для творчества. Открыт к общению и сотрудничеству!',
    phone: '+996-777-123-456',
    city: 'Бишкек, Кыргызстан',
    lastSeen: 'Сейчас онлайн',
  };

  // Поскольку данные статичны, никаких проверок isLoading или !user не нужно
  const user = islamStatic; // Просто присваиваем наши статичные данные

  return (
    <Card>
      <Box 
        sx={{ 
          p: 4, // Увеличим отступы
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 2, 
          textAlign: 'center', // Центрируем текст
          maxWidth: 500, // Ограничим ширину для лучшего вида
          mx: 'auto' // Центрируем по горизонтали
        }}
      >
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 160, height: 160, mb: 2, border: '3px solid #1976d2' }} // Больше размер и рамка
        />
        <Typography variant="h3" component="h1" 
          sx={{ 
            color: '#333', // Тёмный цвет для контраста
            fontWeight: 'bold', 
            mb: 1 
          }}
        >
          {user.name}
        </Typography>

        <Typography variant="body1" 
          sx={{ 
            color: '#555', 
            fontStyle: 'italic', 
            maxWidth: '90%', 
            lineHeight: 1.5 
          }}
        >
          "{user.bio}"
        </Typography>
        
        <Divider sx={{ width: '70%', my: 2, bgcolor: '#ccc' }} /> {/* Красивый разделитель */}

        <Box sx={{ width: '100%', maxWidth: 350, textAlign: 'left', mt: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold', color: '#666' }}>Email:</span> {user.email}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold', color: '#666' }}>Телефон:</span> {user.phone}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold', color: '#666' }}>Город:</span> {user.city}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold', color: '#666' }}>Статус:</span> {user.lastSeen}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <span style={{ fontWeight: 'bold', color: '#666' }}>В сети:</span> {user.isInNetwork ? 'Да' : 'Нет'}
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          sx={{ mt: 3, px: 4, py: 1.5, borderRadius: 2, fontSize: '1.1rem' }}
        >
          Редактировать профиль
        </Button>
      </Box>
    </Card>
  );
};

export default Profile;


