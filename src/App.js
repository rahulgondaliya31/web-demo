import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import ChangePassword from "./components/account/ChangePassword";
import ForgotPassword from "./components/authentication/Forgotpassword";
import AddVehicle from "./components/vehical/Addvehical"
import Companydetails from "./components/company_details/Companydetails";
import Tearmsandcon from "./components/blocks/Tearmsandcon";
import Features from "./components/blocks/Fetures"
import Contactus from "./components/blocks/Contactus"
import Privacypoliciy from "./components/blocks/Privacypoliciy";
import Edit_profile from "./components/account/Profile";
import Subscription_plans from "./components/Subscriptions/SubscriptionPlans";
import My_vehicles from "./components/vehical/Myvehical";
import Allvehical from "./components/vehical/Allvehical";

const App = (props) => {

    return (
           <>
            <Routes>
                <Route exact path="/dashboard" element={<Dashboard 
                 google={props.google}
                 lat={22.2894694}
                 lng={70.7730229}
                 height= "900px"
                 width="100%"
                 zoom={15}
                />} />
                <Route exact path="/" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/changepassword" element={<ChangePassword/>} />
                <Route exact path="/forgotpassword" element={<ForgotPassword/>} />
                <Route exact path="/addvehicle/:id/:price/:plan_type" element={<AddVehicle/>} />
                <Route exact path="/companydetails" element={<Companydetails/>} />
                <Route exact path="/tearmsandcondition" element={<Tearmsandcon/>} />
                <Route exact path="/features" element={<Features/>} />
                <Route exact path="/contactus" element={<Contactus/>} />
                <Route exact path="/privacypoliciy" element={<Privacypoliciy/>} />
                <Route exact path="/profile" element={<Edit_profile/>} />
                <Route exact path="/subscriptionplan" element={<Subscription_plans/>} />
                <Route exact path="/myvehical" element={<My_vehicles/>} />
                <Route exact path="/allvehicles" element={<Allvehical/>} />

                
               

            </Routes>
    </>
    );
  }

export default App;
