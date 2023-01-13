const bcrypt = require('bcrypt');
const saltRounds = 10;
const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const config = require("../utils/config");
const logger = require('../loggers/logger');
const db = require('../dbConnection/db');
const user = db.user;


exports.registration = async (req, res, next) => {
    try {
        const findUser = await user.findOne({ where: { email: req.body.email } });
        if (!findUser) {
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const value = {
                name: req.body.name,
                gender: req.body.gender,
                image: req.file.filename,
                email: req.body.email,
                password: encryptedPassword,
            }
            const registerUser = await user.create(value);
            if (registerUser) {
                next(
                    new GeneralResponse(
                        "Successfully Registered....",
                        registerUser,
                        config.HTTP_CREATED
                    )
                );


            } else {
                next(
                    new GeneralError(
                        "User Registration Failed....",
                        undefined,
                        config.HTTP_ACCEPTED
                    )
                );
            }
        } else {
            next(
                new GeneralError(
                    "User email already exist",
                    undefined
                )
            );
        }

    } catch (err) {
        logger.error("err", err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const User = await user.findOne({ where: { email: req.body.email } });
        if (User == null) {
            res.send("User Not Found...");
        }
        const compare = await bcrypt.compare(req.body.password, User.password);
        if (compare) {
            await next(
                new GeneralResponse(
                    "Login Successfully.....",
                    undefined,
                    config.HTTP_CREATED
                )
            );
        } else {
            await next(
                new GeneralError(
                    "Email and Password Incorrect...",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );
        }

    } catch (err) {
        logger.error("err", err)
    }

};

exports.viewProfile = async (req, res, next) => {
    const email = req.user.email
    try {

        const User = await user.findOne({ where: { email } });
        if (User) {
            res.send(User);
        } else {

             next(
                new GeneralError(
                    "ViewProfile is Not Showing...",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );

        }

    } catch (err) {
        logger.error("err", err)
    }
};


exports.updateProfile = async(req, res, next) => {
    try {

        const email = req.user.email
        const User = await user.findOne({ where: { email: email } });
        if (User) {
            const updateUser = {
                name: req.body.name,
                gender: req.body.gender,
                email: req.body.email,
            }
            if (req.file) {
                updateUser.image = req.file.filename
            }

            const updatedUser = await user.update(updateUser, {
                where: { email: email }
            });

            if (updatedUser) {
                await next(
                    new GeneralResponse(
                        "User Updated...",
                        undefined,
                        config.HTTP_CREATED
                    )
                );
            }

        } else {
            await next(
                new GeneralError(
                    "User not found.....",
                    undefined,
                    config.HTTP_ACCEPTED
                )
            );

        }
    } catch (err) {
        logger.error("err", err);
    }

};

exports.resetPassword = async(req, res, next) => {
    try {

        const email = req.user.email
        const User = await user.findOne({ where: { email } });
        if (User) {
            const compare = await bcrypt.compare(req.body.current_password, User.password);
            if (compare) {
                const updatePassword = { password: await bcrypt.hash(req.body.password, saltRounds) };
                const updateUser = await user.update(updatePassword, { where: { email: email } });
                if (updateUser) {
                    await next(
                        new GeneralResponse(
                            "Your Password has been Reset...",
                            undefined,
                            config.HTTP_CREATED
                        )
                    );
                } else {
                    await next(
                        new GeneralError(
                            "Your Password has not been Reset!",
                            undefined,
                            config.HTTP_ACCEPTED
                        )
                    );
                }
            } else {
                await next(
                    new GeneralError(
                        "Current Password is incorrect!",
                        undefined,
                        config.HTTP_ACCEPTED
                    )
                );
            }
        }

    } catch (err) {
        logger.error("err", err)
    }
};