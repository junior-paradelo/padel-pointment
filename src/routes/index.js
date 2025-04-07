const { Router } = require("express");
const authRouter = require("./auth");
const usersRouter = require("./users");
const courtRouter = require("./court");
const bookingRouter = require("./booking");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/court", courtRouter);
router.use("/booking", bookingRouter);

module.exports = router;
