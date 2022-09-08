import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Login = ({accountService}) => {
    
    let navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })


    const onChange = (e) => {
       console.log(e.target.name)
       console.log(e.target.value)
       setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(credentials)
        await accountService.login(credentials);
        navigate('/admin')
    }

    return (
        <form onSubmit={onSubmit} style={{backgroundColor:'blue'}}>
            <div className='group'>
            <label htmlFor='email'>email</label>
            <input type="text" name="email" id="email" value={credentials.email} onChange={onChange}/>
            </div>
            <div className='group'>
                 <label htmlFor='password'>Mot de passe</label>
                 <input type="password" name="password" value={credentials.password} onChange={onChange}/>
            </div>
            <div className='group'>
                  <button>Connexion</button>
            </div>
            
        </form>
    );
};

export default Login;