import React, { useState } from 'react';
import '../ChopeList.css';
import { Button } from '@mui/material';


const ChopeList = ({ chopeData, onDelete }) => {
    const [selectedChope, setSelectedChope] = useState(null);

    const handleCardClick = (chopeId) => {
        setSelectedChope(chopeId === selectedChope ? null : chopeId);
    };

    const handleDeleteClick = () => {
        onDelete(selectedChope);
        setSelectedChope(null);
    };

    const getAreaString = (area) => {
        switch (area) {
            case 'C':
                return 'STEM Wing - Study Zone 1';
            case 'D':
                return 'STEM Wing - Study Zone 2';
            case 'E':
                return 'STEM Wing - Study Zone 3';
            // Add more cases for other area values if needed
            default:
                return 'Unknown Area';
        }
    };
    
    return (
        <div className="chope-container">
        {chopeData.map(chope => (
            <div
                key={chope._id} 
                className={`chope-card ${chope._id === selectedChope ? "selected" : ""}`}
                onClick={() => handleCardClick(chope._id)}
            >
                <div className="chope-info">
                    <p><strong>Date:</strong> {chope.date}</p>
                    <p><strong>Duration:</strong> {chope.startTime} - {chope.endTime}</p>
                    <p><strong>Seat ID:</strong> {chope.seat.seatID}</p>
                    <p><strong>Area:</strong> {getAreaString(chope.seat.area)}</p>
                </div>
            </div>
        ))}
        {selectedChope && (
            <Button 
                className="delete-button" 
                onClick={handleDeleteClick} 
                variant="contained"
                color="primary"
                style={{ 
                    position: 'fixed', 
                    bottom: '60px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    width: '400px' 
                }}
            >
                Cancel Selected Chope
            </Button>
        )}
        </div>
    );
};

export default ChopeList;