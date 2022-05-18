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
const bodyParser = require('body-parser');
const handleSockets = require('./utils/socketHandlers');

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
app.use(
	jwt({
		secret: process.env.TOKEN_SECRET,
		algorithms: ['HS256'],
	}).unless({
		path: [`${api}/users/register`, `${api}/users/login`, /\/public*/],
	})
);
//===

//=== Routes
app.use(`${api}/users`, userRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/player`, playerRouter);
app.use(`${api}/files`, require('./routers/upload'));
app.use('/public', express.static('public'));
//===

connectDB();

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(process.env.EXPRESS_PORT, () =>
		console.log(`Server running on port ${process.env.EXPRESS_PORT}`)
	);
});

httpServer.listen(process.env.SOCKET_PORT);
