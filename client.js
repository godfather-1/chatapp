
const socket = io()

let nam;
let textarea = document.querySelector('#textarea')
let messagearea = document.querySelector('.message__area')


// prompt MSG
do {
    nam = prompt('Please enter your name : ')
}while(!nam)


textarea.addEventListener('keyup' , (e) => {
    if(e.key === 'Enter')
        sendmessage(e.target.value)
})


function sendmessage(message){
    let msg = {
        user: nam,
        message: message.trim()
    }
    // append
    appendMessage(msg , 'outgoing')
    textarea.value = ''
    scrollTobottom()

    // send to server

    socket.emit('message' , msg)

}


function appendMessage(msg , type){
    let maindiv = document.createElement('div')
    let classname = type
    maindiv.classList.add(classname , 'message')

    let markup = `
        <h4>${msg.user} </h4>
        <p>${msg.message} </p>
    `
    maindiv.innerHTML = markup
    messagearea.appendChild(maindiv)

}


// recive msg

socket.on('message' , (msg) =>{
    appendMessage(msg , 'incoming' )
    scrollTobottom()
})

function scrollTobottom(){
    messagearea.scrollTop = messagearea.scrollHeight
}






