import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../../api/user';
import "./Profile.css";
import Spinner from './../../components/Spinner/Spinner';
import { authLogout } from '../../api/auth';

const Profile = ({ currUser }) => {
    const [userData, setUserData] = useState({});
    const [isFetched, setIsFetched] = useState(false);
    let navigate = useNavigate();
    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        const data = await getUserData({
            currUser: currUser
        });
        setUserData(data);
        setIsFetched(true);
    }

    const logout = async () => {
        const {isLoggedOut} = await authLogout();
        if(isLoggedOut) window.location = '/';
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
