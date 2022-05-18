const { userJoin, getRoomUsers, userLeave } = require('../utils/users');

const position = {
  x: 200,
  y: 200,
};

function handleSockets(socket, io) {
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

  socket.on('src', (src) => {
    io.emit('newSrc', {
      src
    })
  })
}

module.exports = handleSockets;
