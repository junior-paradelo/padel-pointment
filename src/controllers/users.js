const { getUsers, getUserById, updateUser, deleteUser } = require("../services/users");
const { validateUser } = require("../schemas/users");

/**
 * Controller function to retrieve all users.
 *
 * @async
 * @function getUsersController
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} JSON response with users array or error message
 * @throws {object} 500 error if there's an issue retrieving users
 */
const getUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Controller function to retrieve a user by ID.
 *
 * @async
 * @function getUserByIdController
 * @param {object} req - Express request object with user ID in params
 * @param {object} res - Express response object
 * @returns {object} JSON response with user object or error message
 * @throws {object} 404 error if user is not found
 * @throws {object} 500 error if there's an issue retrieving the user
 */
const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Controller function to update an existing user.
 *
 * @async
 * @function updateUserController
 * @param {object} req - Express request object with user ID in params and update data in body
 * @param {object} res - Express response object
 * @returns {object} JSON response with updated user or error message
 * @throws {object} 404 error if user is not found
 * @throws {object} 500 error if there's an issue updating the user
 */
const updateUserController = async (req, res) => {
    try {
        const uid = req.params.id;
        const userData = validateUser(req.body);
        const updatedUser = await updateUser(uid, userData);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Controller function to delete a user.
 *
 * @async
 * @function deleteUserController
 * @param {object} req - Express request object with user ID in params
 * @param {object} res - Express response object
 * @returns {object} JSON response with success message or error message
 * @throws {object} 404 error if user is not found
 * @throws {object} 500 error if there's an issue deleting the user
 */
const deleteUserController = async (req, res) => {
    try {
        const uid = req.params.id;
        const deleted = await deleteUser(uid);
        if (!deleted) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsers: getUsersController,
    getUserById: getUserByIdController,
    updateUser: updateUserController,
    deleteUser: deleteUserController,
};
