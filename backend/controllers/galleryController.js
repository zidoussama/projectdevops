const Gallery = require('../models/gallery');


exports.createGallery = async (req, res) => {
  try {
    const { title, type } = req.body;

    if (!title || !type) {
      return res.status(400).json({ message: "title and type are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const imageUrls = req.files.map((file) => file.path);

    const gallery = new Gallery({
      title,
      type,
      image: imageUrls[0], 
    });

    await gallery.save();
    return res.status(201).json(gallery);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.find();
        res.status(200).json(galleries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getGalleryById = async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);
        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        res.status(200).json(gallery);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateGallery = async (req, res) => {
  try {
    const { title, type } = req.body;

    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    if (title !== undefined) gallery.title = title;
    if (type !== undefined) gallery.type = type;

    
    if (req.files && req.files.length > 0) {
      gallery.image = req.files[0].path; 
    }

    await gallery.save();
    return res.status(200).json(gallery);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteGallery = async (req, res) => {
    try {
        const gallery = await Gallery.findByIdAndDelete(req.params.id);
        if (!gallery) {
            return res.status(404).json({ message: 'Gallery not found' });
        }
        res.status(200).json(gallery);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};