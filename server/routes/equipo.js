const express = require('express');
const Equipo = require('../models/equipo');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

//verificaToken
// app.get('/categoria', (req, res) => {
//     Categoria.find({ estado: true })
//         .exec((err, departamentos) => {
//             if (err) {
//                 return res.status(400).json({
//                     ok: false,
//                     err
//                 });
//             }
//             res.json({
//                 ok: true,
//                 departamentos
//             });
//         });
// });
app.get('/equipo', (req, res) => {
    Equipo.find()
        .exec((err, equipos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                equipos
            });

        });
});
// Get by ID
app.get('/categoria/byId/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findById(id)
        .exec((err, categoria) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categoria
            });

        });
});
app.get('/categoria/:departamento', (req, res) => {
    let departamento = req.params.departamento;
    Categoria.find({ departamento, estado: true })
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categorias
            });

        });
});

//[verificaToken, verificaAdmin_Role]
app.post('/equipo', function(req, res) {

    let body = req.body;
    console.log(body);
    let equipo = new Equipo({
        nombre: body.nombre,
        titulos: body.titulos,
    });
    equipo.save((err, equipoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            equipo: equipoDB
        });
    });
});
//[verificaToken, verificaAdmin_Role]
app.put('/categoria/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    let body = req.body;
    Categoria.findByIdAndUpdate(id, body, { new: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })
});
//[verificaToken, verificaAdmin_Role]
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    };

    Categoria.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, categoriaBorrada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBorrada
        });
    });
});

module.exports = app;