const Project = require('../models/projects');

exports.createProject = async (req, res) => {
  try {
    const { title, description, year, type } = req.body;

    if (!title || !description || !year || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const imageUrls = req.files.map((file) => file.path);

    const project = new Project({
      title,
      description,
      year,
      type,
      image: imageUrls, // store ALL images
    });

    await project.save();
    return res.status(201).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, description, year, type } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // update fields only if provided
    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (year !== undefined) project.year = year;
    if (type !== undefined) project.type = type;

    // replace images only if new ones uploaded
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map((file) => file.path);
      project.image = imageUrls;
    }

    await project.save();
    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};