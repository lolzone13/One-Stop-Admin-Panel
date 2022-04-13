import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Contacts from "./components/Contacts.js";
import FoodItems from "./components/FoodItems.js";
import Foodoutlet from "./components/Foodoutlet.js";
import MessMenu from "./components/MessMenu.js";
import Role from "./components/Role.js";
import User from "./components/User.js";
import BusTimings from "./components/BusTimings.js";
import FerryTimings from "./components/FerryTimings.js";
import SideNav from './components/SideNav';
import './App.css';


function App() {
  return (
    <>
      <Router>
      <SideNav/>
        <Routes >
        <Route path="/contacts" element={<></>} />
          <Route path="/food-items" element={<></>} />
          <Route path="/food-outlets" element={<></>} />
          <Route path="/mess-menu" element={<></>} />
          <Route path="/role" element={<></>} />
          
          <Route path="/bus-timings" element={<></>} />
          <Route path="/ferry-timings" element={<></>} />
        </Routes>  
      </Router>
    </>
  );
}

export default App;
