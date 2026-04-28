const Team = require('../models/team');

const ALLOWED_ROLES = [
  'President',
  'Executive Vice President',
  'Vice President',
  'Secretary',
  'Treasurer',
  'User',
];

function getFirstUploadedFilePath(req) {
  // Works with multer.single('image') => req.file
  if (req.file?.path) return req.file.path;

  // Works with multer.array('images') => req.files
  if (Array.isArray(req.files) && req.files.length > 0) return req.files[0].path;

  // Works with multer.fields([{name:'image'}]) => req.files.image[0]
  if (req.files?.image?.[0]?.path) return req.files.image[0].path;

  return null;
}

exports.createTeam = async (req, res) => {
  try {
    const { name, role, year } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'name is required' });
    }

    // role is optional because schema has default
    if (role && !ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ message: 'Invalid role value' });
    }

    const imagePath = getFirstUploadedFilePath(req);
    if (!imagePath) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const team = await Team.create({
      name,
      role: role || undefined,
      year: year !== undefined ? Number(year) : undefined,
      image: imagePath,
    });

    return res.status(201).json({ message: 'Team created successfully', team });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    return res.status(200).json({ teams });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    return res.status(200).json({ team });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { name, role, year } = req.body;

    if (role && !ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({ message: 'Invalid role value' });
    }

    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    if (name !== undefined) team.name = name;
    if (role !== undefined) team.role = role;
    if (year !== undefined) team.year = Number(year);

    const imagePath = getFirstUploadedFilePath(req);
    if (imagePath) {
      team.image = imagePath;
    }

    await team.save();
    return res.status(200).json({ message: 'Team updated successfully', team });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    return res.status(200).json({ message: 'Team deleted successfully', team });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};