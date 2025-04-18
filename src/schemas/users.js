const z = require("zod");

const userLoginSchema = z.object({
    email: z
        .string({
            required_error: "email is required",
            invalid_type_error: "email must be a string",
        })
        .email(),
    password: z.string({
        required_error: "password is required",
        invalid_type_error: "password must be a string",
    }),
});

const userRegisterSchema = z.object({
    email: z
        .string({
            required_error: "email is required",
            invalid_type_error: "email must be a string",
        })
        .email(),
    password: z.string({
        required_error: "password is required",
        invalid_type_error: "password must be a string",
    }),
    name: z.string({
        required_error: "name is required",
        invalid_type_error: "name must be a string",
    }),
});

function validateUserLogin(user) {
    const result = userLoginSchema.safeParse(user);
    if (!result.success) {
        throw new Error(result.error.errors[0].message);
    }
    return result.data;
}

function validateUserRegister(user) {
    const result = userRegisterSchema.safeParse(user);
    if (!result.success) {
        throw new Error(result.error.errors[0].message);
    }
    return result.data;
}

module.exports = {
    validateUserLogin,
    validateUserRegister,
};
