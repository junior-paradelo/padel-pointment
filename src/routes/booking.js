const { Router } = require("express");
const {
    createBooking,
    getBookingById,
    getAllBookings,
    updateBooking,
    deleteBooking,
    getBookingsByUserId,
    getBookingsByCourtAndDate,
} = require("../controllers/booking");

const router = Router();

router.post("/", createBooking);
router.get("/:id", getBookingById);
router.get("/", getAllBookings);
router.patch("/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.get("/user/:userId", getBookingsByUserId);
router.get("/court/:courtId/date/:date", getBookingsByCourtAndDate);

module.exports = router;
