import {useState} from 'react'
import SignUp from '../../components/AuthComp/SignUp';
import SignIn from '../../components/AuthComp/SignIn';
import "./AuthPage.css";

const AuthPage = ({ setisLoggedIn, setcurrUser }) => {
    const [navIndex, setnavIndex] = useState(1);
    return (
        <div className="container">
            <div className="authNav">
                <button className={ (navIndex === 1) ? "active" : "" }
                    onClick={ () => { setnavIndex(1) }}>SignIn</button>
                <button className={ (navIndex === 2) ? "active" : "" }
                    onClick={ () => { setnavIndex(2) }}>SignUp</button>
            </div>
            { (navIndex === 1) && <SignIn setnavIndex={setnavIndex} />}
            { (navIndex === 2) && <SignUp setnavIndex={setnavIndex} setisLoggedIn={setisLoggedIn} setcurrUser={setcurrUser} />}
        </div>
    )
}

export default AuthPage
