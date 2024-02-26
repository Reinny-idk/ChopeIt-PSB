import axios from "axios";

export const getUsers = async () => {
    const res = await axios.get('/user').catch((err) => console.log(err));

    if (res.status !== 200) {
        return console.log("Failed to fetch users");
    }

    const data = await res.data;
    console.log(data);
    return data;
};

export const generateStartTimeOptions = (selectedDate = new Date().toISOString().split('T')[0], startTime = "08:00") => {
    // if date is today, check current time and generate <- will start time options be changed too? might need separate options
    //  if 
    // if date is not today, generate all time options
    const now = new Date().toISOString().split('T')[0];
    const isToday = (selectedDate === now);
    // const date = isToday ? new Date() : new Date(selectedDate);
    startTime = isToday ? getCurrentTime(now) : "08:00"; // Start from the current hour if today, else start from 8 AM
    // if date is today, start time from current, else start from 8 <- for start options
    // for end options -> if date is today or not, end time must be greater than start time!!
    return generateOptions(startTime).slice(0, -1);
};

export const generateOptions = (startTime = "08:30") => {
    const options = [];
    const endTime = "22:00";
    const interval = 30

    while (startTime <= endTime) {
        options.push({ label: startTime, value: startTime });
        const [hours, minutes] = startTime.split(":");
        const totalMinutes = parseInt(hours) * 60 + parseInt(minutes) + interval;
        startTime = `${Math.floor(totalMinutes / 60)
        .toString()
        .padStart(2, "0")}:${(totalMinutes % 60).toString().padStart(2, "0")}`;
    }

    return options;
};

export const getCurrentTime = (chosenDate) => {
    const dateParts = chosenDate.split('-');
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // Month is 0-indexed

    const now = new Date();
    
    // Check if the given date is today
    const isToday = date.getDate() === now.getDate() &&
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear();

    if (!isToday) {
        return "08:00";
    }

    const roundedMinutes = Math.ceil(now.getMinutes() / 30) * 30; // Round to the next 30 minutes
    const roundedTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        roundedMinutes
    );

    // Format the time in 24-hour format without AM/PM
    const formattedTime = roundedTime
        .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
        .replace(" ", ""); // Remove the space between the hour and minute

    return formattedTime;
};

export const getNextTimeSlot = (currentTime) => {
    const [hours, minutes] = currentTime.split(":");
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes) + 30;
    const nextHours = Math.floor(totalMinutes / 60);
    const nextMinutes = Math.ceil((totalMinutes % 60) / 30) * 30;
    const nextTime = `${nextHours.toString().padStart(2, "0")}:${nextMinutes.toString().padStart(2, "0")}`;
    return nextTime;
};

// export const isAuthenticated = async (req, res, next) => {
//     try {
//         const res = await axios.get("/auth");
//         if (req.session.user) {
//             res.json({ message: 'Authenticated' });
//         } else {
//             res.json({ message: 'Not authenticated' });
//         }
//         // Assuming your server responds with a success message for authenticated users
//         return res.data.message === "Authenticated";
//     } catch (error) {
//         console.error("Authentication check failed:", error);
//         return false;
//     }
// };

