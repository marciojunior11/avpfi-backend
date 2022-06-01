const daoPaises = require('../daos/daoPaises');

// @descricao BUSCA TODOS OS REGISTROS
// @route GET /api/paises
async function buscarTodos(req, res) {
    try {
        const paises = await daoPaises.buscarTodos()
            .then(result => {
                var paises = result.rows;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(paises));
            })
    } catch (error) {
        console.log(error);
    }
};

// @descricao BUSCA UM REGISTROS
// @route GET /api/paises/:id
async function buscarUm(req, res, id) {
    try {
        const pais = await daoPaises.buscarUm(id)
            .then(result => {
                if (result.rows.length === 0) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'País não encontrado.' }));
                } else {
                    var pais = result.rows;
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(pais));
                }
            })
    } catch (error) {
        console.log(error);
    }
};

// @descricao SALVA UM REGISTROS
// @route POST /api/paises
async function salvar(req, res) {
    try {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            const { id, pais, sigla } = JSON.parse(body);

            const mPais = {
                id,
                pais,
                sigla
            };

            const novoPais = await daoPaises.salvar(mPais)
                .then((result) => {
                    console.log(result);
                    res.writeHead(201, { 'Content-Type': 'application/json'});
                    res.end(JSON.stringify(result));
                })
        })
    } catch (error) {
        console.log(error);
    }
};

// @descricao ALTERA UM REGISTROS
// @route PUT /api/paises/:id
async function alterar(req, res, id) {
    try {
        const mPais = await daoPaises.buscarUm(id)
            .then((result) => {
                if (result.rows.length === 0) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'País não encontrado.' })); 
                }
            })

        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            const { id, pais, sigla } = JSON.parse(body);

            const mPais = {
                id,
                pais,
                sigla
            };

            const novoPais = await daoPaises.alterar(id, mPais)
                .then((result) => {
                    console.log(result);
                    res.writeHead(201, { 'Content-Type': 'application/json'});
                    res.end(JSON.stringify(result));
                })
        })
    } catch (error) {
        console.log(error);
    }
};

// @descricao DELETA UM REGISTROS
// @route GET /api/paises/:id
async function deletar(req, res, id) {
    try {
        const pais = await daoPaises.buscarUm(id)
            .then(result => {
                if (result.rows.length === 0) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'País não encontrado.' }));
                }
            })
        
        const mPais = await daoPaises.deletar(id)
            .then((result) => {
                console.log(result);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            })
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    buscarTodos,
    buscarUm,
    salvar,
    alterar,
    deletar
}