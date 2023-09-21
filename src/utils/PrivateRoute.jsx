import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const PrivateRoute = () => {

    /// 3: Si si hay un user continuar con el funcionamiento normal de este componente ose que se podrá acceder a las rutas protegidas
    let {user} = useContext(AuthContext)

     if (!user) {
         return <Navigate to='/login' />;
     }
  return (
    <> 
         <Outlet/>
    </>
  )
}

export default PrivateRoute
