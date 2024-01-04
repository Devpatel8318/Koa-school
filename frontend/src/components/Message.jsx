import React from 'react'

function Message({index , message}) {
    return (
        <div key={index} className='border rounded-md'>
            <span className={`pl-2 font-semibold ${message.self ? 'text-orange-300' : 'text-blue-800'}`}>
                {message.senderName}
            </span>
            <span className='mx-1'>:</span>
            <span>{message.message}</span>
        </div>
    )
}

export default Message