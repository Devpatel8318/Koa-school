import React from 'react'
import Results from './Pages/Results'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ResultForm from './Pages/ResultForm'
import Chat from './Pages/Chat'
import AllowedUsers from './Pages/AllowedUsers'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true;
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Results />} />
                <Route path="/resultform" element={<ResultForm />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/allowedUsers" element={<AllowedUsers />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
