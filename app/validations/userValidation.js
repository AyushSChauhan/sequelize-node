const Joi = require('@hapi/joi')


module.exports = {

    registration: Joi.object({
        name: Joi.string().required().empty().messages({
            "string.base": `name should be a type of 'text'`,
            "string.empty": `name cannot be an empty field`,
            "any.required": `name is a required field`,
        }),

        gender: Joi.string().required().empty().messages({
            "string.base": `gender  should be a type of string`,
            "string.empty": `gender cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `gender is a required field`,
        }),

        email: Joi.string().required().empty().email().messages({
            "string.base": `email should be a type of string`,
            "string.empty": `email cannot be an empty field`,
            "any.required": `email is a required field`,
        }),

        password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of string`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
    }),

    login: Joi.object({
        email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of string`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),

        password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of string`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
    }),

    updateProfile: Joi.object({
        name: Joi.string().required().empty().messages({
            "string.base": `name should be a type of 'text'`,
            "string.empty": `name cannot be an empty field`,
            "any.required": `name is a required field`,
        }),

        gender: Joi.string().required().empty().messages({
            "string.base": `gender should be selected`,
            "string.empty": `gender cannot be an empty field`,
            "any.required": `gender is a required field`,
        }),
        email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        })
    }),

    resetPassword: Joi.object({
        current_password: Joi.string().empty().required().messages({
            "string.base": ` currentPassword should be a type of 'text'`,
            "string.empty": ` currentPassword cannot be an empty field`,
            "any.required": ` currentPassword is a required field`,
        }),
        password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        confirm_password: Joi.string().required().valid(Joi.ref('password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        })
    })
}