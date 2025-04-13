const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserDTO = require("../utils/dto/UserDTO");
const BookingDTO = require("../utils/dto/BookingDTO");

// Get all users
const getUsers = async () => {
    return await prisma.user.findMany();
};

// Get a user by ID
const getUserById = async (uid) => {
    const user = await prisma.user.findUnique({
        where: { uid: uid },
    });
    const bookings = await prisma.booking.findMany({
        where: { userId: user.id },
    });
    user.bookings = bookings.map((booking) => {
        return new BookingDTO(booking);
    });
    return new UserDTO(user);
};

// Update a user
const updateUser = async (uid, data) => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    return await prisma.user.update({
        where: { uid: uid },
        data: data,
    });
};

// Delete a user
const deleteUser = async (uid) => {
    return await prisma.user.delete({
        where: { uid: uid },
    });
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
