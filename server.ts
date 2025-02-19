import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Пользователь подключился, ID:', socket.id);

  socket.emit('add mess', {
    mess: 'Добро пожаловать в чат!',
    name: 'Система',
    className: 'success'
  });

  socket.on('send mess', (data) => {
    if (!data || !data.name || !data.mess || !data.className) {
      console.log('Получены некорректные данные:', data);
      return;
    }

    const cleanData = {
      mess: String(data.mess).trim(),
      name: String(data.name).trim(),
      className: String(data.className)
    };

    io.emit('add mess', cleanData);
  });

  socket.on('disconnect', (reason) => {
    console.log('Пользователь отключился, ID:', socket.id, 'Причина:', reason);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
