import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import AdminLoginPasswordForm from '../components/AdminLoginPasswordForm'
import BroadcastMessage from '../components/BroadcastMessage'
import io from 'socket.io-client'
import AllowedUsersTable from '../components/AllowedUsersTable'

const AllowedUsers = () => {
    const [authenticated, setAuthenticated] = useState(false)
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/allowedUsers/admin', {
                password: passwordRef.current.value
            })
            setAuthenticated(true)
        } catch (err) {
            alert('Wrong Password')
            passwordRef.current.value = ''
        }

    }
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
                                    <BroadcastMessage socket={socket} />
                                    <AllowedUsersTable />
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
