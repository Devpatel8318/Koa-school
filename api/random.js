const pipeline = () => [
    {
        $match: {
            resultID: "6560bc71-a280-454e-a818-d5e776c6d5dd",
        },
    },
    {
        $addFields: {
            convertedStudentId: { $toObjectId: '$Student' },
        },
    },
    {
        $lookup: {
            from: 'students',
            localField: 'convertedStudentId',
            foreignField: '_id',
            as: 'studentInfo',
        },
    },
    {
        $unwind: '$studentInfo',
    },
    {
        $lookup: {
            from: 'subjects',
            localField: 'Marks.sub_code',
            foreignField: '_id',
            as: 'subjectInfo',
        },
    },
    {
        $project: {
            _id: 1,
            Signed_By: 1,
            Marks: 1,
            'studentInfo._id': 1,
            'studentInfo.firstName': 1,
            'studentInfo.lastName': 1,
            'studentInfo.email': 1,
            subjectInfo: 1,
        },
    },
]


const array = [
    {
        $match: argument,
    },
    {
        $lookup: {
            from: 'students',
            localField: 'Student',
            foreignField: 'studentID',
            as: 'studentInfo',
        },
    },
    {
        $unwind: '$studentInfo',
    },
    {
        $lookup: {
            from: 'subjects',
            localField: 'Marks.sub_code',
            foreignField: 'subjectCode',
            as: 'subjectInfo',
        },
    },
    {
        $project: {
            _id: 0,
            resultID:1,
            Signed_By: 1,
            Marks: 1,
            'studentInfo._id': 1,
            'studentInfo.firstName': 1,
            'studentInfo.lastName': 1,
            'studentInfo.email': 1,
            subjectInfo: 1,
        },
    },
]

    {
        $project: {
            _id: 1,
            Signed_By: 1,
            Marks: 1,
            'studentInfo._id': 1,
            'studentInfo.firstName': 1,
            'studentInfo.lastName': 1,
            'studentInfo.email': 1,
            subjectInfo: 1,
        },
    },
]
