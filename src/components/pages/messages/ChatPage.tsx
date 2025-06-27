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
import { useAuth } from '../../providers/useAuth';// поправь путь если нужно
import { Avatar, Box, Divider, Fab, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatPage = () => {
  const { user, db } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  if (!user) return <Typography>Загрузка пользователя...</Typography>;
  if (!id) return <Typography>Пользователь не выбран</Typography>;

  const friendId = id;
  const chatId = [user.id, friendId].sort().join('_');

  useEffect(() => {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsub = onSnapshot(q, (snapshot) => {
      const msgs: any[] = [];
      snapshot.forEach(doc => msgs.push(doc.data()));
      setMessages(msgs);
    });

    return () => unsub();
  }, [chatId, db]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      fromUser: user,
      toUser: { id: friendId }, // если надо, подтяни из users данные друга
      message: text,
      timestamp: serverTimestamp(),
    });

    setText('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Чат</Typography>
      <List sx={{ height: '60vh', overflowY: 'auto', mb: 2 }}>
        {messages.map((msg, idx) => {
          const isCurrentUser = msg.fromUser?.id === user.id;
          return (
            <ListItem key={idx} sx={{ flexDirection: 'column', alignItems: isCurrentUser ? 'flex-end' : 'flex-start' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {!isCurrentUser && <Avatar src={msg.fromUser.avatar} />}
                <Box
                  sx={{
                    bgcolor: isCurrentUser ? 'primary.main' : 'grey.300',
                    color: isCurrentUser ? 'primary.contrastText' : 'text.primary',
                    p: 1,
                    borderRadius: 2,
                    maxWidth: '60vw',
                    wordBreak: 'break-word',
                  }}
                >
                  <ListItemText primary={msg.message} />
                </Box>
                {isCurrentUser && <Avatar src={msg.fromUser.avatar} />}
              </Box>
              <ListItemText secondary={msg.fromUser.name} sx={{ fontSize: '0.75rem', opacity: 0.6 }} />
            </ListItem>
          );
        })}
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
        />
        <Fab color="primary" onClick={sendMessage} disabled={!text.trim()}>
          <SendIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default ChatPage;