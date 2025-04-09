const { Router } = require("express");
const authRouter = require("./auth");
const usersRouter = require("./users");
const courtRouter = require("./court");
const bookingRouter = require("./booking");
const authMiddleware = require("../middlewares/auth");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", authMiddleware, usersRouter);
router.use("/court", authMiddleware, courtRouter);
router.use("/booking", authMiddleware, bookingRouter);

module.exports = router;
