const express = require("express");
const VillageController = require('../controllers/VillageController.js');
const multer = require('multer');

const router = express.Router();
const storage = multer.diskStorage({
    destination: './media/village/',
    filename: (req, file, cb) => {
        return cb(null, `${file.originalname}`)
    }
})

const upload = multer({
    storage: storage
})

router.get('/', VillageController.allVillage);
router.get('/total', VillageController.allVillageTotal);
router.post('/', VillageController.addVillage);
router.post('/sketch', upload.single('sketchFile'), VillageController.uploadSketch);

router.put('/:id', VillageController.editVillage);
router.delete('/:id', VillageController.deleteVillage);
router.get('/:id', VillageController.villageById);
router.get('/people/:id', VillageController.allDataByVillage);
router.get('/filter-data/:search&:id', VillageController.getAllDataOfVillage);

module.exports = router;