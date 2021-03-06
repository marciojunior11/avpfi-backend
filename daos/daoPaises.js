const { pool } = require('../datamodule/index');

// @descricao BUSCA TODOS OS REGISTROS
// @route GET /api/paises
async function buscarTodos () {
    return new Promise((resolve, reject) => {
        pool.query('select * from paises', (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        })
    })
};

// @descricao BUSCA UM REGISTRO
// @route GET /api/paises
async function buscarUm (id) {
    return new Promise((resolve, reject) => {
        pool.query('select * from paises where id = $1', [id], (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        })
    })
};

// @descricao SALVA UM REGISTRO
// @route POST /api/paises
async function salvar (pais) {
    return new Promise((resolve, reject) => {
        pool.query('insert into paises values($1, $2, $3)', [pais.id, pais.pais, pais.sigla], (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        })
    })
};

// @descricao ALTERA UM REGISTRO
// @route PUT /api/paises/:id
async function alterar (id, pais) {
    return new Promise((resolve, reject) => {
        pool.query('update paises set id = $1, pais = $2, sigla = $3 where id = $4 ', [pais.id, pais.pais, pais.sigla, id], (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        })
    })
};

// @descricao DELETA UM REGISTRO
// @route GET /api/paises/:id
async function deletar (id) {
    return new Promise((resolve, reject) => {
        pool.query('delete from paises where id = $1', [id], (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        })
    })
};

module.exports = {
    buscarTodos,
    buscarUm,
    salvar,
    alterar,
    deletar
}