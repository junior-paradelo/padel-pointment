const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Clean existing data (in correct order to respect foreign keys)
    await prisma.booking.deleteMany();
    await prisma.court.deleteMany();
    await prisma.user.deleteMany();

    console.log("Database cleared");

    // 1. Create users
    console.log("Creating users...");

    const users = [
        {
            name: "Admin User",
            email: "admin@example.com",
            password: "$2a$10$7vVvJeSCjzRYLQNGo3gBhuKpJHw6qj9CjgE.z1emPGOkVS3Qfkr6a", // hashed "password123"
            role: "ADMIN",
        },
        {
            name: "John Doe",
            email: "john@example.com",
            password: "$2a$10$7vVvJeSCjzRYLQNGo3gBhuKpJHw6qj9CjgE.z1emPGOkVS3Qfkr6a",
            role: "USER",
        },
        {
            name: "Jane Smith",
            email: "jane@example.com",
            password: "$2a$10$7vVvJeSCjzRYLQNGo3gBhuKpJHw6qj9CjgE.z1emPGOkVS3Qfkr6a",
            role: "USER",
        },
    ];

    const createdUsers = [];

    for (const user of users) {
        const createdUser = await prisma.user.create({
            data: user,
        });
        createdUsers.push(createdUser);
        console.log(`User created: ${createdUser.name} (${createdUser.email})`);
    }

    // 2. Create courts
    console.log("\nCreating courts...");

    const courts = [
        {
            name: "Central Court",
            location: "Main Building",
        },
        {
            name: "North Court",
            location: "Outdoor Area",
        },
        {
            name: "South Court",
            location: "Outdoor Area",
        },
        {
            name: "Premium Court",
            location: "VIP Zone",
        },
    ];

    const createdCourts = [];

    for (const court of courts) {
        const createdCourt = await prisma.court.create({
            data: court,
        });
        createdCourts.push(createdCourt);
        console.log(`Court created: ${createdCourt.name} (${createdCourt.location})`);
    }

    // 3. Create bookings
    console.log("\nCreating bookings...");

    // Dates for bookings (using relative dates to ensure they're valid when running)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate() + 2);

    const bookings = [
        {
            userId: createdUsers[1].id, // John Doe
            courtId: createdCourts[0].id, // Central Court
            price: 20.0,
            startTime: new Date(new Date().setHours(10, 0, 0, 0)),
            endTime: new Date(new Date().setHours(11, 30, 0, 0)),
        },
        {
            userId: createdUsers[2].id, // Jane Smith
            courtId: createdCourts[1].id, // North Court
            price: 15.0,
            startTime: new Date(tomorrow.setHours(16, 0, 0, 0)),
            endTime: new Date(tomorrow.setHours(17, 30, 0, 0)),
        },
        {
            userId: createdUsers[1].id, // John Doe
            courtId: createdCourts[2].id, // South Court
            price: 15.0,
            startTime: new Date(nextDay.setHours(18, 0, 0, 0)),
            endTime: new Date(nextDay.setHours(19, 30, 0, 0)),
        },
        {
            userId: createdUsers[2].id, // Jane Smith
            courtId: createdCourts[3].id, // Premium Court
            price: 30.0,
            startTime: new Date(nextDay.setHours(12, 0, 0, 0)),
            endTime: new Date(nextDay.setHours(13, 30, 0, 0)),
        },
        {
            userId: createdUsers[1].id, // John Doe
            courtId: createdCourts[2].id, // South Court
            price: 15.0,
            startTime: new Date(today.setHours(9, 0, 0, 0)),
            endTime: new Date(today.setHours(10, 30, 0, 0)),
        },
        {
            userId: createdUsers[2].id, // Jane Smith
            courtId: createdCourts[2].id, // South Court
            price: 15.0,
            startTime: new Date(today.setHours(10, 30, 0, 0)),
            endTime: new Date(today.setHours(12, 0, 0, 0)),
        },
        {
            userId: createdUsers[1].id, // John Doe
            courtId: createdCourts[2].id, // South Court
            price: 15.0,
            startTime: new Date(today.setHours(12, 0, 0, 0)),
            endTime: new Date(today.setHours(13, 30, 0, 0)),
        },
        {
            userId: createdUsers[2].id, // Jane Smith
            courtId: createdCourts[2].id, // South Court
            price: 15.0,
            startTime: new Date(today.setHours(13, 30, 0, 0)),
            endTime: new Date(today.setHours(15, 0, 0, 0)),
        },
        {
            userId: createdUsers[1].id, // John Doe
            courtId: createdCourts[2].id, // South Court
            price: 15.0,
            startTime: new Date(today.setHours(15, 0, 0, 0)),
            endTime: new Date(today.setHours(16, 30, 0, 0)),
        },
    ];

    for (const booking of bookings) {
        const createdBooking = await prisma.booking.create({
            data: booking,
        });

        console.log(
            `Booking created: User ID ${createdBooking.userId}, Court ID ${
                createdBooking.courtId
            }, Time: ${createdBooking.startTime.toLocaleString()}`
        );
    }

    console.log("\nSeed process completed successfully");
}

main()
    .catch((e) => {
        console.error("Error in the seed process:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
