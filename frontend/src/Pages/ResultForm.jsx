import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TableHeader from '../components/TableHeader'

function ResultForm() {
    const [students, setStudents] = useState([])
    const [subjects, setSubjects] = useState([])
    const [formData, setFormData] = useState({
        Signed_By: null,
        Student: null,
        Marks: []
    })

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/student/list?result=false')
            setStudents(response.data)
        } catch (error) {
            alert('Error')
            console.error('Error fetching students:', error)
        }
    }

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://localhost:8000/subject/list')
            setSubjects(response.data)
        } catch (error) {
            alert('Error')
            console.error('Error fetching subjects:', error)
        }
    }


    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name]: event.target.value
        })
    }

    const handleMarksChange = (subjectCode, maximumMarks, ev) => {
        let value = parseFloat(ev.target.value)
        if (isNaN(value)) {
            value = 0
        }
        if (value > maximumMarks) {
            value = maximumMarks
        }
        const updatedMarks = formData.Marks.map(item => {
            if (item.sub_code === subjectCode) {
                return { ...item, marks: value }
            }
            return item
        })

        const existingIndex = formData.Marks.findIndex(item => item.sub_code === subjectCode)
        if (existingIndex === -1) {
            updatedMarks.push({ sub_code: subjectCode, marks: value })
        }

        setFormData({
            ...formData,
            Marks: updatedMarks
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!formData.Student) {
                return alert("Please Select a Student")
            }
            if (!formData.Signed_By) {
                return alert("Please provide Signed By")
            }
            await axios.post('http://localhost:8000/result/add', formData)
            alert("Result Created")
            setFormData({
                Signed_By: "",
                Student: "",
                Marks: []
            })
            fetchStudents()
        } catch (error) {
            alert("Error while Creating Result")
            console.error('Error:', error)
        }
    }

    const getMarksValue = (subjectCode) => {
        const existingIndex = formData.Marks.findIndex(item => item.sub_code === subjectCode)
        if (existingIndex === -1) {
            return 0
        } else {
            return formData.Marks[existingIndex].marks
        }
    }

    useEffect(() => {
        fetchStudents()
        fetchSubjects()
    }, [])

    return (
        <div className=" mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="w-full max-w-md mx-auto text-center bg-white mt-16 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="firstName">
                        Student
                    </label>
                    <select className='mt-4 text-xl' name="Student" id="Student" onChange={handleChange} value={formData.Student}>
                        <option value="" disabled selected>Select an option</option>
                        {students && students?.map(student => (
                            <option value={student._id}>{student.firstName} {student.lastName}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col w-11/12 mx-auto sm:w-9/12 md:w-8/12 mt-10">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-sm font-light text-center sm:text-lg">
                                    <TableHeader titles={["sub_code", "name", "credits", "obtained marks", "Maximum Marks"]} />
                                    <tbody>
                                        {subjects?.map((subject, index) => (
                                            <tr
                                                key={index}
                                                className="transition duration-100 ease-in-out border-b hover:bg-gray-200">
                                                <td className="px-6 py-4 font-medium whitespace-nowrap">{subject.subjectCode}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{subject.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{subject.credit}</td>
                                                <input value={getMarksValue(subject.subjectCode)} onChange={(ev) => handleMarksChange(subject.subjectCode, subject.maximumMarks, ev)} type='text' min={0} className="px-6 py-4 whitespace-nowrap"></input>
                                                <td className="px-6 py-4 whitespace-nowrap">{subject.maximumMarks}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-stretch mt-16">

                    <div className="self-center flex-1 text-center">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="firstName">
                            Signed By
                        </label>
                        <input type="text" name='Signed_By' className=" shadow-xl bg-gray-100 font-bold p-4 w-48" value={formData.Signed_By} onChange={handleChange}></input>
                    </div>
                </div>
                <div className="flex items-stretch mt-16">
                    <div className="self-center flex-1 text-center">
                        <button id="button" type="submit" className="bg-indigo-600 shadow-xl  hover:bg-indigo-500 text-white font-bold rounded-full p-4 w-48">Submit</button>
                    </div>
                </div>

            </form>
        </div>

    )
}

export default ResultForm
