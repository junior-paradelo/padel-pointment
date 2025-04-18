const z = require("zod");

const courtSchema = z.object({
    name: z
        .string({
            required_error: "name is required",
            invalid_type_error: "name must be a string",
        })
        .min(1, { message: "Name cannot be empty" })
        .optional(),
    location: z
        .string({
            required_error: "location is required",
            invalid_type_error: "location must be a string",
        })
        .min(1, { message: "Location cannot be empty" })
        .optional(),
});

function validateCourt(court) {
    const result = courtSchema.safeParse(court);
    if (!result.success) {
        throw new Error(result.error.errors[0].message);
    }
    return result.data;
}

module.exports = {
    validateCourt,
};
