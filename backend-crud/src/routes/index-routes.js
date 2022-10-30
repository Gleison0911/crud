const express = require('express');
const categoryController = require('../controllers/categoryController');
const medalController = require('../controllers/medalController');
const rulesController = require('../controllers/rulesController');
const router = express.Router();

router.route("/get-categorys").get(categoryController.all);
router.route("/add-category").post(categoryController.create);
router.route("/update-category/:id").put(categoryController.update);
router.route("/one-category/:id").get(categoryController.oneCategory);
router.route("/delete-one-category/:id").delete(categoryController.delete);

router.route("/search/:key").get(categoryController.filter);

router.route("/get-all-medals").get(medalController.all);
router.route("/add-medal").post(medalController.create);
router.route("/one-medal/:id").get(medalController.oneMedal);
router.route("/update-medal/:id").put(medalController.update);
router.route("/delete-one-medal/:id").delete(medalController.delete);

router.route("/get-all-roules").get(rulesController.all);
router.route("/add-rule").post(rulesController.create);
router.route("/one-rule/:id").get(rulesController.oneRules);
router.route("/update-rule/:id").put(rulesController.update);
router.route("/delete-one-rule/:id").delete(rulesController.delete);
module.exports = router;