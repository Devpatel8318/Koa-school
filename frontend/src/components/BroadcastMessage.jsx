import React, { useRef } from 'react'

function BroadcastMessage({ socket }) {

    const broadcastMessage = useRef(null)


    const handleBroadcast = () => {
        socket.emit('sendBroadcast', broadcastMessage.current.value)
        alert("Broadcast Done")
        broadcastMessage.current.value = null
    }
    return (
        <div className="transition duration-100 ease-in-out  hover:bg-gray-200  flex items-center justify-center mb-4">
            <div className="px-6 py-4 whitespace-nowrap grow">
                <input
                    ref={broadcastMessage}
                    type="text"
                    placeholder="Enter Message to Broadcast"
                    className="border rounded px-2 py-1 w-full" />
            </div>
            <div className="px-6 py-4 whitespace-nowrap">
                <button onClick={handleBroadcast} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex mx-auto gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                    </svg>
                    <span>
                        Broadcast
                    </span>
                </button>
            </div>
        </div>
    )
}

export default BroadcastMessage