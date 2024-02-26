import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { Button, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";

// const StyledContainer = styled(Container)`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 100vh;
//     margin: 0;
//     padding: 0;
//     background: url('/psb_home.png') center/100% auto;
//     background-repeat: no-repeat;
//     background-position: center;
//     background-attachment: fixed;
//     width: 100%;
// `;

// const StyledContainer = styled(Container)`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 100vh;
//     padding: 0;
//     position: relative;
//     width: 100vw;
//     overflow: hidden;
// `;

const StyledBGContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const BackgroundImage = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: url('/psb_home.png');
    background-size: 100% 100%;
    background-position: 0px 75px;
    background-repeat: no-repeat;
    z-index: -1;
`;

const StyledTypography = styled(Typography)`
    && {
        color: #fff; /* White color for text */
        background-color: rgba(0, 0, 0, 0.8); /* Light brown background color */
        padding: 20px; /* Add padding for better readability */
        text-align: center; /* Center the text */
        justify-content: center; /* Center the text horizontally */
        padding-top: 10px; /* Adjust the padding at the top */
        margin-bottom: 10px;
    }
`;

const NotificationsButton = styled(Button)(
    ({ theme }) => ({
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '-3px',
            right: '-3px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#ff0000', // Red color for the dot
            visibility: 'hidden',
        },
        '&.unread::after': {
            visibility: 'visible',
        },
    }),
);


const Home = () => {
//     const [authenticated, setAuthenticated] = useState(false);

//     useEffect(() => {
//     const checkAuthentication = async () => {
//         try {
//             const response = await axios.get("/auth");
//             console.log("check auth:" + response);
//             if (response.data.authenticated) {
//                 setAuthenticated(true);
//                 //setUserInfo(response.data.user);
//             } else {
//                 setAuthenticated(false);
//             }
//         } catch (error) {
//             console.error("Authentication check failed:", error.message);
//             setAuthenticated(false);
//         }
//     };

//     checkAuthentication();
//     }, []);

//     if (authenticated) {
//         return (
//             <div>
//             <h1>Welcome to the Home Page!</h1>
//             {/* Include the content of your home page here */}
//             </div>
//         );
//     } else {
//         // Redirect to the login page if not authenticated
//         return <Navigate to="/login" />;
//     }
// };

    // State to store unread notification count
    const [unreadNotifications, setUnreadNotifications] = useState(0);

    // Fetch notifications when component mounts
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/noti');
                // Calculate unread notifications count from response data
                const unreadCount = response.data.notifications.filter(notification => !notification.read).length;
                setUnreadNotifications(unreadCount);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get("/user/logout");
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    }

    return (
        <StyledBGContainer component="main" maxWidth="xs">
            <BackgroundImage sx={{ m:0, p:0 }} />
            <Typography variant="h4" sx={{ 
                textAlign: 'center', 
                color: '#fff', // White text color
                textShadow: '2px 2px 4px #000', // Black text outline
                width: '800px', // Adjust as needed to fit the text
                marginBottom: '50px', // Adjust as needed to move the text higher up
            }}>
                Welcome to ChopeIt PSB!<br />
            </Typography>
            <StyledTypography variant="h5" gutterBottom sx={{ width: '800px' }}>
                The word 'chope' is Singapore slang meaning 'to reserve a place to sit.'<br />
                This is a one stop application to handle all your PSB choping needs.<br />
                Choose one of the options below to get started!
            </StyledTypography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/create-chope"
                sx={{ mt: 3, width: '200px' }}
            >
                Create Chope
            </Button>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/view-chopes"
                sx={{ mt: 3, width: '200px' }}
            >
                Manage Chopes
            </Button>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/view-map"
                sx={{ mt: 3, width: '200px' }}
            >
                View Map
            </Button>
            <NotificationsButton
                variant="contained"
                color="primary"
                component={Link}
                to="/notis"
                className={unreadNotifications > 0 ? 'unread' : ''}
                sx={{ mt: 3, width: '200px', position: 'relative' }}
            >
                Notifications
            </NotificationsButton>
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                sx={{ mt: 3, width: '200px' }}
            >
                Log Out
            </Button>
        </StyledBGContainer>
    );
};
export default Home;
