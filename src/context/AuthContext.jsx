import { createContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens'))
            : null
    );

    let [user, setUser] = useState(() =>
        localStorage.getItem('authTokens')
            ? jwt_decode(localStorage.getItem('authTokens'))
            : null
    );


    /// Estado para actualizar el token cada cierto tiempo y pueda ser valido en el back 
    let [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('data', data);

            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwt_decode(data.access));

                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/');
            } else {
                alert('Ocurrió un error al intentar ingresar');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al intentar ingresar');
        }
    };

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');

        
        navigate('/login');
    };

    //! Función para actualizar el token
    let updateToken = async () => {

        console.log('Updating token');
        try {
            const response = await fetch(
                'http://127.0.0.1:8000/api/token/refresh/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        /// Si no existe el token destruir la sección 
                        refresh: authTokens?.refresh,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
            } else {
                /// Destruir la sección actual
                logoutUser();
            }
        } catch (error) {
            console.error('Error:', error);
            // alert('Ocurrió un error al intentar actualizar el token');
        }

        /// 2: Esto es para que no carge infinitamente
        if(loading){
            setLoading(false)
        }
    };

    let contextData = {
        user,
        loginUser,
        logoutUser,
        authTokens,
    };

    //* Para poder detectar cuando actualizar el token fresh
    useEffect(() => {

        /// 1: si entramos y nos encontramos que esta cargando es true update el token
        if(loading){
            updateToken();
        }

        let fourMinutes = 1000 * 60 * 4;

        let interval = setInterval( () => {
            if(authTokens){
                updateToken();
            }
        }, fourMinutes)

        return () => clearInterval(interval);

    }, [authTokens, loading]); //- dependencias para actualizar el token

    /// 4: Si aun no se carga la actualización del token no renderizar nada en la vista es decir no hacer disponible la info del provider
    return (
        <AuthContext.Provider value={contextData}>
            {loading? null : children}
        </AuthContext.Provider>
    );
};
