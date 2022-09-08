import axios from 'axios'
import React, { useState } from 'react';

const Signup = () => {
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

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(credentials)
        axios.post("http://localhost:4200/api/auth/signup", credentials)
        .then((res)=>{
            console.log(res)
        })
    }
    return (
        <form onSubmit={onSubmit}style={{backgroundColor:'yellow'}}>
            <div className='group'>
            <label htmlFor='email'>Email</label>
            <input type="text" name="email" id="email" value={credentials.email} onChange={onChange}/>
            </div>
            <div className='group'>
                 <label htmlFor='password'>Mot de passe</label>
                 <input type="text" name="password" value={credentials.password} onChange={onChange}/>
            </div>
            <div className='group'>
                  <button>S'inscrire</button>
            </div>
            
        </form>
    );
};

export default Signup;