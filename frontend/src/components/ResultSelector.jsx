import React from 'react'

function ResultSelector({ handleStudentChange, selectedStudent, students }) {
    return (
        <>
            <div className="flex text-2xl flex-col w-11/12 mx-auto sm:w-9/12 md:w-8/12 mt-12">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <label htmlFor="students">Choose Result of student:</label>
                            <br />
                            <select
                                className='mt-4 text-xl'
                                name="students"
                                id="students"
                                onChange={handleStudentChange}
                                value={selectedStudent}>
                                <option value="" disabled>
                                    Select an option
                                </option>
                                {students?.map(student => (
                                    <option key={student.studentId} value={student.studentId}>
                                        {student.firstName} {student.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultSelector