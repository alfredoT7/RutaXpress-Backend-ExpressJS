const express = require('express');
const router = express.Router();
const descriptionController = require('../controllers/descriptionController'); 

router.post('/', descriptionController.addDescription);
router.get('/:routeId', descriptionController.getDescriptionById);
router.get('/', descriptionController.getAllDescriptions);
module.exports = router;