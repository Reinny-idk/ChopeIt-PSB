import React, { useEffect, useState } from "react";
import axios from "axios";
import ChopeList from "./ChopeList";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";





const Chopes = () => {
    const [chopeData, setChopeData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChopes = async () => {
            try {
                const response = await axios.get("/user/chopes")
                
                if (response.status === 200) {
                    setChopeData(response.data.chope);
                } else {
                    throw new Error("Failed to fetch chopes");
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchChopes();
    }, [chopeData] );

    const handleDeleteChope = async (chopeId) => {
        try {
            console.log("Deleting chope with ID:", chopeId);
            // Add logic to delete the chope with the given ID
            await axios.delete(`/chope/${chopeId}`);
            // Update chopeData state to reflect the deletion
            setChopeData(prevChopeData => prevChopeData.filter(chope => chope._id !== chopeId));
        } catch (error) {
            console.log("Error deleting chope:", error);
        }
    };

    const handleBackToHome = () => {
        navigate('/home');
    };

    return (
        <div style={{ position: 'relative', textAlign: 'left' }}>
            <h1 style={{ position: 'absolute', top: '60px', left: '30px' }}>Chopes</h1>
            <p style={{ position: 'absolute', top: '110px', left: '30px' }}>Select a chope you wish to cancel.</p>
            <div style={{ position: 'absolute', top: '110px' }}>
                <ChopeList chopeData={chopeData} onDelete={handleDeleteChope} />
            </div>
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
        </div>
    );
};

export default Chopes;