// let connetcionsByuserId = {
//   'someUserId':  [ 'array of sockets ']
// }

// function notifyUsers(useraIds){
//   useraIds.forEach(id => {
//     if (connetcionsByuserId[id]) {
//       connetcionsByuserId[id].forEach( socket => {

//       })
//     }
//   })
// }

// const UserRepository = require('../repositories/UserRepository')
// const NotificationRepository = require('../repositories/NotificationRepository')

let connections = {

}

module.exports = (io) => {
  io.on('connection', socket => {
    console.log('CONNECTED TO SOCKET')
    socket.on('share redux action', action => {
      socket.broadcast.emit('external redux action from another client', action)
    })

    socket.on('save user connection', (userId) => {
      console.log(' SAVE USER CONNECTION :' + socket.id + ' user:' + userId)
      connections[userId] = connections[userId] ? [ ...connections[userId], socket.id ] : [ socket.id ]
      socket.userId = userId
      console.log(' CONNECTIONS : _________________________________')
      console.log(connections)
      console.log('socket: ______________________________________')
      console.log(socket.userId)
      // просто првоерял, работает ли такое
      // Object.values(connections).forEach( userConnections => {
      //   userConnections.forEach( (socketId) => {
      //      io.to(socketId).emit('fun')
      //   })
      // })
    })

    socket.on('notify users', (notificationParams, usersIdsArr) => {
      console.log(' NOTYFY USERS ___________________________')
      console.log(notificationParams)
      console.log(usersIdsArr)
      // NotificationRepository.create(notificationParams)
      //   .then(notification => {
      //     UserRepository.notifyUsers(notification._id, usersIdsArr)
      //       .then( () => {
      //         usersIdsArr.forEach( (userId) => {
      //           if (connections[userId]){
      //             connections[userId].forEach( socketId => {
      //               io.to(socketId).emit('new notification', notification)
      //             })
      //           }
      //         })
      //       })
      //       .catch(err => {
      //         console.log(err)
      //       })
      //   })
      //   .catch( err => {
      //     console.log('err')
      //   })
    })

    socket.on('disconnect', () => {
      console.log('SOCKET DISCKONECTED')
      console.log(socket.userId)
      if (socket.userId && connections[socket.userId]) {
        connections[socket.userId] = connections[socket.userId].filter(socketId => socketId !== socket.id)
        if (!connections[socket.userId].length) {
          delete connections[socket.userId]
        }
        console.log(' CONNECTIONS _______________________')
        console.log(connections)
      }
    }
    )
  })
}
