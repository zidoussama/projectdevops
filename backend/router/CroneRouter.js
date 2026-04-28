const {crone} =require( "../controllers/cronController");
const express = require('express');
const router = express.Router();


router.post('/crone', crone);

module.exports = router;