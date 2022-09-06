import React, { useState } from 'react';
import './auth.css';

const Login = () => {
     
    const [credentials, setCredentials] = useState({
        login: '',
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

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(credentials)
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='group'>
            <label htmlFor='Login'>Identifiant</label>
            <input type="text" name="Login" id="login" value={credentials.login} onChange={onChange}/>
            </div>
            <div className='group'>
                 <label htmlFor='password'>Mot de passe</label>
                 <input type="text" name="password" value={credentials.password} onChange={onChange}/>
            </div>
            <div className='group'>
                  <button>Connexion</button>
            </div>
            
        </form>
    );
};

export default Login;