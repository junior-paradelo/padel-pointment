const { Router } = require("express");
const authRouter = require("./auth");
const usersRouter = require("./users");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);

module.exports = router;
