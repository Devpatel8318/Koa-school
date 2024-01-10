import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import NameForm from '../components/NameForm'
import MessageBar from '../components/MessageBar'
import Message from '../components/Message'

const Chat = () => {
    const [name, setName] = useState('')
    const [onlineUsers, setOnlineUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({ id: null, name: '' })
    const [newMessages, setNewMessages] = useState([])
    const [message, setMessage] = useState('')
    const [recipient, setRecipient] = useState({ id: null, name: '' })
    const [socket, setSocket] = useState(null)

    const handleSubmitName = (ev) => {
        ev.preventDefault()
        if (!name.length > 0) {
            alert('Please enter Name')
            return
        }
        socket.emit('join', name, (response) => {
            console.log(name)
            if (response.error) {
                alert(response.error)
            } else {
                setCurrentUser({ id: response.socketId, name })
            }

        })
    }

    const handleSendMessage = (ev) => {
        ev.preventDefault()
        if (!recipient.id) {
            alert('Please select recipient')
            return
        }
        if (!message.length > 0) {
            alert('Please type Message')
            return
        }
        socket.emit('privateMessage', {
            senderId: currentUser.id,
            senderName: currentUser.name,
            recipientId: recipient.id,
            message,
        })
        setNewMessages((messages) => [
            ...messages,
            {
                senderName: `You to ${recipient.name}`,
                message,
                self: true,
            },
        ])
        setMessage('')
    }

    useEffect(() => {
        const newSocket = io('http://localhost:8080')
        setSocket(newSocket)

        newSocket.on('onlineUsers', (users) => {
            setOnlineUsers(users)
        })

        newSocket.on('newMessage', ({ message, senderName }) => {
            setNewMessages((messages) => [
                ...messages,
                { senderName, message },
            ])
        })

        newSocket.on('Broadcast', (message) => {
            setNewMessages((messages) => [
                ...messages,
                {
                    senderName: "Broadcast",
                    message,
                    broadcast: true
                },
            ])
        })

        return () => {
            newSocket.disconnect()
        }
    }, [])

    return (
        <div className='w-full h-screen bg-blue-100 flex items-center justify-center '>
            {!currentUser.id ? (
                <NameForm handleSubmitName={handleSubmitName} setName={setName} name={name} />
            ) : (
                <>
                    <div className='absolute top-0 text-gray-800 pt-2'>
                        Logged-In User:{' '}
                        <span className='text-4xl text-blue-800 font-medium'>
                            {currentUser.name}
                        </span>
                    </div>
                    <div className='border-2 bg-white w-4/5 h-5/6 px-5 py-2 flex flex-col rounded-md'>
                        <MessageBar handleSendMessage={handleSendMessage} recipient={recipient} onlineUsers={onlineUsers} setRecipient={setRecipient} currentUser={currentUser} message={message} setMessage={setMessage} />
                        <div className='flex flex-col gap-2 justify-start overflow-x-hidden overflow-auto'>
                            {newMessages.length > 0 &&
                                newMessages.map((message, index) => (
                                    <Message index={index} message={message} />
                                ))}
                        </div>

                    </div>
                </>
            )}
        </div>
    )
}

export default Chat
