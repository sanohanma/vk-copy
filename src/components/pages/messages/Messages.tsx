// src/pages/messages/Messages.tsx
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useAuth } from '../../providers/useAuth';
import { IMessage } from '../../../types';
import {
  Alert,
  Avatar,
  Divider,
  Fab,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
} from '@mui/material';
import Card from '../../ui/Card';
import { Send as SendIcon } from '@mui/icons-material';

const Messages: FC = () => {
  const { db, user } = useAuth();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'messages'), (snapshot) => {
      const array: IMessage[] = [];
      snapshot.forEach((doc) => {
        array.push(doc.data() as IMessage);
      });
      setMessages(array);
    });
    return () => {
      unsub();
    };
  }, [db]);

  const addMessageHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      await addDoc(collection(db, 'messages'), {
        user,
        message,
      });
      setMessage('');
    } catch (e: any) {
      setError(e.message || 'Ошибка отправки сообщения');
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" style={{ marginBottom: 20 }}>
          {error}
        </Alert>
      )}
      <Card>
        <List sx={{ height: '65vh', overflow: 'auto' }}>
          {messages.map((msg, idx) => {
            const isCurrentUser = msg.user.id === user?.id;
            return (
              <ListItem key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: isCurrentUser ? 'flex-end' : 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, gap: 1 }}>
                  {!isCurrentUser && <Avatar sx={{ width: 30, height: 30 }} src={msg.user.avatar} />}
                  <Box
                    sx={{
                      bgcolor: isCurrentUser ? 'primary.main' : 'grey.300',
                      color: isCurrentUser ? 'primary.contrastText' : 'text.primary',
                      borderRadius: 2,
                      padding: '8px 12px',
                      maxWidth: '70vw',
                      wordBreak: 'break-word',
                    }}
                  >
                    <ListItemText primary={msg.message} />
                  </Box>
                  {isCurrentUser && <Avatar sx={{ width: 30, height: 30 }} src={msg.user.avatar} />}
                </Box>
                <ListItemText
                  secondary={msg.user.name}
                  sx={{ fontSize: '0.75rem', opacity: 0.6, mt: 0 }}
                />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Box sx={{ display: 'flex', padding: '20px', gap: 2 }}>
          <TextField
            id="outlined-basic-email"
            label="Type Something"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            fullWidth
          />
          <Fab color="primary" onClick={addMessageHandler} disabled={!message.trim()}>
            <SendIcon />
          </Fab>
        </Box>
      </Card>
    </>
  );
};

export default Messages;
