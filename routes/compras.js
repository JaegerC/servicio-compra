const express = require('express');
const router = express.Router();
const models = require('../models/index');

router.get('/', (req, res) => {
  models.compra.findAll()
    .then((data) => res.send(data))
    .catch((e) => res.send(e));
});

module.exports = router;