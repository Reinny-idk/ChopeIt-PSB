import React, { useState, useEffect } from 'react';
import { styled } from "@mui/system";
import { Button, Container, TextField, Snackbar, Typography } from "@mui/material";
import axios from 'axios';
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container)`
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

const StyledForm = styled("form")`
    width: 100%;
    max-width: 400px;
    margin-top: ${({ theme }) => theme.spacing(8)};
    background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
    padding: ${({ theme }) => theme.spacing(3)}; /* Add padding for better readability */
    border-radius: ${({ theme }) => theme.spacing(1)}; /* Add border radius for rounded corners */
    backdrop-filter: blur(5px); /* Apply blur effect for a frosted glass effect (optional) */
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2); /* Add box shadow for depth */
`;

const StyledTextField = styled(TextField)`
    margin-top: ${({ theme }) => theme.spacing(2)};
`;

const StyledButton = styled(Button)`
    margin-top: ${({ theme }) => theme.spacing(3)};
`;


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    }, [password, confirmPassword]);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordsMatch) {
            console.log("Passwords don't match!");
            return;
        }

        try {
            const response = await axios.post('/user/signup', {
                name: name,
                email: email + '@psba.edu.sg',
                password: password,
            });

            if (response.status === 201) {
                setOpen(true);
                
                setTimeout(() => {
                    // Redirect to login page after 3 seconds
                    window.location.href = '/login';
                }, 3000);
            }
        } catch (error) {
            console.error('Error creating account:', error);
            // Handle error, display error message to user, etc.
        }
    };

    return (
        <StyledContainer>
            <BackgroundImage sx={{ m:0, p:0 }} />
            <StyledForm onSubmit={handleSubmit}>
                <StyledTextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />
                <StyledTextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="studentemail"
                    label="Student Email Address"
                    name="studentemail"
                    defaultValue=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        endAdornment: <span>@psba.edu.sg</span>,
                    }}
                />
                <StyledTextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    error={!!passwordError}
                    helperText={passwordError}
                />
                <StyledTextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!passwordsMatch}
                    helperText={!passwordsMatch && "Passwords don't match"}
                />
                <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign Up
                </StyledButton>
                <Typography variant="body2" align="center" marginTop={1}>
                    Already have an account?{" "}
                    <Link component={Link} to="/login" color="primary">
                        Log In
                    </Link>
                </Typography>
            </StyledForm>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={"Account created successfully! You will be redirected to the login page in 3 seconds."}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                //sx={{ backgroundColor: 'white' }}
            />
        </StyledContainer>
    );
};

export default SignUp;
