const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const authorMiddleware = require('../utils/authorMiddleware');

const AdvertController = require('../controllers/adverts.controller');

router.get('/ads', AdvertController.getAll);

router.get('/ads/:id', AdvertController.getById);

router.post('/ads', authMiddleware, AdvertController.postNewAdv);

router.delete('/ads/:id', authMiddleware, authorMiddleware, AdvertController.deleteById);

router.put('/ads/:id', authMiddleware, authorMiddleware, AdvertController.edit);

router.get('/ads/search/:searchPhrase', AdvertController.search);

module.exports = router;