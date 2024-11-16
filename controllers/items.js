const db = require('../models/database');

exports.getItems = (req, res) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.render('items', { items: rows });
    });
};

exports.createItem = (req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    db.run('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/items');
    });
};

exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    db.run('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/items');
    });
};

exports.patchItem = (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    let query = 'UPDATE items SET ';
    const params = [];
    Object.keys(updates).forEach((key, idx) => {
        query += `${key} = ?${idx < Object.keys(updates).length - 1 ? ', ' : ' '}`;
        params.push(updates[key]);
    });
    query += 'WHERE id = ?';
    params.push(id);

    db.run(query, params, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/items');
    });
};

exports.deleteItem = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM items WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.redirect('/items');
    });
};
