import React from 'react';

const Login = () => {
    return (
        <div>
            <form>
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
