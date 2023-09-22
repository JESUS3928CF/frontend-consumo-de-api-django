import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
    let [notes, setNotes] = useState([]);

    let { authTokens, logoutUser, user } = useContext(AuthContext);

    console.log('Tokens', authTokens);

    useEffect(() => {
        getNotes();
    }, []);

    let getNotes = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/notes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + String(authTokens.access),
            },
        });

        let data = await response.json();

        /// Con este if se solucionara este error por que lo a obligar a iniciar sección de nuevo 
        if (response.status === 200) {
            setNotes(data);
        }else if (response.statusText === 'Unauthorized') {
            logoutUser();
        }
    };

    return (
        <div>
            {/* Usando la función para cerrar sección */}

                <p onClick={logoutUser}>Logout</p>

            {user && <p> Hola {user.username} </p>}
            <p> Estas son tus notas </p>

            {/* Listando las notas en la vista*/}
            <ul>
                {notes.map((note) => (
                    <li key={note.id}> {note.body}</li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
