const { Router } = require("express");
const { task: ctrlr } = require("../controllers");

const router = Router()

router.route('/').get()

module.exports = router