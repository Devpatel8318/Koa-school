export const transformDoc = (resultDoc) => {
    return {
        _id: resultDoc[0]._id,
        Signed_By: resultDoc[0].Signed_By,
        studentInfo: resultDoc[0].studentInfo,
        Marks: resultDoc[0].Marks.map((mark) => {
            const correspondingSubject = resultDoc[0].subjectInfo.find(
                (subject) => subject._id === mark.sub_code
            )
            return {
                sub_code: mark.sub_code,
                marks: mark.marks,
                name: correspondingSubject.name,
                credit: correspondingSubject.credit,
                maximumMarks: correspondingSubject.maximumMarks,
                description: correspondingSubject.description,
            }
        }),
    }
}
