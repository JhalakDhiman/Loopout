import React, { useContext, useEffect, useRef, useState } from 'react'
import { initializeSocket, receiveMessage, sendMessage } from '../services/socket'
import { CourseContext } from '../context/CourseContext'
import HighlightedText from '../components/common/HighlightedText'
import community from '../assets/community3.webp'
import { IoIosSend } from "react-icons/io";
import { AuthContext } from '../context/AuthContext'

const ChatPage = () => {

  const { course } = useContext(CourseContext);
  const {user} = useContext(AuthContext);
  const [message, setMessage] = useState();
  const messageRef = useRef();

  useEffect(() => {

    initializeSocket(course._id);

    receiveMessage('message', data => {
      appendIncomingMessages(data);
    })

  }, [])

  const submitHandler = async (event) => {
    event.preventDefault();
    sendMessage('message', {
      message,
      sender:user
    });
    appendOutgoingMessages(message);
    setMessage("");
  }

  const appendIncomingMessages = (data) => {

    console.log("going to append messages");

    const messageBox = document.querySelector('.messages');

    console.log(messageBox);

    const newMessageBox = document.createElement('div');
    newMessageBox.classList.add('flex','mb-1');
    const newMessage = document.createElement('div');
    newMessage.classList.add('text-richblack-5', 'bg-richblack-600' ,'p-2', 'rounded-lg');
    newMessage.innerHTML = `
      <p class='text-[16px] text-blue-300 italic'>${data.sender.firstName} ${data.sender.lastName}<p>
      <p>${data.message}</p>
    `

    newMessageBox.appendChild(newMessage);
    messageBox.appendChild(newMessageBox);
    messageRef.current = newMessageBox;
    scrollToBottom();

  }

  const appendOutgoingMessages = (data)=>{
    const messageBox = document.querySelector('.messages');
    const newMessageBox = document.createElement('div');
    newMessageBox.classList.add('flex','flex-row-reverse','mb-1');
    const newMessage = document.createElement('div');
    newMessage.classList.add('text-richblack-5', 'bg-richblack-600' ,'p-2', 'rounded-lg');
    newMessage.innerHTML = `
      <p>${data}</p>
    `

    newMessageBox.appendChild(newMessage);
    messageBox.appendChild(newMessageBox);
    messageRef.current = newMessageBox;
    scrollToBottom();
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  return (
    <div className='flex w-[100vw]'>
      <div className='bg-richblack-800 relative h-[600px] w-1/2'>
        <div 
        // ref={messageRef}
        className='messages p-3 overflow-y-auto max-h-full flex-grow flex flex-col pb-16'>
          
        </div>

        <form onSubmit={submitHandler}>
          <div className='absolute bottom-0 w-full flex items-center h-[60px] bg-richblack-700 rounded-lg overflow-y-hidden '>
            <input
              type='text'
              name='message'
              id='message'
              placeholder='enter your message'
              onChange={(event) => {
                setMessage(event.target.value)
              }}
              value={message}
              className='w-[90%] h-[86%] ml-3 pl-3 rounded-lg bg-richblack-900 m-2 text-richblack-5'
            />
            <button className='text-blue-200 h-[80%] w-[6%]'>
              <IoIosSend className='w-full h-full' />
            </button>
          </div>
        </form>
      </div>
      <div className='flex flex-col gap-3 w-1/2 p-5'>
        <h1 className='text-richblack-5 text-3xl font-bold'>Welcome to <HighlightedText text={'Course Community'} /></h1>
        <p className='text-richblack-100 font-semibold text-xl italic'>Let's resolve doubts of each other </p>
        <img src={community} className='w-full h-[400px]' />
      </div>
    </div>
  )
}

export default ChatPage
