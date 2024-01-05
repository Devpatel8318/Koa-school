import React from 'react'

const AdminLoginPasswordForm = ({ handleSubmit, passwordRef }) => {
    return (
        <div className='w-full h-screen bg-blue-100 flex items-center justify-center'>
            <div className='border-2 bg-white w-4/12 h-1/5 px-5 py-2 flex flex-col justify-between rounded-md'>
                <div className='py-2  text-blue-500 text-center text-5xl'>Enter Password</div>
                <form className='flex' onSubmit={handleSubmit}>
                    <input
                        type='password'
                        ref={passwordRef}
                        className='border rounded-l-md p-3 mr-2 grow'
                        placeholder='Enter password'
                    />
                    <button type='submit' className='bg-blue-500 text-white px-4 rounded-r-md'>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLoginPasswordForm
