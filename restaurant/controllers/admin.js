const Ingredient = require('../models/ingredient')
const Dish = require('../models/dish')
const Order = require('../models/order')
const IngredientTemplate = require('../models/ingredientTemplate')



//--------------------dishes------------------------------------------------------------------

exports.getDishesDashboard = (req, res, next) => {
    req.user
        .populate('dishCart.items.dishId')
        .then(user => {
            const cartDishes = user.dishCart.items;
            let finalPrices = 0;
            let dishesPrices = user.dishCart.items.map(i => {
                return finalPrices = finalPrices + i.dishId.price
            })
            console.log
            Dish.find()
                .then(dishes => {
                    res.render('admin/dishes/dishes-dashboard', {
                        path: 'admin/dishes-dashboard',
                        finalPrice: finalPrices,
                        dishes: dishes,
                        cartDishes: cartDishes,
                        pageTitle: 'ingredients list'
                    })
                })
        })
        .catch(err => {
            console.log(err)
        })
};

exports.postDishCart = (req, res, next) => {
    const dishId = req.body.dishId;
    Dish.findById(dishId)
        .then(dish => {
            return req.user.addDishToCart(dish);
        })
        .then(result => {
            console.log(result);
            res.redirect('dishes-dashboard');
        });
};

exports.postCreateOrder = (req, res, next) => {
    req.user
        .populate('dishCart.items.dishId')
        .then(user => {
            const dishes = user.dishCart.items.map(i => {
                return { quantity: i.quantity, dish: { ...i.dishId._doc } }
            })
            let finalPrices = 0;
            const dishesPrices = user.dishCart.items.map(i => {
                return finalPrices = finalPrices + i.dishId.price
            })
            
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                dishes: dishes,
                price: finalPrices
            });
            return order.save()
        })
        .then(result => {
            return req.user.clearDishesCart()
        })
        .then(result => {
            res.redirect('/admin/orders')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postDeleteDishFromCart = (req, res, next) => {
    const prodId = req.body.dishId;
    req.user
        .removeDishFromCart(prodId)
        .then(result => {
            res.redirect('dishes-dashboard');
        })
        .catch(err => console.log(err));
};



//--------------------ingredients--------------------------------------------------------------

exports.getIngredientsDashboard = (req, res, next) => {
    const { category } = req.query
    console.log(category)
    req.user
        .populate('ingredientCart.items.ingredientTemplateId')
        .then(user => {
            const cartIngredients = user.ingredientCart.items;
            if (category) {
                IngredientTemplate.find({ 'category': category })
                    .then(ingredientTemplates => {
                        res.render('admin/ingredients/ingredients-dashboard', {
                            path: 'admin/ingredients/ingredients-dashboard',
                            ingredientTemplates: ingredientTemplates,

                            cartIngredients: cartIngredients,
                            pageTitle: 'ingredients list'
                        })

                    })
            } else {
                IngredientTemplate.find()
                    .then(ingredientTemplates => {

                        res.render('admin/ingredients/ingredients-dashboard', {
                            path: 'admin/ingredients/ingredients-dashboard',
                            ingredientTemplates: ingredientTemplates,

                            cartIngredients: cartIngredients,
                            pageTitle: 'ingredients list'
                        })
                    })
            }
        })
        .catch(err => console.log(err));
}

exports.postIngredientCart = (req, res, next) => {
    const ingredientTemplateId = req.body.ingredientTemplateId;
    const weight = req.body.weight;
    IngredientTemplate.findById(ingredientTemplateId)
        .then(ingredient => {
            return req.user.addIngredientToCart(ingredient, weight);
        })
        .then(result => {
            console.log(result);
            res.redirect('ingredients-dashboard');
        });
};

exports.getIngredientWeightCheckout = (req, res, next) => {
    const ingredientTemplateId = req.body.ingredientTemplateId;
    IngredientTemplate.findById(ingredientTemplateId)
        .then(ingredientTemplate => {
            // return req.user.addIngredientToCart(ingredient);
            res.render('admin/ingredients/ingredient-weight-checkout', {
                path: '/cart',
                pageTitle: 'Your Cart',
                ingredientTemplate: ingredientTemplate
            });
        })
};

exports.postCreateDish = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    req.user
        .populate('ingredientCart.items.ingredientTemplateId')
        .then(user => {
            const ingredients = user.ingredientCart.items.map(i => {
                return { weight: i.weight, ingredient: { ...i.ingredientTemplateId._doc } };
            });
            const dish = new Dish({
                name: name,
                price: price,
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                ingredientTemplates: ingredients
            });
            return dish.save();
        })
        .then(result => {
            return req.user.clearIngredientCart();
        })
        .then(() => {
            res.redirect('dishes-dashboard');
        })
        .catch(err => console.log(err));
};

exports.postDeleteIngredientFromCart = (req, res, next) => {
    const prodId = req.body.ingredientTemplateId;
    req.user
        .removeIngredientFromCart(prodId)
        .then(result => {
            res.redirect('ingredients-dashboard');
        })
        .catch(err => console.log(err));
};



//--------------------magazine-------------------------------------------------------------------------

exports.getMagazineDashboard = (req, res, next) => {
    IngredientTemplate.find()
        .then(ingredients => {
            res.render('admin/magazine/magazine-dashboard', {
                path: 'admin/magazine/magazine-dashboard',
                ingredients: ingredients,
                pageTitle: 'ingredients list'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getMagazineAddIngredientDashboard = (req, res, next) => {
    IngredientTemplate.find()
        .then(ingredients => {
            res.render('admin/magazine/magazine-add-ingredient-dashboard', {
                path: 'admin/magazine-dashboard',
                ingredients: ingredients,
                pageTitle: 'ingredients list'
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getMagazineAddIngredientTemplate = (req, res, next) => {
    res.render('admin/magazine/magazine-add-ingredient-template', {
        path: '/admin/magazine/add-magazine-ingredient',
        pageTitle: 'Adding ingredient'
    })
}

exports.postMagazineAddIngredientTemplate = (req, res, next) => {
    const name = req.body.name;
    let expirationDate = req.body.expirationDate
    const category = req.body.category;

    if (!expirationDate) {
        expirationDate = new Date();
    }

    const ingredientTemplate = new IngredientTemplate({ name: name, expirationDate: expirationDate, category: category })
    ingredientTemplate
        .save()
        .then(result => {
            console.log('ingredient added');
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
            res.redirect('/')
        })
}

exports.getMagazineAddIngredient = (req, res, next) => {
    const ingredientId = req.params.ingredientId;
    IngredientTemplate.findById(ingredientId)
        .then(ingredient => {
            res.render('admin/magazine/magazine-add-ingredient', {
                ingredient: ingredient,
                pageTitle: 'title',
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.postMagazineAddIngredient = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const weight = req.body.weight;
    let expirationDate = req.body.expirationDate
    const category = req.body.category;

    if (!expirationDate) {
        expirationDate = new Date();
    }

    const ingredient = new Ingredient({ name: name, price: price, weight: weight, expirationDate: expirationDate, category: category })
    ingredient
        .save()
        .then(result => {
            console.log('ingredient added');
            res.redirect('ingredients-dashboard')
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getMagazineIngredientDetails = (req, res, next) => {
    const ingredientId = req.params.ingredientId;
    IngredientTemplate.findById(ingredientId)
        .then(ingredient => {
            console.log(ingredient.name)
            Ingredient.find({ 'name': ingredient.name })
                .then(ingredients => {
                    res.render('admin/magazine/magazine-ingredient-details', {
                        ingredients: ingredients,
                        pageTitle: 'title',
                        path: '/products'
                    });
                })
        })
        .catch(err => console.log(err));
};



//--------------------orders-------------------------------------------------------------------------

exports.getOrders = (req, res, next) => {
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('admin/orders/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};













// exports.getCategory = (req, res, next) => {
//     const category = req.params.category;
//     Ingredient.find({ 'category': category })
//         .then(ingredients => {
//             res.render('admin/ingredients-dashboard', {
//                 ingredients: ingredients,
//                 pageTitle: 'jebac',
//                 path: '/products'
//             });
//         })
//         .catch(err => console.log(err));
// };
// exports.getAddIngredient = (req, res, next) => {
//     res.render('admin/add-ingredient', {
//         path: '/admin/add-ingredient',
//         pageTitle: 'Adding ingredient'
//     })
// }

// exports.getAddDish = (req, res, next) => {
//     res.render('admin/add-dish', {
//         path: '/admin/add-dish',
//         pageTitle: 'Adding dish'
//     })
// }








