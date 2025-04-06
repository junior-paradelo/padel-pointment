const { Router } = require("express");
const { getAllCourts, getSingleCourt, modifyCourt, removeCourt } = require("../controllers/court");

const router = Router();

router.get("/", getAllCourts);
router.get("/:id", getSingleCourt);
router.patch("/:id", modifyCourt);
router.delete("/:id", removeCourt);

module.exports = router;
