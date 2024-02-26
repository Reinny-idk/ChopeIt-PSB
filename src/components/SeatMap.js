import React from "react";

// SeatMap component
const SeatMap = ({ seats, selectedSeat, onSeatSelect }) => {
    console.log('SeatMap seats:', seats); 
    return (
        <div className="seat-map">
            {/* Render seats based on coordinates */}
            {seats.map((seat, index) => (
                <div
                    key={index}
                    className={`seat ${seat.available ? 'available' : 'unavailable'} ${selectedSeat === seat._id ? 'selected' : ''}`}
                    style={{ top: seat.y, left: seat.x }}
                    onClick={() => {
                        if (seat.available) {
                            onSeatSelect(seat._id);
                        }
                    }}
                >
                    <span>{seat.seatID}</span>{/*might remove */}
                </div>
            ))}
        </div>
    );
};

export default SeatMap;