const express= require("express");
const router= express.Router();
const citiesController= require("../controllers/cities.controllers");
const attractionsController= require("../controllers/attractions.controllers");
router.route("/cities").get(citiesController.getAll).post(citiesController.addOne);
router.route("/cities/:cityId").get(citiesController.getOne).delete(citiesController.deleteOne).put(citiesController.updateOne).patch(citiesController.updateOnePartial);

router.route("/cities/:cityId/attractions").get(attractionsController.getAll).post(attractionsController.addOne);

router.route("/cities/:cityId/attractions/:attractionId").delete(attractionsController.deleteOne).get(attractionsController.getOne).put(attractionsController.updateOne)
.patch(attractionsController.updateOnePartial);


module.exports = router;