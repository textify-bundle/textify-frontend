beforeEach(() => {
    cy.intercept('GET', '/api/user', {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com'
    }).as('getUser');
  });
  
  const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.engine.on("connection_error", (err) => {
    console.log("Connection Error:", err);
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Пользователь подключился, ID:', socket.id);

    socket.emit('add mess', {
        mess: 'Добро пожаловать в чат!',
        name: 'Система',
        className: 'success'
    });


    socket.on('send mess', (data) => {
        console.log('Получено сообщение от клиента:', data);

        if (!data || !data.name || !data.mess || !data.className) {
            console.log('Получены некорректные данные:', data);
            return;
        }

        
        const cleanData = {
            mess: String(data.mess).trim(),
            name: String(data.name).trim(),
            className: String(data.className)
        };

        console.log('Отправка сообщения всем клиентам:', cleanData);


        io.emit('add mess', cleanData);
    });


    socket.on('disconnect', (reason) => {
        console.log('Пользователь отключился, ID:', socket.id, 'Причина:', reason);
    });
});


const PORT = process.env.PORT || 3000;
const server = http.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Откройте http://localhost:${PORT} в браузере`);
});