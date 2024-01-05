import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import AdminLoginPasswordForm from '../components/AdminLoginPasswordForm'
import BroadcastMessage from '../components/BroadcastMessage'
import io from 'socket.io-client'
import AllowedUsersTable from '../components/AllowedUsersTable'

const AllowedUsers = () => {
    const [authenticated, setAuthenticated] = useState(false)
    const [allowedUsers, setAllowedUsers] = useState([])
    const inputedNameRef = useRef(null)
    const broadcastMessage = useRef(null)
    const passwordRef = useRef(null)
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        document.title = "Admin Panel"
    }, [])

    useEffect(() => {
        const newSocket = io('http://localhost:8000')
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [])

    const handleBroadcast = () => {
        socket.emit('sendBroadcast', broadcastMessage.current.value)
        alert("Broadcast Done")
        broadcastMessage.current.value = null
    }

    const fetchAllowedUsers = async () => {
        try {
            const response = await axios.get('/allowedUsers')
            setAllowedUsers(response.data)
        } catch (error) {
            alert('Error')
            console.error('Error fetching allowed users:', error)
        }
    }

    const handleRemoveUser = async (name) => {
        const confirmation = window.confirm(`Are you sure you want to remove ${name}?`)
        if (!confirmation) return

        try {
            await axios.delete('/allowedUsers/' + name)
            fetchAllowedUsers()
        } catch (error) {
            alert('Error')
            console.error('Error removing user:', error)
        }
    }

    const handleAddUser = async () => {
        try {
            if (!inputedNameRef.current.value) {
                alert('Please enter Name')
                return
            }
            await axios.post('/allowedUsers', { name: inputedNameRef.current.value })
            fetchAllowedUsers()
            inputedNameRef.current.value = ''
        } catch (error) {
            alert('Error')
            console.error('Error adding user:', error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (passwordRef.current.value === process.env.REACT_APP_PASSKEY) {
            setAuthenticated(true)
        } else {
            alert('Wrong Password')
            passwordRef.current.value = ''
        }
    }

    useEffect(() => {
        fetchAllowedUsers()
    }, [])

    return (
        <>
            {!authenticated ? (
                <AdminLoginPasswordForm handleSubmit={handleSubmit} passwordRef={passwordRef} />
            ) : (
                <>
                    <div className="flex flex-col w-11/12 mx-auto sm:w-9/12 md:w-8/12 mt-10">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <BroadcastMessage broadcastMessage={broadcastMessage} handleBroadcast={handleBroadcast} />
                                    <AllowedUsersTable inputedNameRef={inputedNameRef} handleAddUser={handleAddUser} allowedUsers={allowedUsers} handleRemoveUser={handleRemoveUser} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default AllowedUsers
