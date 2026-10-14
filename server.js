
const express = require('express');

const app = express();
const PORT = 3000;

// Permite recibir datos en formato JSON.
app.use(express.json());

// Almacenamiento temporal de usuarios para esta práctica.
const usuarios = [];

// Endpoint para registrar un usuario.
app.post('/api/registro', (req, res) => {
    const { usuario, contraseña } = req.body;

    // Verifica que se hayan enviado los datos necesarios.
    if (!usuario || !contraseña) {
        return res.status(400).json({
            mensaje: 'Debe ingresar usuario y contraseña.'
        });
    }

    // Evita registrar dos veces el mismo usuario.
    const existe = usuarios.find(u => u.usuario === usuario);

    if (existe) {
        return res.status(409).json({
            mensaje: 'El usuario ya existe.'
        });
    }

    // Guarda el usuario para las pruebas locales.
    usuarios.push({ usuario, contraseña });

    return res.status(201).json({
        mensaje: 'Usuario registrado correctamente.'
    });
});

// Endpoint para iniciar sesión.
app.post('/api/login', (req, res) => {
    const { usuario, contraseña } = req.body;

    // Busca al usuario y comprueba su contraseña.
    const encontrado = usuarios.find(
        u => u.usuario === usuario && u.contraseña === contraseña
    );

    if (!encontrado) {
        return res.status(401).json({
            mensaje: 'Error en la autenticación.'
        });
    }

    return res.status(200).json({
        mensaje: 'Autenticación satisfactoria.'
    });
});

// Inicia el servidor para recibir solicitudes.
app.listen(PORT, () => {
    console.log(`API ejecutándose en http://localhost:${PORT}`);
});
