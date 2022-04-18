require('dotenv/config');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const api = process.env.API_URL;
const productsRouter = require('./routers/products');
const userRouter = require('./routers/users');
const authJwt = require('./utils/jwt');

const { Server } = require('socket.io');
const socketio = new Server(3002, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

const position = {
  x: 200,
  y: 200,
};

socketio.on('connection', (socket) => {
  socket.emit('position', position);

  socket.on('move', (data) => {
    switch (data) {
      case 'left':
        position.x -= 5;
        socketio.emit('position', position);
        break;

      case 'right':
        position.y += 5;
        socketio.emit('position', position);
        break;
    }
  });
});

app.use(cors());
app.options('*', cors());

app.use(express.json());
// app.use(authJwt());
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, userRouter);

// app.use((err, req, res, next) => {
// 	if (err.name === 'UnauthorizedError') {
// 		res.status(401).send('Invalid token');
// 	}
// });

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('success');
  })
  .catch(() => {
    console.log('error');
  });

http.listen(3001, () => {
  console.log(api);
});
