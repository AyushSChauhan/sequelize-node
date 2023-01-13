const express = require('express');
const router = express();
const { validator } = require('../helpers/validator');
const validate = require('../validations/addressBookValidation');
const upload = require('../middleware/multer');
const passport = require('passport');
const addressBookController = require("../Controller/addressBookController");
const { generateToken } = require("../helpers/generateToken");

router.post("/addAddressBook", validator.body(validate.addAddressBook), passport.authenticate('jwt', { session: false }), addressBookController.addAddressBook);

router.get("/viewAddressBook", passport.authenticate('jwt', { session: false }), addressBookController.viewAddressBook);

router.put("/updateAddressBook/:id", validator.body(validate.updateAddressBook), passport.authenticate('jwt', { session: false }), addressBookController.updateAddressBook);

router.delete("/deleteAddressBook/:id", passport.authenticate('jwt', { session: false }), addressBookController.deleteAddressBook);

module.exports = router;