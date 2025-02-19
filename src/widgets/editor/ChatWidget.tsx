import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  IconButton,
  Typography,
  Fade,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import { io, Socket } from 'socket.io-client';

interface Message {
  mess: string;
  name: string;
  className: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
 
    const newSocket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      console.log('Connected to chat server');
    });

    newSocket.on('add mess', (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && socket) {
      socket.emit('send mess', {
        mess: message,
        name: 'Пользователь',
        className: 'error',
      });
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      <Fade in={isOpen}>
        <Paper
          elevation={3}
          sx={{
            display: isOpen ? 'flex' : 'none',
            flexDirection: 'column',
            position: 'absolute',
            bottom: 60,
            right: 0,
            width: 300,
            height: 400,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              p: 1,
              bgcolor: 'primary.main',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Чат</Typography>
            <IconButton
              size="small"
              onClick={() => setIsOpen(false)}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {messages.map((msg, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  p: 1,
                  maxWidth: '80%',
                  alignSelf: msg.className === 'error' ? 'flex-end' : 'flex-start',
                  bgcolor: msg.className === 'error' ? 'error.light' : 'primary.light',
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  {msg.name}
                </Typography>
                <Typography variant="body1">{msg.mess}</Typography>
              </Paper>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          <Box sx={{ p: 2, bgcolor: 'grey.100' }}>
            <TextField
              fullWidth
              size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Введите сообщение..."
              variant="outlined"
            />
          </Box>
        </Paper>
      </Fade>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsOpen(!isOpen)}
        startIcon={<ChatIcon />}
      >
        {isOpen ? 'Закрыть чат' : 'Открыть чат'}
      </Button>
    </Box>
  );
};

export default ChatWidget;
