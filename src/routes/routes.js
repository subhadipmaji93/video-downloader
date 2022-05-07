const router = require("express").Router();
const controller = require("../controller/controller");

router.get("/");
router.get("/yt", controller.getYoutube);
router.get("/fb", controller.getFacebook);
router.get("/insta", controller.getInstagram);

module.exports = router;
