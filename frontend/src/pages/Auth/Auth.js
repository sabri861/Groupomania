import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Auth = ({accountService}) => {
    const [isLogin , setIsLogin] = useState(true)
    return (
        <div style={{backgroundColor:'red'}}>
            <button onClick={()=>{setIsLogin(true)}}>se connecter</button>
            <button onClick={()=>{setIsLogin(false)}}>s'inscrire</button>
            {/*( ? = if et le : = else ) /// Si le isLogin est a true on affiche le Login si non on affiche le Signup  ( ? = if et le : = else )*/}
            { isLogin == true ? <> <Login accountService={accountService}/></> : <> <Signup accountService={accountService}/></> }
        </div>
    );
};

export default Auth;
