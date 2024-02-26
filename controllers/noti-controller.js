import Notification from "../models/Notification.js";
import Chope from "../models/Chope.js";


export const getNotifications = async (req, res) => {
    try {
        const userId = req.session.user.userID; // Assuming user ID is stored in the session
        const notifications = await Notification.find({ user: userId }).populate("seat");
        return res.status(200).json({ notifications });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
    try {
        const notificationID = req.params.id;
        await Notification.findByIdAndDelete(notificationID);
        return res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
    try {
        const notificationID = req.params.id;
        const updatedNotification = await Notification.findByIdAndUpdate(
            notificationID,
            { $set: { read: true } },
            { new: true }
        );
        return res.status(200).json({ updatedNotification });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const createReminder = async () => {
    try {
        // Get the current time
        const currentTime = new Date();

        // Add 30 minutes to the current time
        const after30mins = new Date(currentTime.getTime() + 30 * 60000); // 30 minutes in milliseconds

        // Format the result in "hh:mm" format
        function formatTime(time) {
            const options = {
                timeZone: 'Asia/Singapore',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            };
            return time.toLocaleTimeString('en-US', options);
        }
    
        const upcomingChopes = await Chope.find({ startTime: { $gte: formatTime(currentTime), $lte: formatTime(after30mins) } });

        // Create and save reminder notifications for each reservation
        for (const chope of upcomingChopes) {
            // Create a new reminder notification
            const reminderNotification = new Notification({
                eventType: 'chope_remind',
                user: chope.user,
                seat: chope.seat,
                date: chope.date,
                startTime: chope.startTime,
                endTime: chope.endTime,
            });

            // Save the reminder notification to the database
            await reminderNotification.save();
        }
    } catch (error) {
        console.error('Error occurred while creating reminder notifications:', error);
    }
};


