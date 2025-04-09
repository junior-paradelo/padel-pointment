const {
    createBooking,
    getBookingById,
    getAllBookings,
    updateBooking,
    deleteBooking,
    getBookingsByUserId,
    getBookingsByCourtAndDate,
} = require("../services/booking");

// Create a new booking
const createBookingController = async (req, res) => {
    try {
        const booking = await createBooking(req.body);
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get booking by ID
const getBookingByIdController = async (req, res) => {
    try {
        const booking = await getBookingById(Number(req.params.id));
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all bookings
const getAllBookingsController = async (req, res) => {
    try {
        const bookings = await getAllBookings();
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update booking
const updateBookingController = async (req, res) => {
    try {
        const booking = await updateBooking(Number(req.params.id), req.body);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete booking
const deleteBookingController = async (req, res) => {
    try {
        const booking = await deleteBooking(Number(req.params.id));
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get bookings by user ID
const getBookingsByUserIdController = async (req, res) => {
    try {
        const bookings = await getBookingsByUserId(Number(req.params.userId));
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get bookings by court and date
const getBookingsByCourtAndDateController = async (req, res) => {
    try {
        const { courtId, date } = req.params;
        const bookings = await getBookingsByCourtAndDate(Number(courtId), date);
        res.status(200).json({ success: true, count: bookings.length, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update the module.exports to include the new controller
module.exports = {
    createBooking: createBookingController,
    getBookingById: getBookingByIdController,
    getAllBookings: getAllBookingsController,
    updateBooking: updateBookingController,
    deleteBooking: deleteBookingController,
    getBookingsByUserId: getBookingsByUserIdController,
    getBookingsByCourtAndDate: getBookingsByCourtAndDateController,
};
