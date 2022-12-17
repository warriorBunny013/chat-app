// const { text } = require("express");

const socket=io();
var currentTime = new Date();

var currentOffset = currentTime.getTimezoneOffset();

var ISTOffset = 330;   // IST offset UTC +5:30 

var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

// ISTTime now represents the time in IST coordinates

var hoursIST = ISTTime.getHours()
var minutesIST = ISTTime.getMinutes()

// document.write("<b>" + hoursIST + ":" + minutesIST + " " + "</b>")

let nam;
let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message__area');

do{
    nam=prompt('Please enter your name to chat: ')

}while(!nam)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
});

function sendMessage(message){
    let msg={
        user:nam,
        message:message.trim()
    }

    //append mssg
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()

    //send msg to server
    socket.emit('message',msg)
}
 function appendMessage(msg,type){
     let mainDiv=document.createElement('div');
     let className=type
     mainDiv.classList.add(className,'message')

     let markup=`
       <h4>${msg.user}</h4>
       <p>${msg.message}</p>
       
     `
     mainDiv.innerHTML=markup
     messageArea.appendChild(mainDiv)
 }

//recieve mssg

socket.on('message',(msg)=>{
//    console.log(msg); 

  appendMessage(msg,'incoming');
  scrollToBottom()
})


//scroll msgs
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}