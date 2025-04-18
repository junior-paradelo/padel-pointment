const { getCourts, getCourtById, updateCourt, deleteCourt } = require("../services/court");
const { validateCourt } = require("../schemas/court");

/**
 * Get all courts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllCourts = async (req, res) => {
    try {
        const courts = await getCourts();
        res.status(200).json(courts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching courts", error: error.message });
    }
};

/**
 * Get court by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getSingleCourt = async (req, res) => {
    try {
        const { id } = req.params;
        const court = await getCourtById(id);

        if (!court) {
            return res.status(404).json({ message: "Court not found" });
        }

        res.status(200).json(court);
    } catch (error) {
        res.status(500).json({ message: "Error fetching court", error: error.message });
    }
};

/**
 * Update court details
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const modifyCourt = async (req, res) => {
    try {
        const { id } = req.params;
        const data = validateCourt(req.body);
        const updatedCourt = await updateCourt(id, data);

        if (!updatedCourt) {
            return res.status(404).json({ message: "Court not found" });
        }

        res.status(200).json(updatedCourt);
    } catch (error) {
        res.status(500).json({ message: "Error updating court", error: error.message });
    }
};

/**
 * Delete court
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const removeCourt = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteCourt(id);

        if (!result) {
            return res.status(404).json({ message: "Court not found" });
        }

        res.status(200).json({ message: "Court deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting court", error: error.message });
    }
};

module.exports = {
    getAllCourts,
    getSingleCourt,
    modifyCourt,
    removeCourt,
};
