import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from './../../config/keys'
import './AuthComp.css'

const SignUp = ({ setisLoggedIn, setcurrUser, setnavIndex }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [failmsg, setFailMsg] = useState('');
    let navigate = useNavigate();
    return (
        <div className="authcomp">
            <label htmlFor="fname_signup">First Name</label>
            <input type="text" id="fname_signup" onChange={(e) => { setFirstname(e.target.value) }} required/>
            <label htmlFor="lname_signup">Last Name</label>
            <input type="text" id="lname_signup" onChange={(e) => { setLastname(e.target.value) }} required/>
            <label htmlFor="username_signup">Username</label>
            <input type="text" id="username_signup" onChange={(e) => { setUsername(e.target.value) }} required/>
            <label htmlFor="phone_signup">Phone Number</label>
            <input type="phone" id="phone_signup" onChange={(e) => { setPhone(e.target.value) }} required/>
            <label htmlFor="email_signup">Email</label>
            <input type="email" id="email_signup" onChange={(e) => { setEmail(e.target.value) }} required/>
            <label htmlFor="password_signup">Password</label>
            <input type="password" id="password_signup" onChange={(e) => { setPassword(e.target.value) }} required/>
            <label htmlFor="cpassword_signup">Confirm Password</label>
            <input type="password" id="cpassword_signup" onChange={(e) => { setCPassword(e.target.value) }} required/>
            {
                (failmsg !== '') && <p style={{ color: 'red', fontSize: '1.5rem', marginBottom: '1rem' }}>{failmsg}</p>
            }
            <button className="authbtn" onClick={ async () => { 
                if((firstname==='')||(lastname==='')||(username==='')||(phone==='')||(email==='')||(password==='')||(cpassword===''))
                setFailMsg('Please fill all the fields');
                else if ( password !== cpassword) setFailMsg('Password and Confirm Password donot match');
                else
                {
                    try {
                        const res = await fetch(`/auth/signup`, {
                            method: 'post',
                            body: JSON.stringify({
                                firstname: firstname,
                                lastname: lastname,
                                username: username,
                                phone: phone,
                                email: email,
                                password: password
                            }),
                            headers: {
                                'Content-Type' : 'application/json'
                            }
                        })
                        if(res.status === 200) window.location = '/';
                        else
                        {
                            let data = await res.json();
                            // console.log(data);
                            if(data.hasOwnProperty('errors'))
                            {
                                for(let error in data.errors.errors)
                                {
                                    setFailMsg(data.errors.errors[error]);
                                    break;
                                }
                            }
                            else if(data.hasOwnProperty('message')) setFailMsg(data.message);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                    // then(res=>res.json()).then(data => 
                    // {
                    //     if(data.hasOwnProperty('errors'))
                    //     {
                    //         for(let error in data.errors.errors)
                    //         {
                    //             setFailMsg(data.errors.errors[error]);
                    //             break;
                    //         }
                    //     }
                    //     else if(data.hasOwnProperty('message')) setFailMsg(data.message);
                    //     else 
                    //     {
                    //         setisLoggedIn(true);
                    //         setcurrUser(data.username);
                    //         navigate('/');
                    //     }
                    // }).catch(err => console.log(err));
                }
             }}>SignUp</button>
            <span>
                <p style={{ marginRight: "1rem" }}>Already have an account?</p>
                <p style={{ cursor: "pointer", color:"#230033" }} onClick={ () => { setnavIndex(1) } }><b> SignIn </b></p>
            </span>
        </div>
    )
}

export default SignUp;