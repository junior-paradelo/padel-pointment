const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CourtDTO = require("../utils/dto/CourtDTO");
/**
 * Retrieves all courts from the database
 * @returns {Promise<Array>} Array of court objects
 */
const getCourts = async () => {
    try {
        return (await prisma.court.findMany()).map((court) => {
            return new CourtDTO(court);
        });
    } catch (error) {
        throw new Error(`Failed to get courts: ${error.message}`);
    }
};

/**
 * Retrieves a specific court by its ID
 * @param {number|string} id - The ID of the court to retrieve
 * @returns {Promise<Object|null>} The court object or null if not found
 */
const getCourtById = async (id) => {
    try {
        const result = await prisma.court.findUnique({
            where: { id: Number(id) },
        });
        return result ? new CourtDTO(result) : null;
    } catch (error) {
        throw new Error(`Failed to get court by ID: ${error.message}`);
    }
};

/**
 * Updates a court with new data
 * @param {number|string} id - The ID of the court to update
 * @param {Object} data - The data to update the court with
 * @returns {Promise<Object>} The updated court object
 */
const updateCourt = async (id, data) => {
    try {
        const result = await prisma.court.update({
            where: { id: Number(id) },
            data,
        });
        return result ? new CourtDTO(result) : null;
    } catch (error) {
        throw new Error(`Failed to update court: ${error.message}`);
    }
};

/**
 * Deletes a court from the database
 * @param {number|string} id - The ID of the court to delete
 * @returns {Promise<Object>} The deleted court object
 */
const deleteCourt = async (id) => {
    try {
        await prisma.court.delete({
            where: { id: Number(id) },
        });
        return true;
    } catch (error) {
        console.log(`Failed to delete court: ${error.message}`);
        return false;
    }
};

module.exports = {
    getCourts,
    getCourtById,
    updateCourt,
    deleteCourt,
};
