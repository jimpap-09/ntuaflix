const express = require('express')
const router = express.Router()

//name info handler
const infoNameController = require('../../controllers/info/name')
router.get('/:nameID', infoNameController.GetNameInfo)

module.exports = router