require('dotenv/config');
const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');
const characterRouter = require('./routers/character');
const corsOptions = require('./utils/corsOptions');
const bodyParser = require('body-parser');
const handleSockets = require('./utils/socketHandlers');
const { error } = require('console');

global.__basedir = __dirname;

const app = express();
const httpServer = require('http').createServer(app);
const api = process.env.API_URL;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//=== Socket
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://192.168.31.135:3000'],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  handleSockets(socket, io);
});
//===

//=== Middlewares
app.use(express.json());
//===

//=== Routes
app.use(`${api}/character`, characterRouter);
app.use(`${api}/files`, require('./routers/upload'));
app.use('/public/maps/', express.static('public/maps/'));
app.use('/public/monsters', express.static('public/monsters'));
//===

app.listen(process.env.EXPRESS_PORT, () =>
  console.log(`Server running on port ${process.env.EXPRESS_PORT}`)
);

httpServer.listen(process.env.SOCKET_PORT);
