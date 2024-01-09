export const transformDoc = (resultDoc) => {
    return {
        resultId: resultDoc[0].resultId,
        Signed_By: resultDoc[0].Signed_By,
        studentInfo: resultDoc[0].studentInfo,
        Marks: resultDoc[0].Marks.map((mark) => {
            const correspondingSubject = resultDoc[0].subjectInfo.find(
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
