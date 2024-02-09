const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const { route } = require('./restaurant');

const router = express.Router();


//----------dishes----------------

//panel z lista dan
router.get('/dishes-dashboard', adminController.getDishesDashboard)
//akcja koszyk z dishes, dodanie dania do koszyka i wyswietlenie znowu tej samej strony
router.post('/dishes-cart', adminController.postDishCart)
//pobiera rzeczy z koszyka i dodaje je jako order do bazy
router.post('/dishes-create-order', adminController.postCreateOrder)
//usuwanie dania z koszyka
router.post('/delete-dish-from-cart', adminController.postDeleteDishFromCart)


//----------ingredients----------------

//wyswietlenie panelu do zarzadzania skladnikami
router.get('/ingredients-dashboard', adminController.getIngredientsDashboard)
//akcja koszyk z skladnikami
router.post('/ingredient-cart', adminController.postIngredientCart)
//formularz gdzie podaje sie wage produktu, ktory ma zostac dodany do dania
router.post('/ingredient-weight-checkout', adminController.getIngredientWeightCheckout)
//dodawanie dania po dodaniu skladnikow do koszyka
router.post('/ingredients-create-dish', adminController.postCreateDish)
//usuwanie skladnika z koszyka
router.post('/delete-ingredient-from-cart', adminController.postDeleteIngredientFromCart)


//----------magazine----------------

//panel magazynu gdzie jest przycisk add ingredient i lista skladnikow z detailsami gdzie bedzie spis
router.get('/magazine-dashboard', adminController.getMagazineDashboard)
//strona gdzie albo dodajemy template skladnika albo dodajemy jeden z juz utworzonych szablonow/templateow
router.get('/magazine-add-ingredient-dashboard', adminController.getMagazineAddIngredientDashboard)
//wyswietlanie formylarzu dodawanie template'a
router.get('/magazine-add-ingredient-template', adminController.getMagazineAddIngredientTemplate)
//akcja dodawanie template'a skladnika do bazy
router.post('/magazine-add-ingredient-template', adminController.postMagazineAddIngredientTemplate)
//wyswietlenie formularzu dodawania skladnika z wypelnionymi placeholderami
router.get('/magazine-add-ingredient/ingredient/:ingredientId', adminController.getMagazineAddIngredient)
//akcja dodanie skladnika do bazy
router.post('/magazine-add-ingredient', adminController.postMagazineAddIngredient)
//detailsy skladnika, ktory znajduje sie w magazynie
router.get('/magazine-ingredient-details/ingredient/:ingredientId', adminController.getMagazineIngredientDetails)


//----------orders----------------

//strona z lista zamowien
router.get('/orders', adminController.getOrders);



//dodawanie skladnikow
// router.get('/add-ingredient', adminController.getAddIngredient)


module.exports = router;