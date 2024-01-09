// assign
// entries
// formentries

//assign
const obj = {
    name: 'Dev',
    age: 21,
    hobbies: ['travelling', 'swimming', 'coding'],
}
const extraData = {
    address: {
        street: 'gandhinagar Link Road',
        city: 'Mehsana',
        state: 'Gujarat',
        pincode: 384001,
    },
}
const newData = Object.assign(obj, extraData)
// console.log(newData)

//freeze
const Constants = {
    pie: 3.14,
    g: 9.8,
}
Object.freeze(Constants)
Constants.pie = 3.16
// console.log(Constants);

// console.log(Object.getOwnPropertyDescriptor(Constants, 'pie'))
// console.log(Object.getOwnPropertyDescriptors(Constants, 'pie'))
// console.log(Object.getOwnPropertyNames(Constants))
// console.log(Object.getOwnPropertySymbols(Constants))

// console.log(Object.values(obj))
// console.log(Object.keys(obj))

const entries = [
    [1, 'one'],
    [2, 'two'],
]
console.log(Object.fromEntries(entries))
console.log(Object.entries(obj));