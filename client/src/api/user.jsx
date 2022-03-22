
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
        if(res.status === 200) return data;
        else {
            if(data.hasOwnProperty('error')) console.log('Request failed with error : '+data.error);
            return {};
        }
    } 
    catch (error) { console.log('Error while getting user data : ' + error) }
}