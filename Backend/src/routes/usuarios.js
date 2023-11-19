const { Router } = require('express');
const router = Router();
const mysql = require('mysql');
// Conexión para MySQL
const connection = mysql.createPool({
    connectionLimit: 500,
    host: 'localhost',
    user: 'root',
    password: 'root', //el password de ingreso a mysql
    database: 'parcial3',
    port: 3306
});

connection.on('error', function (err) {
    console.log("[mysql error]", err);
});
//Metodo GET para TODOS LOS USUARIOS
router.get('/usuarios', (req, res) => {
    var json1 = {}; 
    var arreglo = []; 
    connection.getConnection(function (error, tempConn) { 
        if (error) {
            throw error; 
        }
        else {
            console.log('Conexion correcta.');
            tempConn.query('SELECT * FROM usuarios', function (error, result) {
                var resultado = result; 
                if (error) {
                    throw error;
                } else {
                    tempConn.release(); 
                    for (i = 0; i < resultado.length; i++) { 
                        json1 = {
                            "id": resultado[i].id,
                            "usuario": resultado[i].usuario,
                            "contraseña": resultado[i].contraseña,
                            "nombre": resultado[i].nombre,
                            "tipo": resultado[i].tipo,
                            "nodo":resultado[i].nodo
                        };
                        arreglo.push(json1); 
                    }
                    res.json(arreglo); 
                }
            });
        }
    });
});
//Metodo POST para CREAR UN USUARIO
router.post('/usuarios', (req, res) => {
    console.log(req.body); 
    json1 = req.body; 
    connection.getConnection(function (error, tempConn) { 
        if (error) {
            throw error; 
        }
        else {
            console.log('Conexion correcta.');
            tempConn.query('INSERT INTO usuarios VALUES(null,?,?,?,?,?)',
                [json1.usuario, json1.contraseña, json1.nombre, json1.tipo, json1.nodo], function
                (error, result) { 
                if (error) {
                    res.status(418).send("error al ejecutar el query");
                } else {
                    tempConn.release();
                    res.status(201).send("Datos almacenados");
                }
            });
        }
    });
});
//Metodo GET para VALIDAR UN USUARIO dado el parametro user, password
router.get('/usuarios/:user/:password', (req, res) => {
    var json1 = {}; 
    var userBuscado = req.params.user
    var passBuscado = req.params.password
    connection.getConnection(function (error, tempConn) { 
        if (error) {
            throw error; 
        }
        else {
            console.log('Conexion correcta.');
            tempConn.query('SELECT * FROM usuarios WHERE usuario = ?', [userBuscado], function (error, result) {
                var resultado = result; 
                if (error) {
                    res.send("Error al ejecutar el query");
                } else {
                    if (resultado.length === 0) {
                        res.status(401).send("Login wasn't made correctly");
                    }
                    else {
                        tempConn.release();
                        json1 = {
                            "id": resultado[0].id,
                            "usuario": resultado[0].usuario,
                            "contraseña": resultado[0].contraseña,
                            "nombre": resultado[0].nombre,
                            "tipo": resultado[0].tipo,
                            "nodo": resultado[0].nodo
                        };
                        if (passBuscado === json1.contraseña) {
                            res.json(json1);
                        }
                        else {
                            res.sendStatus(401);
                        }
                    }
                }
            });
        }
    });
});
//metodo POST para ACTUALIZAR UN USUARIO
router.post('/usuarios/:user', (req, res) => {
    var json1 = {};
    var buscado = req.params.user;
    var json2 = req.body;
    connection.getConnection(function (error, tempConn) {
        if (error) {
            throw error;
        }
        else {
            console.log('Conexion correcta.');
            tempConn.query('SELECT * FROM usuarios WHERE usuario = ?', [buscado], function (error, result) {
                var resultado = result;
                if (error) {
                    res.send("Error al ejecutar el query");
                } else {
                    tempConn.release();
                    if (resultado.length === 0) {
                        res.status(418).send("No user found");
                    }
                    else {
                        json1 = {
                            "id": resultado[0].id,
                            "usuario": resultado[0].usuario,
                            "contraseña": resultado[0].contraseña,
                            "nombre": resultado[0].nombre,
                            "tipo": resultado[0].tipo,
                            "nodo": resultado[0].nodo
                        };
                        console.log("Antes del update:");
                        console.log(json1);
                        tempConn.query('UPDATE usuarios SET id=?, usuario=?, contraseña = ?, nombre=?, tipo=?, nodo=? WHERE user=?',
                            [json1.id, json2.usuario, json2.contraseña, json2.nombre, json2.tipo, json2.nodo, buscado],
                            function (error, result) {
                                if (error) {
                                    res.status(418).send("error al ejecutar el query");
                                } else {
                                    tempConn.release();
                                    res.send("datos actualizados"); //mensaje de respuesta
                                }
                            }
                        );
                    }
                }
            });
        }
    });
});
module.exports = router;
