const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const config = require("../utils/config");
const logger = require('../loggers/logger');
const { login } = require('./userController');
const db = require('../dbConnection/db');
const addressBook = db.addressBook;

exports.addAddressBook = async(req, res, next) => {
    try {
        const data = await addressBook.bulkCreate(req.body);
        if (data) {
            await next(
                new GeneralResponse(
                    "Successfully added Address Data....",
                    undefined,
                    config.HTTP_CREATED
                )
            ); 
        } else {
            await next(
                new GeneralError(
                    "Not Successfully added Address Data....",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }
    } catch (err) {
        logger.error("err", err)
    }
}

exports.viewAddressBook = async(req, res, next) => {
    try {
        const addressBookData = await addressBook.findAll();
        if (addressBookData) {
            res.send(addressBookData);
        } else {

            await next(
                new GeneralError(
                    "addressBookData is Not Showing...",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );

        }

    } catch (err) {
        logger.error("err", err)
    }
};

exports.updateAddressBook = async(req, res, next) => {
    try {
        const id = req.params.id
        const updateAddressBookData = {
            Title: req.body.Title,
            addressLine1: req.body.addressLine1,
            addressLine2: req.body.addressLine2,
            Country: req.body.Country,
            State: req.body.State,
            City: req.body.City,
            PinCode: req.body.PinCode,
        }
        const updatedAddressBook = addressBook.update(updateAddressBookData, {
            where: { id: id }
        });
        if (updatedAddressBook) {
            await next(
                new GeneralResponse(
                    "AddressBook is Updated.....",
                    undefined,
                    config.HTTP_CREATED
                )
            );
        } else {
            await next(
                new GeneralError(
                    "AddressBook Is Not Updated....",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }

    } catch (err) {
        logger.error("err", err)
    }
}

exports.deleteAddressBook = async(req, res, next) => {
    try {

        const id = req.params.id

        const deleteAddressBookData = await addressBook.destroy({
            where: { id: id }
        });

        if (deleteAddressBookData) {
            await next(
                new GeneralResponse(
                    "AddressBook Deleted....",
                    undefined,
                    config.HTTP_CREATED
                )
            );
        } else {
            await next(
                new GeneralError(
                    "AddressBook is Not Deleted....",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }

    } catch (err) {
        logger.error("err", err);
    }
};