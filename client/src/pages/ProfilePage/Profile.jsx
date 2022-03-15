import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from './../../config/keys';
import "./Profile.css";
import Spinner from './../../components/Spinner/Spinner';

const Profile = (props) => {
    const [userData, setUserData] = useState({});
    const [isFetched, setIsFetched] = useState(false);
    let navigate = useNavigate();
    const logout = () => {
        props.setisLoggedIn(false);
        props.setcurrUser('');
        navigate('/');
    }
    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        fetch(`${SERVER_URL}/getUserData`, {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                currUser: props.currUser
            })
        }).then(res=>res.json()).then(data => {
            setUserData(data)
            setIsFetched(true);
        })
    }
    return (
        <>
        { (!isFetched) && <Spinner /> }
        { 
            isFetched && 
            <div className="container">
                    <h2 className='profileHeading'>
                        Welcome back {props.currUser}!
                    </h2>
                    <p className='profileParagraph'><b>User Since:</b> {userData.joinDate.substring(0, 10)} </p>
                    <button className='profileBtn' onClick={logout}>Logout</button>
            </div>
        }
        </>
    )
}

export default Profile;
