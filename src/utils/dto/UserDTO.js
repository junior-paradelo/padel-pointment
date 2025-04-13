class UserDTO {
    constructor(user) {
        this.uid = user.uid;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
        this.bookings = user.bookings;
    }
}
module.exports = UserDTO;
