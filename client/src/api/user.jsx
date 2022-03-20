
const BASE_URL = '/api';

export const getUserData = async (userData) => {
    try 
    {
        const res = await fetch(`${BASE_URL}/user/getUser`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        return data;
    } 
    catch (error) { console.log('Error while getting user data : ' + error) }
}