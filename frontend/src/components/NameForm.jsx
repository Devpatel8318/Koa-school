import React from 'react'

function NameForm({ handleSubmitName, name, setName }) {
    return (
        <div className='border-2 bg-white w-1/3 px-5 py-2 flex flex-col gap-8 justify-between rounded-md -mt-20'>
            <div className='text-center py-4 text-5xl text-gray-600'>Join Chat</div>
            <form className='gap-1 flex rounded-md' onSubmit={handleSubmitName}>
                <input
                    type='text'
                    id='nameInput'
                    value={name}
                    className='border rounded-l-md grow px-3 py-1'
                    onChange={(e) => setName(e.target.value.trim().toLowerCase())}
                    placeholder='Enter your name'
                />
                <button className=' px-3 py-2 bg-blue-500 text-white rounded-r-md' type='submit'>
                    Join
                </button>
            </form>
        </div>
    )
}

export default NameForm