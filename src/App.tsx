import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import Home from "./pages/Home.tsx";
import AcceptedBookings from "./pages/AcceptedBookings.tsx";
import AddBooking from "./pages/AddBooking.tsx";
import Requests from "./pages/Requests.tsx";
import RestaurantInfo from "./pages/RestaurantInfo.tsx";
import Statistics from "./pages/Statistics.tsx";
import AddUser from "./pages/AddUser.tsx";
import {useEffect} from "react";
import RoleRequired from "./components/RoleRequired.tsx";
import Restaurants from "./pages/Restaurants.tsx";
import {Roles} from "./utils/enums.ts";

function App() {
    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
    }, [navigate]);


  return (
    <Routes>
        <Route path="/login" element={<Auth/>}/>
        <Route path="/" element={<Home/>}>
            <Route element={<RoleRequired roles={[Roles.Admin, Roles.Staff]}/>}>
                <Route path="/" element={<AcceptedBookings/>}/>
                <Route path="/add-booking" element={<AddBooking/>}/>
                <Route path="/requests" element={<Requests/>}/>
            </Route>
            <Route element={<RoleRequired roles={[Roles.Admin]}/>}>
                <Route path="/info" element={<RestaurantInfo/>}/>
                <Route path="/stats" element={<Statistics/>}/>
            </Route>
            <Route element={<RoleRequired roles={[Roles.Admin, Roles.SuperAdmin]}/>}>
                <Route path="/add-user" element={<AddUser/>}/>
            </Route>
            <Route element={<RoleRequired roles={[Roles.SuperAdmin]}/>}>
                <Route path='/restaurants' element={<Restaurants/>}/>
            </Route>
        </Route>
    </Routes>
  )
}

export default App
