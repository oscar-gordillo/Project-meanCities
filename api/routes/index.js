const express= require("express");
const router= express.Router();
const citiesController= require("../controllers/cities.controllers");
const attractionsController= require("../controllers/attractions.controllers");
const usersController= require("../controllers/users.controllers");
const authController= require("../controllers/authentication.controllers");


router.route(process.env.CITIES_ROUTE).get(authController.auhtenticate,citiesController.getAll).post(citiesController.addOne);
router.route(process.env.CITIES_CITY_ROUTE).get(citiesController.getOne).delete(citiesController.deleteOne).put(citiesController.updateOneFull).patch(citiesController.updateOnePartial);

router.route(process.env.ATTRACTIONS_ROUTE).get(attractionsController.getAll).post(attractionsController.addOne);

router.route(process.env.ATTRACTION_ROUTE).delete(attractionsController.deleteOne).get(attractionsController.getOne).put(attractionsController.updateOneFull)
.patch(attractionsController.updateOnePartial);

router.route(process.env.USERS_ROUTE).post(usersController.addOne);

router.route(process.env.USER_LOGIN_ROUTE).post(usersController.login);

module.exports = router;