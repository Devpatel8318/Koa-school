import React from 'react'

function MessageBar({ handleSendMessage, recipient, onlineUsers, setRecipient, currentUser, message, setMessage }) {
    return (
        <form className='flex rounded-md mb-3' onSubmit={handleSendMessage}>
            <select
                value={recipient.id}
                onChange={(e) => {
                    const selectedRecipient = onlineUsers.find(
                        (user) => user[0] === e.target.value
                    )
                    setRecipient({
                        id: selectedRecipient[0],
                        name: selectedRecipient[1],
                    })
                }}
                className='px-1 border rounded-l-md'
            >
                <option value=''>Select recipient</option>
                {onlineUsers
                    .filter((user) => user[0] !== currentUser.id)
                    .map((user, index) => (
                        <option key={index} value={user[0]}>
                            {user[1]}
                        </option>
                    ))}
            </select>
            <input
                type='text'
                id='nameInput'
                value={message}
                className='border grow px-3 py-1 mx-1'
                onChange={(e) => setMessage(e.target.value)}
                placeholder='type Message'
            />
            <button type='submit' className='border px-3 py-2 rounded-r-md'>
                send
            </button>
        </form>
    )
}

export default MessageBar