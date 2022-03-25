import {useState, useEffect} from 'react'
import SignUp from '../../components/AuthComp/SignUp';
import SignIn from '../../components/AuthComp/SignIn';
import AuthImg from './../../assets/AuthImages/authImg.svg';
import "./AuthPage.css";

const AuthPage = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const [navIndex, setnavIndex] = useState(1);
    return (
        <div className="container auth">
            <div className="authImg">
                <img src={AuthImg} alt="Secure Authentication" />
            </div>
            <div className="authForm">
                { (navIndex === 1) && <SignIn setnavIndex={setnavIndex} />}
                { (navIndex === 2) && <SignUp setnavIndex={setnavIndex} />}
            </div>
        </div>
    )
}

export default AuthPage
