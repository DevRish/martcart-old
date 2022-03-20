import {useState} from 'react'
import { authLogIn } from '../../api/auth';
import './AuthComp.css'

const SignIn = ({ setnavIndex }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failmsg, setFailMsg] = useState('');

    const handleLogIn = async () => { 
       if((username==='')||(password==='')) setFailMsg('Please fill all the fields');
       else
       {
            const credentials = {
                username: username,
                password: password
            }
            const { isSuccess, error } = await authLogIn(credentials);
            if(isSuccess) window.location = '/'; // need to reload to re render everything, now that I have the cookie
            else setFailMsg(error);
       }
    }

    return (
        <div className="authcomp">
            <h1 className='authTitle'>Welcome back!</h1>
            <label htmlFor="username_signin">Username</label>
            <input type="text" id="username_signin" onChange={(e) => { setUsername(e.target.value) }} required />
            <label htmlFor="password_signin">Password</label>
            <input type="password" id="password_signin" onChange={(e) => { setPassword(e.target.value) }} required />
            {
                (failmsg !== '') && <p style={{ color: 'red', fontSize: '1.5rem', marginBottom: '1rem' }}>{failmsg}</p>
            }
            <button className="authbtn" onClick={ handleLogIn }>LogIn</button>
            <div className='authToggle'>
                <p style={{ marginRight: "1rem" }}>Don't have an account?</p>
                <p style={{ cursor: "pointer", color:"#230033" }} onClick={ () => { setnavIndex(2) } }><b> SignUp </b></p>
            </div>
        </div>
    )
}

export default SignIn