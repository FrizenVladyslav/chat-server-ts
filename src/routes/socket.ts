import socket from 'socket.io'
import http from 'http'

export default (http: http.Server) => {
  const io = socket(http)

  io.on('connection', (socket: socket.Socket) => {
    console.log('user connected', socket)
    socket.on('disconnect', () => {
      console.log('Disconnected', socket)
    })
  })

  return io
}
