const z = require("zod");

const bookingSchema = z.object({
    userId: z
        .number({ required_error: "User ID is required" })
        .int()
        .positive({ message: "User ID must be a positive integer" }),
    courtId: z
        .number({ required_error: "Court ID is required" })
        .int()
        .positive({ message: "Court ID must be a positive integer" }),
    price: z
        .number({ required_error: "Price is required" })
        .positive()
        .min(0, { message: "Price must be a positive number" }),
    startTime: z.string().datetime({ message: "Start time must be a valid date" }),
    endTime: z.string().datetime({ message: "End time must be a valid date" }),
});

const bookingUpdateSchema = z.object({
    price: z
        .number({ required_error: "Price is required" })
        .positive()
        .min(0, { message: "Price must be a positive number" })
        .optional(),
    startTime: z.date({ required_error: "Start time is required" }).optional(),
    endTime: z.date({ required_error: "End time is required" }).optional(),
});

const validateUpdateBooking = (data) => {
    const result = bookingUpdateSchema.safeParse(data);
    if (!result.success) {
        throw new Error(result.error.format());
    }
    return result.data;
};

const validateBooking = (data) => {
    const result = bookingSchema.safeParse(data);
    if (!result.success) {
        throw new Error(result.error.format());
    }
    return result.data;
};

module.exports = {
    validateUpdateBooking,
    validateBooking,
};
