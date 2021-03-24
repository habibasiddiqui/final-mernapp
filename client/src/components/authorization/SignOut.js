import React, { useEffect } from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


function SignOut() {
    
    const history = useHistory();
    // const { currentUser, setCurrentUser } = useAuth();
    const { role, setRole, online, setOnline } = useAuth();

    useEffect(() => {
        // axios.post('http://localhost:4000/api/users/logout')
        axios.delete('http://localhost:4000/api/users/logout')
        .then(res=>{
                console.log('logout successful');
                localStorage.removeItem('userData');
                // localStorage.clear();
                setRole('');
                setOnline(false);
                history.push('/signin');
            }
        )
        .catch(err=>console.log('....',err))
    }, [])



    return (
        <div>
            
        </div>
    )
}

export default SignOut;