import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    password: Joi.string()
        .min(8)
        .required()
        .pattern(/(?=.*[A-Z])/, 'uppercase')
        .pattern(/(?=.*[a-z])/, 'lowercase')
        .pattern(/(?=.*\d)/, 'number')
        .pattern(/(?=.*[@$!%*?&])/, 'special character')
        .messages({
            "string.min": "Password must be at least 8 characters",
            "string.pattern.uppercase": "Password must contain at least one uppercase letter",
            "string.pattern.lowercase": "Password must contain at least one lowercase letter",
            "string.pattern.number": "Password must contain at least one number",
            "string.pattern.special": "Password must contain at least one special character",
            "any.required": "Password is required",
        }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
        "any.required": "Password is required",
    }),
});

export const updateUserProfileSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    name: Joi.string().required().messages({
        "any.required": "Name is required",
    }),
});

export const updateUserPasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string()
        .min(8)
        .required()
        .pattern(/(?=.*[A-Z])/, 'uppercase')
        .pattern(/(?=.*[a-z])/, 'lowercase')
        .pattern(/(?=.*\d)/, 'number')
        .pattern(/(?=.*[@$!%*?&])/, 'special character')
        .messages({
            "string.min": "Password must be at least 8 characters",
            "string.pattern.uppercase": "Password must contain at least one uppercase letter",
            "string.pattern.lowercase": "Password must contain at least one lowercase letter",
            "string.pattern.number": "Password must contain at least one number",
            "string.pattern.special": "Password must contain at least one special character",
            "any.required": "Password is required",
        }),
});


export const updateUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    name: Joi.string().required().messages({
        "any.required": "Name is required",
    }),
    password: Joi.string()
        .min(8)
        .optional()
        .pattern(/(?=.*[A-Z])/, 'uppercase')
        .pattern(/(?=.*[a-z])/, 'lowercase')
        .pattern(/(?=.*\d)/, 'number')
        .pattern(/(?=.*[@$!%*?&])/, 'special character')
        .messages({
            "string.min": "Password must be at least 8 characters",
            "string.pattern.uppercase": "Password must contain at least one uppercase letter",
            "string.pattern.lowercase": "Password must contain at least one lowercase letter",
            "string.pattern.number": "Password must contain at least one number",
            "string.pattern.special": "Password must contain at least one special character",
            "any.required": "Password is required",
        }),
    role: Joi.string().valid('user', 'admin').required(),
    isActive: Joi.boolean().required(),
});