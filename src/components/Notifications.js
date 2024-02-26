import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Notifications.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetch notis is being called!")
        // Fetch notifications when component mounts
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('/noti');
            console.log(response.data.notifications)
            setNotifications(response.data.notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markNotificationAsRead = async (notificationId) => {
        try {
            await axios.post(`/noti/${notificationId}`);
            setNotifications(prevNotifications =>
                prevNotifications.map(notification =>
                notification._id === notificationId ? { ...notification, read: true } : notification
                )
            );
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const deleteNotification = async (notificationId) => {
        try {
            await axios.delete(`/noti/${notificationId}`);
            setNotifications(prevNotifications =>
                prevNotifications.filter(notification => notification._id !== notificationId)
            );
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    const formatTime = (timeString) => {
        const time = new Date('1000-01-01T' + timeString); // Dummy date
        return time.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true // Format time in 12-hour style
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            weekday: 'long', // Display full weekday name
            day: 'numeric', // Display day of the month
            month: 'long' // Display full month name
        };
        return date.toLocaleDateString('en-US', options);
    };
    

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            timeZone: 'Asia/Singapore',
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        return date.toLocaleString('en-US', options);
    };

    const getAreaString = (area) => {
        switch (area) {
            case 'C':
                return 'Study Zone 1';
            case 'D':
                return 'Study Zone 2';
            case 'E':
                return 'Study Zone 3';
            // Add more cases for other area values if needed
            default:
                return 'Unknown Area';
        }
    };

    const handleBackToHome = () => {
        navigate('/home');
    };

    const handleViewChopes = () => {
        navigate('/view-chopes');
    };

    return (
        <div>
            <h2>Notifications</h2>
            <ul className="notification-list">
                {notifications.slice().reverse().map(notification => (
                    <li key={notification._id} className={`notification ${notification.read ? 'read' : 'unread'}`}>
                        
                        <div className="notification-content">
                            {notification.eventType === 'chope_created' ? (
                                <span>
                                    You created a chope for Seat {notification.seat.seatID}{' '}
                                    in {getAreaString(notification.seat.area)}{' '}
                                    for {formatTime(notification.startTime)} to {formatTime(notification.endTime)} on {formatDate(notification.date)}.
                                </span>
                            ) : notification.eventType === 'chope_deleted' ? (
                                <span>
                                    Your chope for Seat {notification.seat.seatID}{' '}
                                    in {getAreaString(notification.seat.area)}{' '}
                                    from {formatTime(notification.startTime)} to {formatTime(notification.endTime)} on {formatDate(notification.date)} has been deleted.
                                </span>
                            ) : (
                                <span>
                                    Your booking for Seat {notification.seat.seatID} in {getAreaString(notification.seat.area)}{' '}
                                    for {formatTime(notification.startTime)} to {formatTime(notification.endTime)} on {formatDate(notification.date)}{' '}
                                    is starting soon. Please be on time :{')'}
                                </span>
                            )}
                        </div>
                        <div className="timestamp">{formatTimestamp(notification.timestamp)}</div>
                        <div className="notification-actions">
                            <Button onClick={() => deleteNotification(notification._id)}>Delete</Button>
                            {!notification.read && (
                                <Button onClick={() => markNotificationAsRead(notification._id)}>Mark as Read</Button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <Button
                variant="contained"
                color="primary"
                onClick={handleBackToHome}
                style={{ 
                    position: 'fixed', 
                    bottom: '60px', 
                    left: '5%',  
                    width: '220px'
                }}
            >
                Back to Home
            </Button>
            <Button 
                variant="contained"
                color="primary"
                onClick={fetchNotifications}
                style={{ 
                    position: 'fixed', 
                    bottom: '60px',
                    left: '50%',
                    transform: 'translateX(-50%)',  
                    width: '220px' 
                }}
            >
                Refresh Notifications
            </Button>
            <Button 
                variant="contained"
                color="primary"
                onClick={handleViewChopes}
                style={{ 
                    position: 'fixed', 
                    bottom: '60px', 
                    right: '5%', 
                    width: '220px'
                }}
            >
                Manage Chopes
            </Button>
        </div>
    );
};

export default Notifications;
