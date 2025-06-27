// // ChatPage.tsx
// import React, { useEffect, useState } from 'react';
// import {
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   addDoc,
//   serverTimestamp,
// } from 'firebase/firestore';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../../providers/useAuth';// поправь путь если нужно
// import { Avatar, Box, Divider, Fab, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';

// const ChatPage = () => {
//   const { user, db } = useAuth();
//   const { id } = useParams<{ id: string }>();
//   const [messages, setMessages] = useState<any[]>([]);
//   const [text, setText] = useState('');

//   if (!user) return <Typography>Загрузка пользователя...</Typography>;
//   if (!id) return <Typography>Пользователь не выбран</Typography>;

//   const friendId = id;
//   const chatId = [user.id, friendId].sort().join('_');

//   useEffect(() => {
//     const messagesRef = collection(db, 'chats', chatId, 'messages');
//     const q = query(messagesRef, orderBy('timestamp', 'asc'));

//     const unsub = onSnapshot(q, (snapshot) => {
//       const msgs: any[] = [];
//       snapshot.forEach(doc => msgs.push(doc.data()));
//       setMessages(msgs);
//     });

//     return () => unsub();
//   }, [chatId, db]);

//   const sendMessage = async () => {
//     if (!text.trim()) return;

//     await addDoc(collection(db, 'chats', chatId, 'messages'), {
//       fromUser: user,
//       toUser: { id: friendId }, // если надо, подтяни из users данные друга
//       message: text,
//       timestamp: serverTimestamp(),
//     });

//     setText('');
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" gutterBottom>Чат</Typography>
//       <List sx={{ height: '60vh', overflowY: 'auto', mb: 2 }}>
//         {messages.map((msg, idx) => {
//           const isCurrentUser = msg.fromUser?.id === user.id;
//           return (
//             <ListItem key={idx} sx={{ flexDirection: 'column', alignItems: isCurrentUser ? 'flex-end' : 'flex-start' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 {!isCurrentUser && <Avatar src={msg.fromUser.avatar} />}
//                 <Box
//                   sx={{
//                     bgcolor: isCurrentUser ? 'primary.main' : 'grey.300',
//                     color: isCurrentUser ? 'primary.contrastText' : 'text.primary',
//                     p: 1,
//                     borderRadius: 2,
//                     maxWidth: '60vw',
//                     wordBreak: 'break-word',
//                   }}
//                 >
//                   <ListItemText primary={msg.message} />
//                 </Box>
//                 {isCurrentUser && <Avatar src={msg.fromUser.avatar} />}
//               </Box>
//               <ListItemText secondary={msg.fromUser.name} sx={{ fontSize: '0.75rem', opacity: 0.6 }} />
//             </ListItem>
//           );
//         })}
//       </List>
//       <Divider />
//       <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//         <TextField
//           multiline
//           maxRows={4}
//           placeholder="Введите сообщение"
//           value={text}
//           onChange={e => setText(e.target.value)}
//           fullWidth
//         />
//         <Fab color="primary" onClick={sendMessage} disabled={!text.trim()}>
//           <SendIcon />
//         </Fab>
//       </Box>
//     </Box>
//   );
// };

// export default ChatPage;



