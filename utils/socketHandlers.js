const { vary } = require('express/lib/response');
const { userJoin, getRoomUsers, userLeave, removeMonster, updateMonsterHitPoints } = require('../utils/users');

const position = {
  x: 200,
  y: 200,
};

function handleSockets(socket, io) {
  socket.on('joinRoom', ({ username, room, details }) => {
    const user = userJoin(socket.id, username, room, details);
    console.log(user, 'user')

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

  socket.on('removeMonster', (details) => {
    const user = removeMonster(socket.id, details);

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

  socket.on('updateMonsterHitPoints', (details) => {
    updateMonsterHitPoints(socket.id, details);
    io.emit('updateMonsterHealth', {
      details,
    })
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
  });

  socket.on('roll', (value) => {
    io.emit('diceRolled', value);
  });


}

module.exports = handleSockets;
