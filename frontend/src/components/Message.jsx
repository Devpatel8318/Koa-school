import React from 'react'

function Message({ index, message }) {
    const messageClasses = `border rounded-md ${message.broadcast ? 'bg-blue-500 text-white' : ''}`

    const senderNameClasses = `pl-2 font-semibold ${message.self ? 'text-orange-300' : 'text-blue-800'}`

    return (
        <div key={index} className={messageClasses}>
            <span className={senderNameClasses}>
                {message.senderName}
            </span>
            <span className={`mx-1 ${message.broadcast ? 'text-white' : ''}`}>:</span>
            <span className={`${message.broadcast ? 'text-white' : ''}`}>
                {message.message}
            </span>
        </div>
    )
}

export default Message
