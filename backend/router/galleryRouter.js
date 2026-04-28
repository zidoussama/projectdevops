const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
    createGallery,
    getAllGalleries,
    getGalleryById,
    updateGallery,
    deleteGallery
} = require('../controllers/galleryController');

router.post("/gallery", upload.array("images", 1), createGallery);
router.get('/gallery', getAllGalleries);
router.get('/gallery/:id', getGalleryById);
router.put("/gallery/:id", upload.array("images", 1), updateGallery);
router.delete('/gallery/:id', deleteGallery);

module.exports = router;
