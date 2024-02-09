const path = require('path');

const express = require('express');

const restaurantController = require('../controllers/restaurant');

const router = express.Router();

router.get('/', restaurantController.getIndex)

// router.post('/cart', restaurantController.postDishCart)

// router.post('/cart-ingredient', restaurantController.postIngredientCart)

// router.post('/ingredient-weight-checkout', restaurantController.getIngredientWeightCheckout)

// router.post('/delete-dish-from-cart', restaurantController.postDeleteDishFromCart)

// router.post('/create-dish', restaurantController.postDish)
// router.get('/dishes-dashboard', restaurantController.getDishes)


module.exports = router;