export const transformDoc = (resultDoc) => {
    return {
        resultId: resultDoc.resultId,
        Signed_By: resultDoc.Signed_By,
        studentInfo: resultDoc.studentInfo,
        Marks: resultDoc.Marks.map((mark) => {
            const correspondingSubject = resultDoc.subjectInfo.find(
                (subject) => subject.subjectCode === mark.subCode
            )
            return {
                subCode: mark.subCode,
                marks: mark.marks,
                name: correspondingSubject.name,
                credit: correspondingSubject.credit,
                maximumMarks: correspondingSubject.maximumMarks,
                description: correspondingSubject.description,
            }
        }),
    }
}
