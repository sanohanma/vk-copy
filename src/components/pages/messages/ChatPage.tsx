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

// src/pages/chat/ChatPage.tsx
import React, { FC, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../providers/useAuth'; // Убедись, что путь правильный
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  // doc, getDoc, // Закомментируем, если не используем
} from 'firebase/firestore';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  // CircularProgress, // Закомментируем, так как не используем
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Card from '../../ui/Card'; // Убедись, что путь к Card правильный

interface IMessage {
  id: string;
  text: string;
  fromUser: {
    id: string;
    name: string;
    avatar: string;
  };
  toUser: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: any; // Firebase Timestamp
}

const ChatPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  // ИЗМЕНЕНИЕ ЗДЕСЬ: Удалили isLoading из деструктуризации useAuth
  const { user, db, users: allUsersFromContext } = useAuth();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [toUser, setToUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ждем, пока allUsersFromContext не будет загружен и не будет пустым
    if (id && allUsersFromContext && allUsersFromContext.length > 0) {
      const foundToUser = allUsersFromContext.find((u) => u.id === id);
      if (foundToUser) {
        setToUser(foundToUser);
        console.log('ChatPage: toUser found:', foundToUser.name);
      } else {
        console.warn(`ChatPage: User with ID ${id} not found in mockUsers.`);
        // Здесь можно добавить fallback-логику, если пользователя нет в mockUsers
      }
    } else if (id && !allUsersFromContext) {
      console.log("ChatPage: Waiting for allUsersFromContext to load.");
    }
  }, [id, allUsersFromContext]);

  useEffect(() => {
    // Проверяем, что user, toUser и db загружены перед подпиской
    if (!user || !toUser || !db) {
        console.log("ChatPage useEffect: Skipping message subscription - user, toUser, or db not ready.");
        return;
    }

    const chatId = [user.id, toUser.id].sort().join('_');
    console.log('ChatPage useEffect: Calculated chatId:', chatId);

    const messagesCollectionRef = collection(db, 'messages');
    const q = query(
      messagesCollectionRef,
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages: IMessage[] = [];
      snapshot.forEach((doc) => {
        const msg = doc.data() as IMessage;
        const msgChatId = [msg.fromUser.id, msg.toUser.id].sort().join('_');
        if (msgChatId === chatId) {
          loadedMessages.push({ ...msg, id: doc.id });
        }
      });
      setMessages(loadedMessages);
      console.log(`ChatPage Firestore snapshot received: ${loadedMessages.length} messages for chat ${chatId}`);
    }, (error) => {
        console.error("Error listening to messages:", error);
    });

    return () => {
      console.log(`ChatPage useEffect: Unsubscribing from messages for chatId: ${chatId}`);
      unsubscribe();
    };
  }, [db, user, toUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() === '' || !user || !toUser) {
        console.warn("Cannot send message: message empty, user or toUser not defined.");
        return;
    }

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        fromUser: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        },
        toUser: {
          id: toUser.id,
          name: toUser.name,
          avatar: toUser.avatar,
        },
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
      console.log("Message sent successfully!");
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  // ИЗМЕНЕНИЕ ЗДЕСЬ: Убрали блок с CircularProgress
  if (!user) {
    return (
      <Card>
        <Typography sx={{ textAlign: 'center' }}>Пожалуйста, войдите в систему, чтобы использовать чат.</Typography>
      </Card>
    );
  }

  // Пока toUser не загружен, можно показать простое сообщение
  if (!toUser) {
    return (
      <Card>
        <Typography sx={{ textAlign: 'center' }}>Загрузка пользователя чата...</Typography>
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)' }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#333' }}>
          Чат с {toUser.name}
        </Typography>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, border: '1px solid #eee', borderRadius: 2, mb: 2 }}>
          {messages.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: '#888' }}>
              Начните диалог!
            </Typography>
          ) : (
            messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.fromUser.id === user.id ? 'flex-end' : 'flex-start',
                  mb: 1.5,
                }}
              >
                {msg.fromUser.id !== user.id && (
                  <Avatar src={msg.fromUser.avatar} sx={{ mr: 1 }} />
                )}
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: '70%',
                    bgcolor: msg.fromUser.id === user.id ? '#e3f2fd' : '#f0f0f0',
                    borderColor: msg.fromUser.id === user.id ? '#90caf9' : '#ccc',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {msg.fromUser.id === user.id ? 'Вы' : msg.fromUser.name}
                  </Typography>
                  <Typography variant="body1">{msg.text}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, color: '#888' }}>
                    {msg.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Paper>
                {msg.fromUser.id === user.id && (
                  <Avatar src={msg.fromUser.avatar} sx={{ ml: 1 }} />
                )}
              </Box>
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Напишите сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            multiline
            maxRows={4}
            sx={{ '& .MuiOutlinedInput-root': { pr: '8px' } }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            endIcon={<SendIcon />}
            sx={{ px: 3 }}
          >
            Отправить
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ChatPage;