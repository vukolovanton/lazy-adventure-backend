require('dotenv/config');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const productsRouter = require('./routers/products');
const userRouter = require('./routers/users');
const authJwt = require('./utils/jwt');
const connectDB = require('./utils/dbConnect');
const corsOptions = require('./utils/corsOptions');

const api = process.env.API_URL;

const { Server } = require('socket.io');
const socketio = new Server(process.env.SOCKET_PORT, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
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

// CORS
app.use(cors(corsOptions));
// app.options('*', cors());

// Middlewares
app.use(express.json());

// Routes
app.use(`${api}/users`, userRouter);
app.use(authJwt);
app.use(`${api}/products`, productsRouter);

connectDB();

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(process.env.EXPRESS_PORT, () =>
		console.log(`Server running on port ${process.env.EXPRESS_PORT}`)
	);
});
