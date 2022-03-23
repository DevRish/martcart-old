import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import { getUserData } from '../../api/user';
import "./Profile.css";
import Spinner from './../../components/Spinner/Spinner';
import { authLogout, checkLoggedIn } from '../../api/auth';
import { queryClient } from '../../config/queryClient';

const Profile = () => {
    let navigate = useNavigate();

    const userQuery = useQuery('user', async () => {
        const { isLoggedIn, username } = await checkLoggedIn();
        if(isLoggedIn)
        {
            const userdata = await getUserData({ currUser: username });
            return userdata;
        }
        else return {};
    }, { initialData: {} })

    const logout = async () => {
        const {isLoggedOut} = await authLogout();
        if(isLoggedOut) 
        {
            queryClient.invalidateQueries('auth', 'cart', 'order', 'user');
            navigate('/');
        }
    }

    return (
        <>
        { (!userQuery.isFetched) && <Spinner /> }
        { 
            ( userQuery.isFetched && (userQuery.data !== {}) ) &&
            <div className="container">
                    {/* {console.log(userQuery)} */}
                    <h2 className='profileHeading'>
                        Welcome back {userQuery.data.firstname}!
                    </h2>
                    <p className='profileParagraph'><b>User Since:</b> {userQuery.data.joinDate.substring(0, 10)} </p>
                    <button className='profileBtn' onClick={logout}>Logout</button>
            </div>
        }
        </>
    )
}

export default Profile;
