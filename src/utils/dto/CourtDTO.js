class CourtDTO {
    constructor(court) {
        this.id = court.id;
        this.name = court.name;
        this.location = court.location;
    }
}
module.exports = CourtDTO;
