import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
// / PROVIDER


const MyRoutes = () => {
    // / Verificar
    const authenticated = false;

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                
                    {/* Ruta de inicio de sesión */}
                    <Route path='/login' element={<Login />} />

                    {/* Ruta privada */}
                    <Route
                        path='/'
                        element={
                            authenticated ? (
                                <HomePage />
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;
