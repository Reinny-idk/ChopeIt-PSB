// Would i need a map for viewing and another in the booking page?
// or view map option uses this map with default details time=now? tab between sections
// cannot. book seat requires input and view is view only

import axios from "axios";
import { useState, useEffect } from "react";
import { Container, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import SeatMap from "./SeatMap";
import Background from "./Background";
import { getCurrentTime, getNextTimeSlot } from "../api-helpers/api-helpers";
import { useNavigate } from 'react-router-dom'

const Map = () => {
    const [seats, setSeats] = useState([]);
    const [area, setArea] = useState('');
    const navigate = useNavigate();

    const date = new Date().toISOString().split('T')[0];
    const currentTime = getCurrentTime(date);
    const nextSlot = getNextTimeSlot(currentTime);

    useEffect(() => {
        const fetchSeatData = async () => {
            try {
                // Fetch seat data from the backend
                const response = await axios.post('/seat/area', { 
                    area: area,
                    date: date,
                    startTime: currentTime,
                    endTime: nextSlot,
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
    }, [area, date, currentTime] );

    const handleBackToHome = () => {
        navigate('/home');
    };

    let mapTitle;
    if (area === 'C') {
        mapTitle = 'STEM Wing - Study Zone 1';
    } else if (area === 'D') {
        mapTitle = 'STEM Wing - Study Zone 2';
    } else if (area === 'E') {
        mapTitle = 'STEM Wing - Study Zone 3';
    } else {
        mapTitle = '';
    }

    return (
        <Container maxWidth="sm" style={{ marginTop: '120px', backgroundColor: 'transparent' }}>
            <h1>Seat Map</h1>
            
            {/* Display seat map based on the selected area */}
            <Background area={area} />
            <div style={{ pointerEvents: 'none' }}>
                <h2>{mapTitle}</h2>
                {seats.length > 0 ? (
                    <SeatMap seats={seats} />
                ) : (
                    <p>--Select an area below to view--</p>
                )}
            </div>
            <FormControl style={{ 
                    position: 'fixed', 
                    bottom: '60px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    width: '400px' 
                }}>
                <InputLabel>Select Area</InputLabel>
                <Select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                >
                    <MenuItem value="C">Study Zone 1</MenuItem>
                    <MenuItem value="D">Study Zone 2</MenuItem>
                    <MenuItem value="E">Study Zone 3</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={handleBackToHome}
                style={{
                    top: 0,
                    right: 0,
                    marginRight: '10px',
                }}
            >
                Back to Home
            </Button>
        </Container>
    );
};

export default Map;