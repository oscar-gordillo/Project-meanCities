const express= require("express");
const router= express.Router();
const citiesController= require("../controllers/cities.controllers");
const attractionsController= require("../controllers/attractions.controllers");
const usersController= require("../controllers/users.controllers");
const authController= require("../controllers/authentication.controllers");
router.route("/cities").get(authController.auhtenticate,citiesController.getAll).post(citiesController.addOne);
router.route("/cities/:cityId").get(citiesController.getOne).delete(citiesController.deleteOne).put(citiesController.updateOneFull).patch(citiesController.updateOnePartial);

router.route("/cities/:cityId/attractions").get(attractionsController.getAll).post(attractionsController.addOne);

router.route("/cities/:cityId/attractions/:attractionId").delete(attractionsController.deleteOne).get(attractionsController.getOne).put(attractionsController.updateOneFull)
.patch(attractionsController.updateOnePartial);

router.route("/users").post(usersController.addOne);

router.route("/users/login").post(usersController.login);

module.exports = router;