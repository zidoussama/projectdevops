const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

router.post("/project", upload.array("images", 5), createProject);
router.get('/project', getAllProjects);
router.get('/project/:id', getProjectById);
router.put('/project/:id', upload.array('images', 5), updateProject);
router.delete('/project/:id', deleteProject);

module.exports = router;

