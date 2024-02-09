const Ingredient = require('../models/ingredient')
const Dish = require('../models/dish');
const IngredientTemplate = require('../models/ingredientTemplate');

exports.getIndex = (req, res, next) => {
    console.log(req.query)
    res.render('restaurant/index', {
        path: '/',
        pageTitle: 'Rooms list'
    });
};



exports.getDishCart = (req, res, next) => {
    req.user
        .populate('dishCart.items.dishId')
        .then(user => {
            const dishes = user.dishCart.items;
            res.render('restaurant/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                dishes: dishes
            });
        })
        .catch(err => console.log(err));
};

