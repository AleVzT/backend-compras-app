const { Router } = require('express');
const detailsGet = require('../controllers/detailProduct');
const productsGet = require('../controllers/products');


const router = Router();

router.get('/', productsGet);

router.get('/:id', detailsGet);

module.exports = router;
