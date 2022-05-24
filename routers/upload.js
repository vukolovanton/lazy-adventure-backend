const express = require('express');
const uploadController = require('../controllers/uploadController');
const router = express.Router();

router.post(`/`, uploadController.handleUplaod);
router.get(`/single/:name`, uploadController.handleDownloadSingleFile);
router.get(`/`, uploadController.handleGetFilesList);
router.get('/monsters', uploadController.handleGetMonstersList);

module.exports = router;
