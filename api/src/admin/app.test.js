import axios from 'axios'
let studentId

beforeAll(async () => {
    const { data } = await axios.get('http://localhost:8000/student/list')
    expect(data).toBeInstanceOf(Object)
    expect(data.success).toBe(true)
    expect(data.data).toBeInstanceOf(Array)
    expect(data.message).toEqual(expect.any(String))
    if (data.data.length > 0) {
        studentId = data.data[0].studentId
    }

    test('Students All', async () => {
        const { data } = await axios.get('http://localhost:8000/result/list')
        expect(data).toBeInstanceOf(Object)
        expect(data.success).toBe(true)
        expect(data.data).toBeInstanceOf(Array)
        expect(data.message).toEqual(expect.any(String))
    })
})

test('Student One', async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))

    if (!studentId) {
        test.skip('Student One - Skipped because studentId is not available', async () => {})
    } else {
        const { data } = await axios.get(
            `http://localhost:8000/student/view/${studentId}`
        )
        expect(data).toBeInstanceOf(Object)
        expect(data.success).toBe(true)
        expect(data.data).toBeInstanceOf(Object)
        expect(data.message).toEqual(expect.any(String))
    }
})

test('Results All', async () => {
    const { data } = await axios.get('http://localhost:8000/result/list')
    expect(data).toBeInstanceOf(Object)
    expect(data.success).toBe(true)
    expect(data.data).toBeInstanceOf(Array)
    expect(data.message).toEqual(expect.any(String))
})

test('Subject All', async () => {
    const { data } = await axios.get('http://localhost:8000/subject/list')
    expect(data).toBeInstanceOf(Object)
    expect(data.success).toBe(true)
    expect(data.data).toBeInstanceOf(Array)
    expect(data.message).toEqual(expect.any(String))
})
