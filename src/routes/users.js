const { Router } = require("express");
const { getUsers, getUserById, updateUser, deleteUser } = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
