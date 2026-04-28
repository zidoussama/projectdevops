const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam
} = require('../controllers/teamController');


router.post('/team', upload.array('images', 1), createTeam);
router.get('/team', getAllTeams);
router.get('/team/:id', getTeamById);
router.put('/team/:id', upload.array('images', 1), updateTeam);
router.delete('/team/:id', deleteTeam);

module.exports = router;
