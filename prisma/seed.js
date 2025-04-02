const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();

    const users = [
        {
            name: "Admin User",
            email: "admin@example.com",
            password: "$2a$10$7vVvJeSCjzRYLQNGo3gBhuKpJHw6qj9CjgE.z1emPGOkVS3Qfkr6a", // "password123" hasheado
        },
        {
            name: "John Doe",
            email: "john@example.com",
            password: "$2a$10$7vVvJeSCjzRYLQNGo3gBhuKpJHw6qj9CjgE.z1emPGOkVS3Qfkr6a", // "password123" hasheado
        },
        {
            name: "Jane Smith",
            email: "jane@example.com",
            password: "$2a$10$7vVvJeSCjzRYLQNGo3gBhuKpJHw6qj9CjgE.z1emPGOkVS3Qfkr6a", // "password123" hasheado
        },
    ];

    console.log("Starting to create users...");

    for (const user of users) {
        const createdUser = await prisma.user.create({
            data: user,
        });
        console.log(`User created with ID: ${createdUser.id}, Email: ${createdUser.email}`);
    }

    console.log("Seed completed successfully");
}

main()
    .catch((e) => {
        console.error("Error in the seed process:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
