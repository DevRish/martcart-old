const userRules = {
    firstname: 'required|min:3',
    lastname: 'required|min:3',
    username: 'required|min:3',
    phone: 'required|digits:10',
    email: 'required|email',
    password: 'required|min:6'
}

const userErrors = {
    required: 'Please enter required fields',
    email: 'Invalid email address',
    "digits.phone": 'Phone number must be 10 digit long',
    "min.firstname": 'Firstname must be atleast 3 characters long',
    "min.lastname": 'Lastname must be atleast 3 characters long',
    "min.username": 'Username must be atleast 3 characters long',
    "min.password": 'Password must be atleast 6 characters long'
}

module.exports = { userRules, userErrors }