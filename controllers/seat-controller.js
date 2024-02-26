import Seat from "../models/Seat.js";

export const addSeat = async (req, res, next) => {
    const {seatID, area, x, y} = req.body;
    let seat;

    try {
        seat = new Seat({seatID, area, x, y});
        seat = await seat.save();
    } catch (error) {
        return console.log(error);
    }

    return res.status(201).json({seat});
};

export const getAllSeats = async (req, res, next) => {    // should accept a time (and area?)
    let seats;

    try {
        seats = await Seat.find();
    } catch (error) {
        return console.log(error);
    }

    if (!seats) {
        return res.status(500).json({message: "Error occurred in the server."});
    }

    // for (const seat of seats) {
    //     checkSeatAvailability(seat._id, date, startTime, endTime);
    // };

    return res.status(200).json({seats});
};

export const getSeatsByArea = async (req, res) => {
    const {area, date, startTime, endTime} = req.body;
    let seats;

    try {
        seats = await Seat.find({ area: area });
    } catch (error) {
        return console.log(error);
    }

    if (!seats) {
        return res.status(500).json({message: "Error occurred in the server."});
    }

    // Array to hold promises for seat availability checks
    const availabilityChecks = [];

    // Iterate through seats and add availability check promises to the array
    for (const seat of seats) {
        const availabilityCheckPromise = checkSeatAvailability(seat._id, date, startTime, endTime);
        availabilityChecks.push(availabilityCheckPromise);
    }

    try {
        // Wait for all availability checks to complete
        const availabilityResults = await Promise.all(availabilityChecks);

        // Update seat availability based on the results
        availabilityResults.forEach((availabilityResult, index) => {
            seats[index].available = availabilityResult;
        });

        // await seats.save();

        return res.status(200).json({seats});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error occurred while checking seat availability." });
    }
};

export const checkSeatAvailability = async ( seatID, date, startTime, endTime ) => {
    try {
        const seat = await Seat.findById(seatID).populate('chope');

        if (!seat) {
            throw new Error('No seats found in the specified area');
        }

        const requestedStartTime = new Date(`${date}T${startTime}`);
        const requestedEndTime = new Date(`${date}T${endTime}`);

        let isAvailable = true;

        // Iterate through reservations and check for overlapping time slots on the same date
        for (const reservation of seat.chope) {
            if (reservation.date === date) {
                const reservationStartTime = new Date(`${date}T${reservation.startTime}`);
                const reservationEndTime = new Date(`${date}T${reservation.endTime}`);

                if (
                    (requestedStartTime >= reservationStartTime && requestedStartTime < reservationEndTime) ||
                    (requestedEndTime > reservationStartTime && requestedEndTime <= reservationEndTime) ||
                    (requestedStartTime <= reservationStartTime && requestedEndTime >= reservationEndTime)
                ) {
                    isAvailable = false; // Seat is not available for the specified date and time
                    break;
                }
            }
        }

        // Update the available field in the seat instance
        // seat.available = isAvailable;
        // await seat.save();

        // return true;
        return isAvailable;
    } catch (error) {
        console.error(error);
        throw new Error('Error occurred while updating seat availability');
    }
};

export const positionSeat = async (req, res, next) => {
    const seatID = req.params.id;
    const {x, y} = req.body;

    try {
        const seat = await Seat.findById(seatID);

        seat.x = x;
        seat.y = y;
        await seat.save();

        return res.status(200).json({seat});
    } catch (error) {
        return console.log(error);
    }
};

