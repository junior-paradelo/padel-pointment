const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all users
const getUsers = async () => {
    return await prisma.user.findMany();
};

// Get a user by ID
const getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id: Number(id) },
    });
};

// Update a user
const updateUser = async (id, data) => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    return await prisma.user.update({
        where: { id: Number(id) },
        data: data,
    });
};

// Delete a user
const deleteUser = async (id) => {
    return await prisma.user.delete({
        where: { id: Number(id) },
    });
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
