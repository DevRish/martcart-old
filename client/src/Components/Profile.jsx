import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../config/keys';
import "./../Styles/Cart.css";
import Spinner from './Spinner';

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
            <div className="cartContainer">
                    <h2 style={{ textAlign: 'center', fontSize: '3rem', paddingTop: '2rem', margin: "2rem 0" }}>
                        Welcome back {props.currUser}!
                    </h2>
                    { console.log('Type of joinDate is: ' + (typeof userData.joinDate) ) }
                    <p style={{ fontSize: '2rem', textAlign: "center" }}><b>User Since:</b> {userData.joinDate.substring(0, 10)} </p>
                    <button style={{ 
                        display: "block",
                        margin: "auto",
                        border: "none",
                        backgroundColor: "#230033",
                        borderRadius: "10px",
                        padding: "1rem",
                        fontSize: "2rem",
                        color: "white",
                        cursor: "pointer",
                        marginTop: "2rem"
                    }} onClick={logout}>Logout</button>
            </div>
        }
        </>
    )
}

export default Profile;
