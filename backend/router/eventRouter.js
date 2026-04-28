const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {createEvent, getAllEvents, getEventById, updateEvent, deleteEvent} = require('../controllers/eventController');

router.post('/event', upload.array('images'), createEvent);
router.get('/event', getAllEvents);
router.get('/event/:id', getEventById);
router.put('/event/:id', upload.array('images'), updateEvent);
router.delete('/event/:id', deleteEvent);

module.exports = router;
