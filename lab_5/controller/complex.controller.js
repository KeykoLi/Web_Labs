const db = require('../db')
class ComplexController {
    async create(req, res) {
        const { name, attendance, price } = req.body;

        try {
            const result = await db.query('INSERT INTO complexes (name, attendance, price) VALUES (?, ?, ?)', [name, attendance, price]);

            const insertedId = result[0].insertId;

            // Если вам нужны данные вставленной записи, вы можете выполнить еще один запрос
            const newComplex = await db.query('SELECT * FROM complexes WHERE id = ?', [insertedId]);

            res.json(newComplex[0]);
        } catch (error) {
            console.error('Error creating complex:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }




    async getAll(req, res) {
        const complexes = await db.query('SELECT * FROM complexes')
        res.json(complexes.rows)


    }

    async getOne(req, res) {
        const id = req.params.id
        const complex = await db.query('SELECT * FROM complexes where id = $1', [id])
        res.json(complex.rows[0])

    }

    async update(req, res) {
        const { id, name, attendance, price } = req.body;
        const complex = await db.query('UPDATE complex SET name = $1, attendance = $2, price = $3 WHERE id = $4 RETURNING *', [name, attendance, price, id]);
        res.json(complex.rows[0]);
    }


    async delete(req, res) {
        const id = req.params.id
        const complex = await db.query('DELETE FROM complex where id = $1', [id])
        res.json(complex.rows[0])
    }
}


module.exports = new ComplexController()



