import mongoose from "mongoose";
import Chope from "../models/Chope.js";
import Seat from "../models/Seat.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

// Function to create chope
export const createChope = async (req, res, next) => {
    const {seatID, date, startTime, endTime} = req.body;
    const userID = req.session.user.userID;

    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    let newChope;

    try {
        // Create a reservation with user ID
        newChope = new Chope({
        seat: seatID,
        user: userID,
        date: date,
        startTime: startTime,
        endTime: endTime,
        });
        
        // Save the reservation to the database
        await newChope.save({ session });

        // Update the user's reservations
        const updatedUser = await User.findByIdAndUpdate(userID, { $push: { chopes: newChope._id } }, { session });

        if (!updatedUser) {
            throw new Error('Failed to update user');
        }
        // console.log(updatedUser);
        const updatedSeat = await Seat.findByIdAndUpdate(seatID, { $push: { chope: newChope._id } }, { new: true, session });

        if (!updatedSeat) {
            throw new Error('Failed to update seat');
        }
        // console.log(updatedSeat);

        // Create a notification for the user
        const notification = new Notification({
            eventType: 'chope_created',
            user: userID,
            seat: seatID,
            date: date,
            startTime: startTime,
            endTime: endTime,
        });

        // Save the notification to the database
        await notification.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

    } catch (error) {
        // Rollback the transaction in case of an error
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

    if (!newChope) {
        return res.status(500).json({message:"Error occurred during the reservation."});
    }
    
    return res.status(201).json({ message: 'Seat reserved successfully', newChope });
};

// Function for HTTP get by ID
export const getChopeByID = async (req, res, next) => {
    const chopeID = req.params.id;

    let chope;
    
    try {
        chope = await Chope.findById(chopeID);
    } catch (error) {
        return console.log(error);
    }

    if (!chope) {
        return res.status(500).json({message:"Error occurred while searching."});
    }

    return res.status(200).json({chope});
};

// Function for HTTP get all reservations
export const getAllChopes = async (req, res) => {
    let allChopes;
    try {
        allChopes = await Chope.find();
    } catch (error) {
        console.error(error);
    }

    if (!allChopes) {
        res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({allChopes});
};

// Function for HTTP delete
export const deleteChopeByID = async (req, res) => {
    const { id } = req.params;
    console.log("deleteByID got this ID:", id);
    try {
        const response = await deleteChope(id);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to delete chope' });
    }
}

// Function to delete a chope
export const deleteChope = async (chopeID) => {
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Find the reservation to delete
        const chope = await Chope.findById(chopeID).session(session);

        if (!chope) {
            throw new Error('Chope not found');
        }

        // Create a notification for the user
        const notification = new Notification({
            eventType: 'chope_deleted',
            user: chope.user,
            seat: chope.seat,
            date: chope.date,
            startTime: chope.startTime,
            endTime: chope.endTime,
        });

        // Save the notification to the database
        await notification.save({ session });

        // Remove the reservation reference from the related seat document
        await Seat.findByIdAndUpdate(chope.seat, { $pull: { chope: chopeID } }, { session });

        // Remove the reservation reference from the related user document
        await User.findByIdAndUpdate(chope.user, { $pull: { chopes: chopeID } }, { session });

        // Delete the reservation
        await chope.deleteOne({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        console.log('Chope deleted successfully', chope);
        return { message: 'Chope deleted successfully' };
    } catch (error) {
        // Rollback the transaction in case of an error
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// async function checkAvailability(seatID, startTime, endTime) {
//     // Check if there is any reservation for the seat that overlaps with the requested time range
//     const existingChope = await Chope.findOne({
//         seatID,
//         $or: [{
//             $and: [
//                 { startTime: { $lt: new Date(endTime) } },
//                 { endTime: { $gt: new Date(startTime) } },
//             ],
//         },
//         {
//             $and: [
//                 { startTime: { $lt: new Date(startTime) } },
//                 { endTime: { $gt: new Date(endTime) } },
//             ],
//         },],
//     });

//     return !existingChope;
// };

// Function to check if a user has an overlapping reservation
export const checkUserChopes = async (req, res, next) => {
    const {date, startTime, endTime} = req.body;
    const userID = req.session.user.userID;
    
    try {
        let user = await User.findById(userID).populate('chopes');
        let chopes = user.chopes;

        const requestedStartTime = new Date(`${date}T${startTime}`);
        const requestedEndTime = new Date(`${date}T${endTime}`);

        let isAvailable = true;

        // Iterate through chopes and check for overlapping time slots on the same date
        for (const chope of chopes) {
            if (chope.date === date) {
                const chopeStartTime = new Date(`${date}T${chope.startTime}`);
                const chopeEndTime = new Date(`${date}T${chope.endTime}`);

                if (
                    (requestedStartTime >= chopeStartTime && requestedStartTime < chopeEndTime) ||
                    (requestedEndTime > chopeStartTime && requestedEndTime <= chopeEndTime) ||
                    (requestedStartTime <= chopeStartTime && requestedEndTime >= chopeEndTime)
                ) {
                    isAvailable = false; // User has a chope for the specified date and time
                    break;
                }
            }
        }
        
        return res.status(200).json({ userAvailable: isAvailable });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error occurred while checking user chopes' });
    }
};

// Scheduled function to delete expired chopes
export const cleanupChopes = async () => {
    try {
        const currentDate = new Date();
        const expiredChopes = await Chope.find({
            $or: [
                { date: { $lt: currentDate.toISOString().split('T')[0] } }, // Check if date is older than today
                { $and: [ // Check if endTime has passed today
                    { date: currentDate.toISOString().split('T')[0] }, // Same date as today
                    { endTime: { $lt: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) } } // End time is less than current time
                ]}
            ]
        });
    
        // Delete expired reservations
        for (const chope of expiredChopes) {
            await deleteChope(chope._id);
        }

        console.log('Expired chopes have been deleted successfully.');
    } catch (error) {
    console.error('Error deleting expired reservations:', error);
    }
};