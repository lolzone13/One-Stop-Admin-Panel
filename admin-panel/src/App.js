import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/food-items" element={<FoodItems />} />
          <Route path="/food-outlets" element={<Foodoutlet />} />
          <Route path="/mess-menu" element={<MessMenu />} />
          <Route path="/role" element={<Role />} />
          <Route path="/user" element={<User />} />
          <Route path="/bus-timings" element={<BusTimings />} />
          <Route path="/ferry-timings" element={<FerryTimings />} />
        </Routes>  
      </Router>
    </>
  );
}

export default App;
