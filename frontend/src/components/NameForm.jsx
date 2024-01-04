import React from 'react'

function NameForm({ handleSubmitName, name, setName }) {
    return (
        <div className='border-2 bg-white w-1/3 px-5 py-2 flex flex-col gap-8 justify-between rounded-md'>
            <div className='text-center text-5xl text-gray-600'>Join Chat</div>
            <form className='border flex rounded-md' onSubmit={handleSubmitName}>
                <input
                    type='text'
                    id='nameInput'
                    value={name}
                    className='border grow px-3 py-1'
                    onChange={(e) => setName(e.target.value.trim().toLowerCase())}
                    placeholder='Enter your name'
                />
                <button className='border px-3 py-2' type='submit'>
                    Join
                </button>
            </form>
        </div>
    )
}

export default NameForm