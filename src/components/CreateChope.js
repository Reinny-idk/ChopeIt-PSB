import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { generateOptions, generateStartTimeOptions } from '../api-helpers/api-helpers';
import axios from 'axios';
import '../SeatMap.css';
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/system";

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

const CreateChope = () => {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [area, setArea] = useState('');
    const [startTimeOptions, setStartTimeOptions] = useState(generateStartTimeOptions());
    const [endTimeOptions, setEndTimeOptions] = useState(generateOptions().slice(1));
    const [userAvailable, setUserAvailable] = useState(true);
    const isFormValid = date && startTime && endTime && area;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const today = new Date().toISOString().split('T')[0];
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow = tomorrow.toISOString().split('T')[0];

    // Update the start time options based on the selected date
    useEffect(() => {
        const newTimeOptions = generateStartTimeOptions(date);
        setStartTimeOptions(newTimeOptions);
    }, [date]);

    // Update the end time options based on the selected start time
    useEffect(() => {
        const newTimeOptions = generateOptions(startTime).slice(1);
        setEndTimeOptions(newTimeOptions);
    }, [startTime]);

    // Check if user has an overlapping reservation for the selected date and times
    useEffect(() => {
        const fetchUserAvailable = async () => {
            try {
                const response = await axios.post('/chope/check', {
                    date: date,
                    startTime: startTime,
                    endTime: endTime,
                });

                const isUserAvailable = response.data.userAvailable;
                setUserAvailable(isUserAvailable); 
                
                if (!isUserAvailable) {
                    setErrorMessage('You have an overlapping reservation for this time slot.');
                } else {
                // Clear error message if user is available
                setErrorMessage('');
                }
            } catch (error) {
                console.error(error);
                setErrorMessage('An error occurred while checking availability.');
            }
        };

        fetchUserAvailable();
    }, [date, startTime, endTime]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if all the fields are filled
        if (!isFormValid) {
            console.error('Please fill all the fields.');
            return;
        }

        // Check if user is available
        if (!userAvailable) {
            console.error('Overlapping reservation for chosen time slot.');
            return;
        }

        navigate('/choose-seat', { state: { date, startTime, endTime, area } });
        
        // View submitted details in backend
        console.log('Reservation submitted:', { date, startTime, endTime, area });
    };

    const handleBackToHome = () => {
        navigate('/home');
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '100px' }}>
            <BackgroundImage sx={{ m:0, p:0 }} />
            <Typography variant="h4" gutterBottom>
                Make a Chope!
            </Typography>

            <form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '8px' }}>
                <TextField
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{ min: today, max: tomorrow }}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="start-time-label">
                        Start Time
                    </InputLabel>
                    <Select
                        labelId="start-time-label"
                        id="startTime"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    >
                        {startTimeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel shrink id="end-time-label">
                        End Time
                    </InputLabel>
                    <Select
                        labelId="end-time-label"
                        id="endTime"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    >
                        {endTimeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel shrink id="area-label">
                        Area
                    </InputLabel>
                    <Select
                        labelId="area-label"
                        id="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    >
                    <MenuItem value="C">Study Zone 1</MenuItem>
                    <MenuItem value="D">Study Zone 2</MenuItem>
                    <MenuItem value="E">Study Zone 3</MenuItem>
                    </Select>
                </FormControl>

                <div>
                    {errorMessage !== "" && (
                        <div className="error-message">{errorMessage}</div>
                    )}
                </div>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    disabled={!isFormValid || !userAvailable}
                >
                    Choose Your Seat
                </Button>
            </form>
            <Button
                variant="contained"
                color="primary"
                onClick={handleBackToHome}
                style={{ 
                    position: 'fixed', 
                    bottom: '60px', 
                    left: '10%', 
                    transform: 'translateX(-50%)', 
                    width: '150px' 
                }}
            >
                Back to Home
            </Button>
        </Container>
    );
};

export default CreateChope;
