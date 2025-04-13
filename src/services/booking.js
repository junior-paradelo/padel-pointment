const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const BookingDTO = require("../utils/dto/BookingDTO");

/**
 * Creates a new booking in the database.
 * @async
 * @function createBooking
 * @param {Object} data - The booking data to be created.
 * @returns {Promise<Object>} The created booking object.
 * @throws {Error} If there's an error during the booking creation process.
 */
const createBooking = async (data) => {
    try {
        const booking = await prisma.booking.create({
            data,
        });
        return booking;
    } catch (error) {
        throw new Error("Error creating booking: " + error.message);
    }
};

/**
 * Retrieves a booking by its ID.
 * @async
 * @function getBookingById
 * @param {string|number} id - The ID of the booking to retrieve.
 * @returns {Promise<Object|null>} The booking object if found, null otherwise.
 * @throws {Error} If there's an error during the booking retrieval process.
 */
const getBookingById = async (id) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id },
        });
        return new BookingDTO(booking);
    } catch (error) {
        throw new Error("Error fetching booking: " + error.message);
    }
};

/**
 * Retrieves all bookings from the database.
 * @async
 * @function getAllBookings
 * @returns {Promise<Array<Object>>} An array of booking objects.
 * @throws {Error} If there's an error during the bookings retrieval process.
 */
const getAllBookings = async () => {
    try {
        const bookings = await prisma.booking.findMany();
        return bookings.map((booking) => {
            return new BookingDTO(booking);
        });
    } catch (error) {
        throw new Error("Error fetching bookings: " + error.message);
    }
};

/**
 * Updates a booking by its ID.
 * @async
 * @function updateBooking
 * @param {string|number} id - The ID of the booking to update.
 * @param {Object} data - The new booking data.
 * @returns {Promise<Object>} The updated booking object.
 * @throws {Error} If there's an error during the booking update process.
 */
const updateBooking = async (id, data) => {
    try {
        const booking = await prisma.booking.update({
            where: { id },
            data,
        });
        return new BookingDTO(booking);
    } catch (error) {
        throw new Error("Error updating booking: " + error.message);
    }
};

/**
 * Updates a booking by its ID.
 * @async
 * @function updateBooking
 * @param {string|number} id - The ID of the booking to update.
 * @param {Object} data - The new booking data.
 * @returns {Promise<Object>} The updated booking object.
 * @throws {Error} If there's an error during the booking update process.
 */
const deleteBooking = async (id) => {
    try {
        const booking = await prisma.booking.delete({
            where: { id },
        });
        return booking;
    } catch (error) {
        throw new Error("Error deleting booking: " + error.message);
    }
};

/**
 * Retrieves all bookings associated with a specific user.
 * @async
 * @function getBookingsByUserId
 * @param {string|number} userId - The ID of the user whose bookings are to be retrieved.
 * @returns {Promise<Array<Object>>} An array of booking objects associated with the specified user.
 * @throws {Error} If there's an error during the retrieval process.
 */
const getBookingsByUserId = async (userId) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { userId },
        });
        return bookings.map((booking) => {
            return new BookingDTO(booking);
        });
    } catch (error) {
        throw new Error("Error fetching bookings by user ID: " + error.message);
    }
};

/**
 * Retrieves all bookings for a specific court on a specific day.
 * @async
 * @function getBookingsByCourtAndDate
 * @param {string|number} courtId - The ID of the court.
 * @param {Date} date - The date for which to retrieve bookings.
 * @returns {Promise<Array<Object>>} An array of booking objects for the specified court and date.
 * @throws {Error} If there's an error during the retrieval process.
 */
const getBookingsByCourtAndDate = async (courtId, date) => {
    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const bookings = await prisma.booking.findMany({
            where: {
                courtId,
                startTime: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            orderBy: {
                startTime: "asc",
            },
        });
        return bookings.map((booking) => {
            return new BookingDTO(booking);
        });
    } catch (error) {
        throw new Error("Error fetching bookings by court and date: " + error.message);
    }
};
/**
 * Retrieves all bookings associated with a specific court.
 * @async
 * @function getBookingsByCourt
 * @param {string|number} courtId - The ID of the court whose bookings are to be retrieved.
 * @returns {Promise<Array<Object>>} An array of booking objects associated with the specified court.
 * @throws {Error} If there's an error during the retrieval process.
 */
const getBookingsByCourt = async (courtId) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { courtId },
            orderBy: {
                startTime: "asc",
            },
        });
        return bookings.map((booking) => {
            return new BookingDTO(booking);
        });
    } catch (error) {
        throw new Error("Error fetching bookings by court ID: " + error.message);
    }
};

module.exports = {
    createBooking,
    getBookingById,
    getAllBookings,
    updateBooking,
    deleteBooking,
    getBookingsByUserId,
    getBookingsByCourtAndDate,
    getBookingsByCourt,
};
