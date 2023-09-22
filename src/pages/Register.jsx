import { useState } from 'react';

const Register = () => {
    /// Creemos un estado para cada input con el fin de tener un contexto seguro para cada campo
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('');

    //todo: Función para validar el formulario

    const handleValidateRegister = (e) => {
        e.preventDefault();

        if (username === '') {
            alert('El nombre es requerido');
            return;
        } else if (password === '') {
            alert('La contraseña es requerida');
            return;
        } else if (password.length < 6) {
            alert(
                'Por seguridad la contraseña debe de tener más de 5 caracteres'
            );
            return;
        } else if (password !== repeatPassword) {
            alert('La contraseña no es igual a la repetida');
            return;
        }

        console.log(
            'Inviar info al back y ver que el usuario no este repetido'
        );
        registerUser();
    };

    const registerUser = async () => {
        try {
            const response = await fetch(
                'http://127.0.0.1:8000/api/register/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email,
                    }),
                }
            );
            console.log('Esto es lo que se responde ', response);

            const data = await response.json();
            console.log('data', data.statusText);

            if (response.status === 201) {
                console.log('Usuario registrado exitosamente:', data);
                alert("Felicidades te has registrado exitosamente en nuestra aplicación web");
            } else if (response.status === 400) {
                // El usuario ya existe, se muestra el mensaje de error
                const errorMessage = data.username[0]; // Acceder al mensaje de error
                console.log('Error al registrar usuario:', errorMessage);
                alert(`Error al registrar usuario: ${errorMessage}`);
            } else {
                alert('Ocurrió un error al momento de registrar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error grave al momento de registrar el usuario');
        }
    };

    return (
        <div>
            <h1> Regístrate Aquí </h1>

            <form onSubmit={handleValidateRegister}>
                <div>
                    <label htmlFor='username'> Nombre de usuario</label>
                    <input
                        type='text'
                        placeholder='Ingresa tu nombre de usuario'
                        id='username'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='email'> Email</label>
                    <input
                        type='email'
                        placeholder='Ingresa tu correo electrónico'
                        name='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='password'> Contraseña</label>
                    <input
                        type='password'
                        placeholder='Ingresa contraseña'
                        name='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='repeatPassword'> Repetir contraseña </label>
                    <input
                        type='password'
                        placeholder='Repite la contraseña'
                        name='repeatPassword'
                        id='repeatPassword'
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </div>

                <div>
                    <input type='submit' value='registrarme' />
                </div>
            </form>
        </div>
    );
};

export default Register;
