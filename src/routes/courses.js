const express = require("express");
const router = express.Router();

const courseController = require("../app/controllers/CourseController");

router.get(
    "/create",
    function (req, res, next) {
        if (req.query.user === "admin") return next();
        res.status(403).json({
            message: "You have to sign in as an admin",
        });
    },
    courseController.create
);
router.post("/store", courseController.store);
router.post("/handle-form-actions", courseController.handleFormActions);
router.get("/:id/edit", courseController.edit);
router.put("/:id", courseController.update);
router.patch("/:id/restore", courseController.restore);
router.delete("/:id", courseController.destroy);
router.delete("/:id/force", courseController.forceDestroy);
router.get("/:slug", courseController.show);

module.exports = router;