// ChatPage.tsx
import React, { useEffect, useState } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../providers/useAuth'; // <-- Убедись, что этот путь правильный
import { Avatar, Box, Divider, Fab, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatPage = () => {
  // <-- ИЗМЕНЕНО: Получаем users (allUsersFromContext) из useAuth
  const { user, db, users: allUsersFromContext } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  // <-- ИЗМЕНЕНО: Находим объект друга по его ID (UID)
  const friend = allUsersFromContext.find(u => u.id === id);

  // --- Отладочные логи ---
  useEffect(() => {
    console.log('ChatPage component mounted/updated.');
    console.log('Current user (from useAuth):', user);
    console.log('Target friend ID (from URL params):', id);
    console.log('Found friend object:', friend);
    if (user && friend) {
      console.log('Calculated chatId:', [user.id, friend.id].sort().join('_'));
    }
  }, [user, id, friend]);
  // --- Конец отладочных логов ---


  if (!user) {
    console.log("ChatPage: User is not loaded.");
    return <Typography>Загрузка пользователя...</Typography>;
  }

  // Если друг не найден или пытаемся писать себе
  if (!friend || friend.id === user.id) {
    console.log("ChatPage: Friend not found or trying to chat with self.");
    return <Typography>Пользователь не найден или нельзя писать самому себе.</Typography>;
  }

  // ID чата всегда должен быть одинаковым для двух пользователей, независимо от порядка
  const chatId = [user.id, friend.id].sort().join('_');

  useEffect(() => {
    // Проверяем, что user и friend доступны перед подпиской
    if (!user || !friend) {
        console.log("ChatPage: user or friend not yet loaded for useEffect.");
        return;
    }

    console.log('ChatPage useEffect: Subscribing to messages for chatId:', chatId);
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsub = onSnapshot(q, (snapshot) => {
      console.log('Firestore snapshot received:', snapshot.docs.length, 'messages');
      const msgs: any[] = [];
      snapshot.forEach(doc => msgs.push(doc.data()));
      setMessages(msgs);
    }, (error) => {
        console.error("Error fetching messages:", error); // Логируем ошибки Firestore
    });

    return () => {
      unsub();
      console.log('ChatPage useEffect: Unsubscribing from messages for chatId:', chatId);
    };
  }, [chatId, db, user, friend]); // Добавил user и friend в зависимости

  const sendMessage = async () => {
    if (!text.trim()) return;

    // --- Отладочные логи для отправки ---
    console.log('Attempting to send message:');
    console.log('  From user:', user.id, user.name);
    console.log('  To friend:', friend.id, friend.name);
    console.log('  Message text:', text);
    console.log('  Target chatId:', chatId);
    // --- Конец отладочных логов ---

    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        fromUser: { // <-- ИЗМЕНЕНО: Отправляем полные данные отправителя
          id: user.id,
          name: user.name || user.email || 'Без имени',
          avatar: user.avatar || '',
        },
        toUser: { // <-- ИЗМЕНЕНО: Отправляем полные данные получателя
          id: friend.id,
          name: friend.name || friend.email || 'Без имени',
          avatar: friend.avatar || '',
        },
        message: text,
        timestamp: serverTimestamp(),
      });
      console.log('Message sent successfully!');
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setText('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Чат с {friend.name || friend.email || 'Неизвестным пользователем'}</Typography>
      <Divider />
      <List sx={{ height: '60vh', overflowY: 'auto', mb: 2, mt: 2 }}>
        {messages.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
            Пока нет сообщений. Начните беседу!
          </Typography>
        ) : (
          messages.map((msg, idx) => {
            const isCurrentUser = msg.fromUser?.id === user.id;
            return (
              <ListItem
                key={idx}
                sx={{ flexDirection: 'column', alignItems: isCurrentUser ? 'flex-end' : 'flex-start', py: 0.5 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {!isCurrentUser && <Avatar src={msg.fromUser?.avatar || ''} sx={{ width: 30, height: 30 }} />}
                  <Box
                    sx={{
                      bgcolor: isCurrentUser ? 'primary.main' : 'grey.300',
                      color: isCurrentUser ? 'white' : 'black',
                      p: 1,
                      borderRadius: 2,
                      maxWidth: '60vw',
                      wordBreak: 'break-word',
                    }}
                  >
                    <ListItemText primary={msg.message} sx={{ m: 0 }} />
                  </Box>
                  {isCurrentUser && <Avatar src={msg.fromUser?.avatar || ''} sx={{ width: 30, height: 30 }} />}
                </Box>
                <Typography
                  variant="caption"
                  sx={{ fontSize: '0.75rem', opacity: 0.6, mt: 0.5 }}
                >
                  {msg.fromUser?.name || msg.fromUser?.email || 'Неизвестно'}
                  {msg.timestamp?.toDate ? ` - ${new Date(msg.timestamp.toDate()).toLocaleTimeString()}` : ''}
                </Typography>
              </ListItem>
            );
          })
        )}
      </List>
      <Divider />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          multiline
          maxRows={4}
          placeholder="Введите сообщение"
          value={text}
          onChange={e => setText(e.target.value)}
          fullWidth
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Fab color="primary" onClick={sendMessage} disabled={!text.trim()}>
          <SendIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default ChatPage;