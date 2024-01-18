const express = require('express');
const router = express.Router();

const AdvertController = require('../controllers/adverts.controller');

router.get('/ads', AdvertController.getAll);

router.get('/ads/:id', AdvertController.getById);

router.post('/ads', AdvertController.postNewAdv);

router.delete('/ads/:id', AdvertController.deleteById);

router.put('/ads/:id', AdvertController.edit);

router.get('/ads/search/:searchPhrase', AdvertController.search);

module.exports = router;