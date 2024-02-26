import React, { useState } from "react";
import { Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { Link, useNavigate, useLocation } from 'react-router-dom';
//import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useAuth from "../hooks/useAuth";


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

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const signIn = useSignIn();
    const { setAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; // the previous page, if not, home

    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("/user/login", {
        email: email,
        password: password,
        }, {
            withCredentials: true, // Set credentials option here
        });

        const { jwtToken } = response.data;

        // signIn({
        //     token: jwtToken,
        //     expiresIn: 7200,
        //     tokenType: "Bearer",
        //     authState: { email: email },
        // })

        // setAuthenticated(true);
        console.log("Login successful!");

        //navigate(from, { replace: true });  // brings user to the page they were trying to access before being redirected to login
        navigate("/home");
    } catch (error) {
        console.error("Login failed:", error.message);
    }
};

    return (
        <StyledContainer component="main" maxWidth="xs">
            <BackgroundImage sx={{ m:0, p:0 }} />
            <CssBaseline />
            <StyledForm onSubmit={handleLogin}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <StyledTextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <StyledTextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign In
                </StyledButton>
                <Typography variant="body2" align="center" marginTop={1}>
                    Don't have an account?{" "}
                    <Link component={Link} to="/signup" color="primary">
                        Sign Up
                    </Link>
                </Typography>
            </StyledForm>
        </StyledContainer>
    );
};

export default Login;
