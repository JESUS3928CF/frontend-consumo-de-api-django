import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import PrivateRoute from '../utils/PrivateRoute';
import { AuthProvider } from '../context/AuthContext';
import Register from '../pages/Register';

const MyRoutes = () => {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Header />
                <Routes>
                    {/* Ruta de inicio de sesión */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register/>}></Route>

                    {/* Ruta privada de esta forma lo usamos*/}

                    <Route path='/' element={<PrivateRoute />}>
                        <Route index element={<HomePage />}></Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default MyRoutes;
