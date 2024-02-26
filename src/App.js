import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import Map from "./components/Map";
import CreateChope from "./components/CreateChope";
import ChopeSeat from "./components/ChopeSeat";
import SignUp from "./components/SignUp";
import Chopes from "./components/Chopes";
import Layout from "./components/Layout";
import Unauthorized from "./components/Unauthorized";
import NotFound from "./components/NotFound";
//import LinkPage from "./components/LinkPage";
import AdminTest from "./components/AdminTest";
import RequireAuth from "./components/RequireAuth";
import Notifications from "./components/Notifications";




function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Check session or authentication token to determine if the user is authenticated
  //   const checkAuthentication = async () => {
  //     try {
  //       // Make a request to the backend to check if the user is authenticated
  //       const response = await axios.get('/auth');
  //       if (response.data.authenticated) {
  //         setAuthenticated(true);
  //       }
  //     } catch (error) {
  //       console.error('Error checking authentication:', error);
  //     }
  //   };

  //   checkAuthentication();
  // });

  return(

      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            
            {/* user routes */}
            
            <Route path="/home" element={<Home />} />
            <Route path="create-chope" element={<CreateChope />} />
            <Route path="choose-seat" element={<ChopeSeat />} />
            <Route path="view-map" element={<Map />} />
            <Route path="view-chopes" element={<Chopes />} />
            <Route path="notis" element={<Notifications />} />

            {/* admin routes */}
            <Route path="admin-test" element={<AdminTest />} />

            {/* catch all */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>


  );
}

export default App;

// <Route path="/" element={<Home/>}/>
// <Route path="/admin" element={<Admin/>}/>

{/* <Route path="/" element={authenticated ? <Navigate to="/home" /> : <Login setAuthenticated={setAuthenticated} />}/>
<Route path="/signup" element={<SignUp />}/> 
<Route path="/login" element={<Login setAuthenticated={setAuthenticated} />}/>
<Route path="/home" element={authenticated ? <Home /> : <Navigate to="/login" />} />
<Route path="/create-chope" element={authenticated ? <CreateChope /> : <Navigate to="/login" />} />
<Route path="/choose-seat" element={authenticated ? <ChopeSeat /> : <Navigate to="/login" />} />
<Route path="/view-map" element={authenticated ? <Map /> : <Navigate to="/login" />} /> */}



{/* <div>
<Header />
<Header authenticated={authenticated} setAuthenticated={setAuthenticated} />
<section>
<Routes>
<Route path="/" element={<Navigate to="/home" />}/>
<Route path="/signup" element={<SignUp />}/>
<Route path="/login" element={<Login setAuthenticated={setAuthenticated} />}/>
<Route path="/home" element={<Home />} />
<Route path="/create-chope" element={<CreateChope />} />
<Route path="/choose-seat" element={<ChopeSeat />} />
<Route path="/view-map" element={<Map />} />
<Route path="/view-chopes" element={<Chopes />} />
</Routes>
</section>
</div> */}

{/*
<Route element={<RequireAuth/>}>
Place these around protected routes
<Route ?> */}