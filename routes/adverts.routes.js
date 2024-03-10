const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorMiddleware = require('../middleware/authorMiddleware');
const imageUpload = require('../utils/imageUpload');

const AdvertController = require('../controllers/adverts.controller');

router.get('/ads', AdvertController.getAll);

router.get('/ads/:id', AdvertController.getById);

router.post('/ads', authMiddleware, imageUpload.single('img'), AdvertController.postNewAdv);

router.delete('/ads/:id', authMiddleware, authorMiddleware, AdvertController.deleteById);

router.put('/ads/:id', authMiddleware, authorMiddleware, imageUpload.single('img'), AdvertController.edit);

router.get('/ads/search/:searchPhrase', AdvertController.search);

module.exports = router;