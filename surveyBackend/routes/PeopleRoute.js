const express = require("express");
const PeopleController = require('../controllers/PeopleController.js')
const router = express.Router();

router.get('/', PeopleController.allPeople);
router.get('/total', PeopleController.allPeopleTotal);
router.get('/population/:search&:id', PeopleController.getPopulation);
router.post('/', PeopleController.addPeople);
router.post('/edit/', PeopleController.editPeople);
router.delete('/:id', PeopleController.deletePeople);
router.get('/by-id/:id', PeopleController.PeopleById);
router.get('/by-id-village/:id', PeopleController.PeopleAndVillageById);

router.get('/by-villege/:id', PeopleController.PeopleByVillege);

module.exports = router;
