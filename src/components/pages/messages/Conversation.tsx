import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { users } from '../../layout/sidebar/dataUsers';
import { useAuth } from '../../providers/useAuth';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  Avatar,
  Box,
  Divider,
  Fab,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Conversation = () => {
  const { id } = useParams<{ id: string }>();
  const { user, db } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  // Найти друга по Firebase UID
  const friend = users.find(u => u.id === id);

  if (!user) return <Typography>Загрузка...</Typography>;
  if (!friend || friend.id === user.id) {
    return <Typography>Пользователь не найден или нельзя писать себе</Typography>;
  }

  const chatId = [user.id, friend.id].sort().join('_');

  useEffect(() => {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      const arr: any[] = [];
      snapshot.forEach(doc => arr.push(doc.data()));
      setMessages(arr);
    });

    return () => unsubscribe();
  }, [db, chatId]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const messagesRef = collection(db, 'chats', chatId, 'messages');
    await addDoc(messagesRef, {
      fromUser: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      toUser: {
        id: friend.id,
        name: friend.name,
        avatar: friend.avatar,
      },
      message: text,
      timestamp: serverTimestamp(),
    });

    setText('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <List sx={{ height: '60vh', overflowY: 'auto', mb: 2 }}>
        {messages.map((msg, idx) => {
          const isCurrent = msg.fromUser.id === user.id;

          return (
            <ListItem
              key={idx}
              sx={{
                flexDirection: 'column',
                alignItems: isCurrent ? 'flex-end' : 'flex-start',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {!isCurrent && <Avatar src={msg.fromUser.avatar} />}
                <Box
                  sx={{
                    bgcolor: isCurrent ? 'primary.main' : 'grey.300',
                    color: isCurrent ? 'white' : 'black',
                    borderRadius: 2,
                    p: 1,
                    maxWidth: '60vw',
                    wordBreak: 'break-word',
                  }}
                >
                  <ListItemText primary={msg.message} />
                </Box>
                {isCurrent && <Avatar src={msg.fromUser.avatar} />}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.6,
                  textAlign: isCurrent ? 'right' : 'left',
                  width: '100%',
                  fontSize: 12,
                }}
              >
                {msg.fromUser.name}
              </Typography>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Напиши сообщение..."
          multiline
          maxRows={4}
          value={text}
          onChange={e => setText(e.target.value)}
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

export default Conversation;