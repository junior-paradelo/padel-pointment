class BookingDTO {
    constructor(booking) {
        this.id = booking.id;
        this.courtId = booking.courtId;
        this.price = booking.price;
        this.startTime = booking.startTime;
        this.endTime = booking.endTime;
    }
}
module.exports = BookingDTO;
