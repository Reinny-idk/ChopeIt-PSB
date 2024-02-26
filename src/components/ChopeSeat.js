import React, { useEffect } from 'react';
import { Container, Button, Snackbar } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import SeatMap from './SeatMap';
import { useLocation, useNavigate } from 'react-router-dom';
import Background from './Background';

// Component for the seat map display and seat selection
const ChopeSeat = () => {
    const location = useLocation();
    const { area, date, startTime, endTime } = location.state;
    // State for seat data and selected seat
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSeatData = async () => {
            try {
                // Fetch seat data from the backend
                const response = await axios.post('/seat/area', { 
                    area: area,
                    date: date,
                    startTime: startTime,
                    endTime: endTime,
                });

                // Check if the response is successful (status code 2xx)
                if (response.status >= 200 && response.status < 300) {
                    // Update the seats state with the data from the response
                    setSeats(response.data.seats);
                } else {
                    throw new Error('Failed to fetch seats by area');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSeatData();
    });


    const handleSeatSelect = (seatId) => {
        setSelectedSeat(seatId);
    };

    const handleReservationSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/chope', {
                seatID: selectedSeat,
                date: date,
                startTime: startTime,
                endTime: endTime,
            });

            if (response.status >= 200 && response.status < 300) {
                console.log('Reservation submitted successfully.');
                setOpen(true);
                
                setTimeout(() => {
                    // Redirect to chopes page after 3 seconds
                    navigate('/view-chopes');
                }, 3000);
            } else {
                console.error('Failed to submit reservation.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    let mapTitle;
    if (area === 'C') {
        mapTitle = 'STEM Wing - Study Zone 1';
    } else if (area === 'D') {
        mapTitle = 'STEM Wing - Study Zone 2';
    } else {
        mapTitle = 'STEM Wing - Study Zone 3';
    }

    return (
        <Container maxWidth="sm" style={{ marginTop: '120px', backgroundColor: 'transparent' }}>
            <h1>Seat Map</h1>
            {/* Seat selection map */}
            <Background area={area} />
            <div>
                <h2>{mapTitle}</h2>
                {seats.length > 0 ? (
                <SeatMap seats={seats} selectedSeat={selectedSeat} onSeatSelect={handleSeatSelect} />
                ) : (
                <p>Loading seat data...</p>
                )}
            </div>
            <Button
                onClick={() => navigate(-1)} // Go back one page
                variant="contained"
                color="primary"
                style={{ marginRight: '10px' }}
            >
                &lt; Change Chope Details
            </Button>
            <Button
                onClick={handleReservationSubmit}
                variant="contained"
                color="primary"
                disabled={!selectedSeat}
                style={{ 
                    position: 'fixed', 
                    bottom: '60px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    width: '400px' 
                }}
            >
                Chope it!
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={"Your seat has been choped! You will be redirected to the chopes page in 3 seconds."}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </Container>
    );
};

export default ChopeSeat;