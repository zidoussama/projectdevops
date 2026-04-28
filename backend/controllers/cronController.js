exports.crone = async (req, res) => {
    try {
        res.status(200).json({ message: 'Cron job executed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
