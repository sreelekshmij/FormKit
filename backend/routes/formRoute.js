const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const { authenticateToken } = require('../middlewares/auth');

router.post('/', authenticateToken ,formController.createForm);

router
.route(':/formId')
.patch(authenticateToken,formController.updateForm)
.get(authenticateToken,formController.getFormById)
.delete(authenticateToken,formController.deleteFormById);


router.get('/:userId', authenticateToken, formController.getAllForms);


module.exports = router;
