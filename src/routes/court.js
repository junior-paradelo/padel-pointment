const { Router } = require("express");
const { getAllCourts, getSingleCourt, modifyCourt, removeCourt } = require("../controllers/court");
const authMiddleware = require("../middlewares/auth");

const router = Router();

router.get("/", getAllCourts);
router.get("/:id", getSingleCourt);
router.patch("/:id", authMiddleware, modifyCourt);
router.delete("/:id", authMiddleware, removeCourt);

module.exports = router;
