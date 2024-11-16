const express = require('express');
const { getItems, createItem, updateItem, patchItem, deleteItem } = require('../controllers/items');

const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);
router.put('/:id', updateItem);
router.patch('/:id', patchItem);
router.delete('/:id', deleteItem);

module.exports = router;
