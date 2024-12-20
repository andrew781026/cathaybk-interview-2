/**
 There is an array, each item has such format:
 {firstName: 'xxx', lastName: 'xxx', customerID: 'xxx', note: 'xxx', profession: ‘xxx’}
 lastName, note can be empty, customerID can only be a set of digital numbers.
 profession can only have ‘student’, ‘freelancer’, ‘productOwner’, ‘engineer’ or
 ‘systemAnalytics’.
 **/

const testArray = [
    {
        firstName: 'John',
        lastName: 'Doe',
        customerID: '123456789',
        note: 'This is a note',
        profession: 'student',
    },
    {
        firstName: 'Tim',
        customerID: '123456725',
        note: 'This is a note',
        profession: 'productOwner',
    },
    {
        firstName: 'Jane',
        profession: 'freelancer',
    },
]

/**
 Q1. Please follow the principle (‘firstName’ + ‘lastName’ + ‘customerID’) to sort this
 array and print it out.
 **/
function sortUserName(users) {
    const arr = users
        .map(user => ({
            ...user,
            userName: `${user.firstName || ''} ${user.lastName || ''} ${user.customerID || ''}`
        }))
        .sort((a, b) => a.userName.localeCompare(b.userName));

    console.log(arr);
}

/**
 Q2. Please sort by ‘profession’ to follow the principle.
 (‘systemAnalytics’ > ‘engineer’ > ‘productOwner’ > ‘freelancer’ > ‘student’’)
 **/
function sortByType(users) {

    const professionLevel = {
        student: 1,
        freelancer: 2,
        productOwner: 3,
        engineer: 4,
        systemAnalytics: 5,
    }

    // -1 : a 比 b 小 ( a 向前移動 )
    //  0 : 相同
    //  1 : a 比 b 大 ( a 向後移動 )
    const arr = users.sort((a, b) => professionLevel[a.profession] - professionLevel[b.profession]);

    // 將分數較大的往後放~~
    console.log(arr);
}

sortUserName(testArray);
console.log('--------------');
sortByType(testArray);
