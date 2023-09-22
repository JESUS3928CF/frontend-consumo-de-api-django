import { Link } from 'react-router-dom'

const Header = () => {


  return (
      <div>
          <Link to='/'> Home </Link>
          <span> | </span>

          <Link to='/register'>Registrarse</Link>


      </div>
  );
}

export default Header
