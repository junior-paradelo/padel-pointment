const { Router } = require("express");
const authRouter = require("./auth");
const usersRouter = require("./users");
const courtRouter = require("./court");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/court", courtRouter);

module.exports = router;
