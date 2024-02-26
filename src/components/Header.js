import React, { useEffect, useState } from "react";
import {AppBar, Autocomplete, Box, Tab, Tabs, TextField, Toolbar, Typography} from '@mui/material';
import ApprovalIcon from '@mui/icons-material/Approval';
import { getUsers } from "../api-helpers/api-helpers";
import { Link } from "react-router-dom";

const Header = ({loggedIn}) => {
    const [value, setValue] = useState(0)
    // const [users, setUsers] = useState([])
    // useEffect(() => {
    //     getUsers()
    //     .then((data) => setUsers(data.name))
    //     .catch((err) => console.log(err));
    // }, []);
    return (
        <AppBar sx = {{bgcolor: "#2c387e"}}>
            <Toolbar>
                <Box padding="20px" width="250px" display="flex" alignItems="center">
                    <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box display="inline-block" marginRight={1}>
                            <ApprovalIcon fontSize="large" style={{ verticalAlign: 'middle'}} />
                        </Box>
                        <Typography variant="h5" style={{ display: 'inline-block', verticalAlign: 'middle', color: 'inherit' }}>ChopeIt PSB</Typography>
                    </Link>
                </Box>
                {/* Empty space to push the tabs to the right */}
                <Box width="65%" />
                {loggedIn && (<Box display = {"flex"}>
                    <Tabs 
                    textColor = "inherit" 
                    indicatorColor = "secondary" 
                    value = {value} 
                    onChange={(e, val) => setValue(val)}
                    >
                        <Tab LinkComponent={Link} to="/admin" label="Admin"/>
                        <Tab LinkComponent={Link} to="/profile" label="Profile"/>
                    </Tabs>
                </Box>)}
            </Toolbar>
        </AppBar>
    );
};

export default Header;

{/*
<Box width = {'30%'} margin = {"auto"}>
                {Array.isArray(users) && (
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={users.map((user) => user.name)}
                        sx={{ width: 300 }}
                        renderInput={(params) => 
                        <TextField 
                            sx={{input: { color: "white"}}}
                            {...params} 
                            label="Study areas" 
                        />}
                    />
                )}
            </Box>
*/}