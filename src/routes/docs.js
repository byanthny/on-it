const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("yamljs").load(
  require("path").join(__dirname, "..", "..", "swagger.yaml")
);

const router = express.Router();

router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerDocument));

module.exports = router;
