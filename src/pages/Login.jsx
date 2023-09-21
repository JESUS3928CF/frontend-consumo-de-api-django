import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';


const Login = () => {

    /// Información del provider
    let {loginUser}= useContext(AuthContext)

    return (
        <div>
            <form onSubmit={loginUser}>
                <input
                    type='text'
                    name='username'
                    placeholder='Ingrese su nombre de usuario'
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Ingrese su contraseña'
                />
                <input type='submit' />
            </form>
        </div>
    );
};

export default Login;
