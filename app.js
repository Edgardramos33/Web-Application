const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/items');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/items', itemRoutes);

app.get('/', (req, res) => {
    res.redirect('/items');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
