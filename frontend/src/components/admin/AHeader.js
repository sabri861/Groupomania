
import React from 'react';
// import { AccountService } from '../../_services/account.service'
import { useNavigate } from 'react-router-dom';


const AHeader = ({accountService}) => {
    let navigate = useNavigate()
    const logout = () =>{
       accountService.logout()
       navigate('/')
    }
    return (
        <div className='AHeader'>
            header admin
            <button onClick={logout}>deconnexion</button>
        </div>
    );
};

export default AHeader;