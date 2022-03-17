import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from './../../config/keys';
import "./Profile.css";
import Spinner from './../../components/Spinner/Spinner';

const Profile = ({ currUser }) => {
    const [userData, setUserData] = useState({});
    const [isFetched, setIsFetched] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        fetch(`${SERVER_URL}/user/getUser`, {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                currUser: currUser
            })
        }).then(res=>res.json()).then(data => {
            setUserData(data)
            setIsFetched(true);
        })
    }

    const logout = async () => {
        const res = await fetch(`${SERVER_URL}/auth/logout`, {
            method: 'POST'
        })
        if(res.status === 200) window.location = '/';
    }

    return (
        <>
        { (!isFetched) && <Spinner /> }
        { 
            isFetched && 
            <div className="container">
                    <h2 className='profileHeading'>
                        Welcome back {currUser}!
                    </h2>
                    <p className='profileParagraph'><b>User Since:</b> {userData.joinDate.substring(0, 10)} </p>
                    <button className='profileBtn' onClick={logout}>Logout</button>
            </div>
        }
        </>
    )
}

export default Profile;
