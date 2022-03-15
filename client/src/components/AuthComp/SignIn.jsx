import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from './../../config/keys'
import './AuthComp.css'

const SignIn = ({ setisLoggedIn, setcurrUser, setnavIndex }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failmsg, setFailMsg] = useState('');
    let navigate = useNavigate();
    return (
        <div className="authcomp">
            {
                (failmsg !== '') && <p style={{ color: 'red', fontSize: '1.5rem', marginBottom: '1rem' }}>{failmsg}</p>
            }
            <label htmlFor="username_signin">Username</label>
            <input type="text" id="username_signin" onChange={(e) => { setUsername(e.target.value) }} required />
            <label htmlFor="password_signin">Password</label>
            <input type="password" id="password_signin" onChange={(e) => { setPassword(e.target.value) }} required />
            <button className="authbtn" onClick={ async () => { 
                if((username==='')||(password===''))
                setFailMsg('Please fill all the fields');
                else
                {
                    fetch(`${SERVER_URL}/validate`, {
                        method: 'post',
                        body: JSON.stringify({
                            username: username,
                            password: password
                        }),
                        headers: {
                            'Content-Type' : 'application/json'
                        }
                    }).then(res=>res.text()).then(msg=>{
                        //console.log(msg);
                        if(msg === 'success')
                        {
                           setisLoggedIn(true);
                           setcurrUser(username);
                           navigate('/');
                        }
                        else setFailMsg(msg);
                    }).catch(err => console.log(err));
                }
             }}>SignIn</button>
            <span>
                <p style={{ marginRight: "1rem" }}>Don't have an account?</p>
                <p style={{ cursor: "pointer", color:"#230033" }} onClick={ () => { setnavIndex(2) } }><b> SignUp </b></p>
            </span>
        </div>
    )
}

export default SignIn