// src/layout/sidebar/UserItems.tsx
import React from 'react';
import {
  Box,
  Avatar,
  Card,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/useAuth';// Проверь путь к useAuth

const UserItems = () => {
  const navigate = useNavigate();
  const { user, users: allUsersFromContext, loading } = useAuth();

  console.log('--- UserItems Debug Start ---');
  console.log('1. Auth loading state:', loading);
  console.log('2. Current logged-in user (from useAuth):', user);
  console.log('3. All mock users (from AuthProvider):', allUsersFromContext);

  // Проверяем каждого пользователя перед фильтрацией (для отладки)
  allUsersFromContext.forEach((u, index) => {
    const isCurrentUser = u.id === user?.id;
    const isNetworkUser = u.isInNetwork; // Этот статус теперь только для отображения, не для фильтра
    const shouldBeFilteredOut = isCurrentUser; // Убираем ТОЛЬКО текущего пользователя
    const willBeShown = !shouldBeFilteredOut; // Будут показаны все, кроме текущего

    console.log(`   User ${index + 1} (${u.name || u.id}):`);
    console.log(`     ID: ${u.id}, Current User ID: ${user?.id}`);
    console.log(`     u.id === user?.id? ${isCurrentUser}`);
    console.log(`     isInNetwork: ${isNetworkUser} (статус, не фильтр)`);
    console.log(`     Should this user be filtered out (current user)? ${shouldBeFilteredOut}`);
    console.log(`     Will this user be SHOWN (not current)? ${willBeShown}`);
  });


  // ФИЛЬТРАЦИЯ ИЗМЕНЕНА:
  // Теперь фильтруем ТОЛЬКО по условию, что ID пользователя не равен ID текущего авторизованного пользователя.
  // Условие u.isInNetwork УДАЛЕНО из фильтрации, оно используется только для отображения кружка статуса.
  const friends = allUsersFromContext.filter(
    (u) => u.id !== user?.id
  );

  console.log('4. Filtered friends list (all except current user):', friends);
  console.log('--- UserItems Debug End ---');


  if (loading) {
    return <Card sx={{ padding: 2, textAlign: 'center' }}>Загрузка пользователей...</Card>;
  }

  return (
    <Card
      variant="outlined"
      sx={{ padding: 2, backgroundColor: '#F1F7FA', border: 'none', borderRadius: 3 }}
    >
      {friends.length === 0 ? (
        <p>Пользователи не найдены или вы единственный пользователь.</p>
      ) : (
        friends.map((friend) => (
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
              <Avatar src={friend.avatar || ''} alt={friend.name || ''} sx={{ width: 46, height: 46 }} />
              {friend.isInNetwork && ( // isInNetwork теперь только для кружка статуса
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
            <span style={{ fontSize: 14 }}>{friend.name || friend.email}</span>
          </Link>
        ))
      )}
    </Card>
  );
};

export default UserItems;