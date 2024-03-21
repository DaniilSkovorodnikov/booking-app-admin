import './App.css'
import {Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import Home from "./pages/Home.tsx";
import AcceptedBookings from "./pages/AcceptedBookings.tsx";
import AddBooking from "./pages/AddBooking.tsx";
import Requests from "./pages/Requests.tsx";
import RestaurantInfo from "./pages/RestaurantInfo.tsx";
import Statistics from "./pages/Statistics.tsx";
import AddUser from "./pages/AddUser.tsx";

function App() {

  return (
    <Routes>
        <Route path="/login" element={<Auth/>}/>
        <Route path="/registration" element={<Auth isRegistration={true}/>}/>
        <Route path="/" element={<Home/>}>
            <Route path="/" element={<AcceptedBookings/>}/>
            <Route path="/add-booking" element={<AddBooking/>}/>
            <Route path="/requests" element={<Requests/>}/>
            <Route path="/info" element={<RestaurantInfo/>}/>
            <Route path="/add-user" element={<AddUser/>}/>
            <Route path="/stats" element={<Statistics/>}/>
        </Route>
    </Routes>
  )
}

export default App
