
const BASE_URL = '/api';

export const checkLoggedIn = async () => {
    try 
    {
        const res = await fetch(`${BASE_URL}/auth/checkLogged`);
        const data = await res.json();
        if(data.user !== undefined) return ({ isLoggedIn: true, username: data.user.username });
        else return ({ isLoggedIn: false, username: '' });
    } 
    catch (error) { console.log('Error while checking logged in or not : ' + error) }
}

export const authLogIn = async (credentials) => {
    try 
    {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        if(res.status === 200) return ({ isSuccess: true, error: null });
        else
        {
            const data = await res.json();
            return ({ isSuccess: false, error: data.message });
        }
    } catch (error) { console.log('Error in login : ' + error) }
}

export const authSignUp = async (newUser) => {
    try
    {
        const res = await fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        if(res.status === 200) return ({ isSuccess: true, error: null });
        else 
        {
            const data = await res.json();
            if(data.hasOwnProperty('errors'))
            {
                for(let error in data.errors.errors)
                {
                    return ({ isSuccess: false, error: data.errors.errors[error] });
                    // returns only first key in the JSON
                }
            }
            if(data.hasOwnProperty('message')) return ({ isSuccess: false, error: data.message });
        }
    }
    catch (error) { console.log('Error in signup : ' + error) }
}

export const authLogout = async () => {
    try 
    {
        const res = await fetch(`/api/auth/logout`, {
            method: 'POST'
        })
        if(res.status === 200) return ({ isLoggedOut: true });
        else return ({ isLoggedOut: false });
    } 
    catch (error) { console.log('Error while logging out : ' + error) }
}