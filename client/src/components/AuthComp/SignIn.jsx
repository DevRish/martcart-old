import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from './../../config/keys'
import './AuthComp.css'

const SignIn = ({ setnavIndex }) => {
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
                if((username==='')||(password==='')) setFailMsg('Please fill all the fields');
                else
                {
                    try {
                        let res = await fetch(`${SERVER_URL}/auth/login`, {
                            method: 'post',
                            body: JSON.stringify({
                                username: username,
                                password: password
                            }),
                            headers: {
                                'Content-Type' : 'application/json'
                            }
                        }) 
                        // console.log(res);
                        if(res.status === 200) window.location = '/'; // I need to reload to re-render everything, navigate won't re-render
                        else
                        {
                            let data = await res.json();
                            // console.log(data);
                            setFailMsg(data.message);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                    // then(res=>res.json()).then(data => {
                    //     if(data.hasOwnProperty('message'))
                    //     {
                    //         setFailMsg(data.message);
                    //     }
                    //     else 
                    //     {
                    //         setisLoggedIn(true);
                    //         setcurrUser(data.username);
                    //         navigate('/');
                    //     }
                    // }).catch(err => console.log(err));
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