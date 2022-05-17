require('dotenv/config');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('express-jwt');
const cors = require('cors');
const productsRouter = require('./routers/products');
const playerRouter = require('./routers/player');
const userRouter = require('./routers/users');
const connectDB = require('./utils/dbConnect');
const corsOptions = require('./utils/corsOptions');
const { userJoin, getRoomUsers, userLeave } = require('./utils/users');
const bodyParser = require('body-parser');

global.__basedir = __dirname;

const app = express();
const httpServer = require('http').createServer(app);
const api = process.env.API_URL;

app.use(bodyParser.urlencoded({ extended: true }));

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://192.168.31.135:3000'],
    methods: ['GET', 'POST'],
  },
});

const position = {
  x: 200,
  y: 200,
};

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room, details }) => {
    const user = userJoin(socket.id, username, room, details);

    position[details.userId] = {
      x: 100,
      y: 100,
    };

    socket.join(user.room);

    // Broadcast when a user connects
    io.to(user.room).emit('joined', {
      roomUserId: user.id,
      message: `${user.username} has joined`,
      data: getRoomUsers(user.room),
    });

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });

    io.emit('position', position);
  });

  socket.on('drop', (data) => {
    position.x = data.x;
    position.y = data.y;

    position[data.userId].x = data.x;
    position[data.userId].y = data.y;

    io.emit('position', position);
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit('left', {
        message: `${user.username} has left`,
        data: getRoomUsers(user.room),
      });

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

// CORS
app.use(cors(corsOptions));
// app.options('*', cors());

// Middlewares
app.use(express.json());
app.use(
  jwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
  }).unless({
    path: [`${api}/users/register`, `${api}/users/login`, /\/public*/,],
  })
);

// Routes
app.use(`${api}/users`, userRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/player`, playerRouter);
app.use(`${api}/files`, require('./routers/upload'));

app.use("/public", express.static('public'));

connectDB();

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(process.env.EXPRESS_PORT, () =>
    console.log(`Server running on port ${process.env.EXPRESS_PORT}`)
  );
});

httpServer.listen(process.env.SOCKET_PORT);
