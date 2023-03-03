const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");

const controller = require("./dishes.controller");

//Add routes and attach handlers to the router exported by this file.

//dishes/:dishId
router
  .route("/:dishId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

//route /dishes
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;
