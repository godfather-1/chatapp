const express = require('express')
const app = express()

const http =require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT , () => {
    console.log(` Lisning on port ${PORT}`)

})

app.use(express.static(__dirname + '/public'))

app.get('/', (reg , res) => {
    res.sendFile(__dirname + '/index.html')
})


// scoket

const io = require('socket.io')(http)

io.on('connection' , (socket) => {
    console.log('connected...')
    socket.on('message' , (msg) => {
        console.log(msg)
        socket.broadcast.emit('message' , msg)
    })


})

