import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from './../config/keys'
import "./../Styles/AuthPage.css";

const SignIn = (props) => {
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
                           props.setisLoggedIn(true);
                           props.setcurrUser(username);
                           navigate('/');
                        }
                        else setFailMsg(msg);
                    }).catch(err => console.log(err));
                }
             }}>SignIn</button>
            <span>
                <p style={{ marginRight: "1rem" }}>Don't have an account?</p>
                <p style={{ cursor: "pointer", color:"#230033" }} onClick={ () => { props.setnavIndex(2) } }><b> SignUp </b></p>
            </span>
        </div>
    )
}

const SignUp = (props) => {
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
                    fetch(`${SERVER_URL}/adduser`, {
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
                    }).then(res=>res.text()).then((msg) => 
                    {
                        if(msg === 'success')
                        {
                            //console.log('Successfully added user');
                            props.setisLoggedIn(true);
                            props.setcurrUser(username);
                            navigate('/');
                        }
                        else setFailMsg(msg);
                    }).catch(err => console.log(err));
                }
             }}>SignUp</button>
            <span>
                <p style={{ marginRight: "1rem" }}>Already have an account?</p>
                <p style={{ cursor: "pointer", color:"#230033" }} onClick={ () => { props.setnavIndex(1) } }><b> SignIn </b></p>
            </span>
        </div>
    )
}

const AuthPage = (props) => {
    const [navIndex, setnavIndex] = useState(1);
    return (
        <div className="authContainer">
            <div className="authNav">
                <button className={ (navIndex === 1) ? "active" : "" }
                    onClick={ () => { setnavIndex(1) }}>SignIn</button>
                <button className={ (navIndex === 2) ? "active" : "" }
                    onClick={ () => { setnavIndex(2) }}>SignUp</button>
            </div>
            { (navIndex === 1) && <SignIn setnavIndex={setnavIndex} setisLoggedIn={props.setisLoggedIn} setcurrUser={props.setcurrUser} />}
            { (navIndex === 2) && <SignUp setnavIndex={setnavIndex} setisLoggedIn={props.setisLoggedIn} setcurrUser={props.setcurrUser} />}
        </div>
    )
}

export default AuthPage
