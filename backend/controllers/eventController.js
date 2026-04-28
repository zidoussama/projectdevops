const Event = require('../models/event');

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, details, status } = req.body;

    if (!title || !description || !date || !time || !location || !details || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    const imageUrls = req.files.map((file) => file.path); 

    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      image: imageUrls[0], 
      details,
      status,
    });

    await event.save();
    return res.status(201).json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, details, status } = req.body;

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Update only provided fields (so you can do partial updates)
    if (title !== undefined) event.title = title;
    if (description !== undefined) event.description = description;
    if (date !== undefined) event.date = date;
    if (time !== undefined) event.time = time;
    if (location !== undefined) event.location = location;
    if (details !== undefined) event.details = details;
    if (status !== undefined) event.status = status;

    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map((file) => file.path);
      event.image = imageUrls[0];   
    }

    await event.save();
    return res.status(200).json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


