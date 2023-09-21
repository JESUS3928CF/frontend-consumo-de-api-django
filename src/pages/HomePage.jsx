import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
    /// Este es un buen logar para consultar las notas dado a que solo las necesitamos aquí

    let [notes, setNotes] = useState([]);

    let { authTokens } = useContext(AuthContext);

    console.log("Tokens" ,authTokens)

    useEffect(() => {
        /// Ejecutando el método para obtener las notas
        getNotes();
    }, []);

    /// Haciendo la solicitud al back para obtener las notas del usuario actual
    let getNotes = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/notes/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + String(authTokens.access),
            },
        });

        let data = await response.json();
        setNotes(data);
    };

    return (
        <div>
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
