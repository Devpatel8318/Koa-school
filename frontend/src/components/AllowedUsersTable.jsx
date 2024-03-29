import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

function AllowedUsersTable() {


    const inputedNameRef = useRef(null)
    const [allowedUsers, setAllowedUsers] = useState([])

    const handleRemoveUser = async (name) => {
        const confirmation = window.confirm(`Are you sure you want to remove ${name}?`)
        if (!confirmation) return

        try {
            const { data } = await axios.delete('http://localhost:8080/allowedUser/delete/' + name)

            if (data.success) {
                fetchAllowedUsers()
            } else {
                alert(data.reason)
            }
        } catch (error) {
            alert(error.response.data.reason)
        }
    }

    const fetchAllowedUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/allowedUser/view?list=all')
            if (data.success) {
                setAllowedUsers(data.data)
            }
            else {
                alert(data.reason)
            }
        } catch (error) {
            alert(error.response.data.reason)
        }
    }

    const handleAddUser = async () => {
        try {
            if (!inputedNameRef.current.value) {
                alert('Please enter Name')
                return
            }

            const { data } = await axios.post('http://localhost:8080/allowedUser/add/', { name: inputedNameRef.current.value.trim().toLowerCase() })

            if (data.success) {
                fetchAllowedUsers()
            }
            else {
                alert(data.reason)
            }
            inputedNameRef.current.value = ''
        } catch (error) {
            alert(error.response.data.reason)
        }
    }

    useEffect(() => {
        fetchAllowedUsers()
    }, [])

    return (
        <>
            <div className='w-full max-w-md mx-auto text-center bg-white mt-8 rounded-lg px-2 pt-2 pb-2 mb-2'>
                <label className='block text-gray-700 text-lg font-semibold mb-2' htmlFor='firstName'>
                    Edit Allowed Users
                </label>
            </div>
            <table className="min-w-full text-sm font-light text-center sm:text-lg border">

                <thead className="font-medium border-b">
                    <tr>
                        <th scope="col" className="px-6 py-4">Allowed Users</th>
                        <th scope="col" className="px-6 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    <tr className="transition duration-100 ease-in-out border-b hover:bg-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <input
                                ref={inputedNameRef}
                                type="text"
                                placeholder="Enter username"
                                className="border rounded px-2 py-1"
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button onClick={handleAddUser} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> Add</button>
                        </td>
                    </tr>
                    {allowedUsers?.map((allowedUser, index) => (
                        <tr key={index} className="transition duration-100 ease-in-out border-b hover:bg-gray-200">
                            <td className="px-6 py-4 font-medium whitespace-nowrap">{allowedUser.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleRemoveUser(allowedUser.name)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AllowedUsersTable