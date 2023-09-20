import './App.css';
import MyRoutes from './routers/routes';

import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <div>
            {/* Habilitando el provider en toda mi app */}
            <AuthProvider>
                <MyRoutes />
            </AuthProvider>
        </div>
    );
}

export default App;
