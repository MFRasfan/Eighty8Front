import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {
  HomePage,
  AboutPage,
  ContactPage,
  ProductDetails,
  ShopPage,
  NotFound
} from "./website";
import {
  ManagementLogin,
  Customers,
  Staff,
  Inquiry,
  RolesAndPermisions,
  StaticPageManagement,
  Profile,
  Vehicle,
  Sales,
  Settings,
  Notification,
} from "./management";
import {
  SalesDashboard,
  UserDashboard,
  AdminDashboard,
  ManagerDashboard,
} from "./management/dashboard";
import { useSelector } from "react-redux";
import {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StaticPoliciesPage from "./website/staticpages";


function App() {
  const {user} = useSelector((state) => state.auth);
  const [role, setrole] = useState("");

  useEffect(() => {
    if (user && user.role) {
      const { role } = user.role;
      setrole(role);
    }
  }, [user]);
  console.log("role------------",user)

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" exact element={<HomePage />} />
        <Route path="/shop" exact element={<ShopPage />} />
        <Route path="/vehicle/:slug" exact element={<ProductDetails />} />
        <Route path="/aboutus" exact element={<AboutPage />} />
        <Route path="/contactus" exact element={<ContactPage />} />
        <Route path="/management/login" exact element={<ManagementLogin />} />
        <Route path="/user/inquiries" exact element={<Inquiry />} />
        <Route path="/terms-and-conditions" exact element={<StaticPoliciesPage/>} />
        <Route path="/privacy-policy" exact element={<StaticPoliciesPage/>} />
        <Route path="/accessibility" exact element={<StaticPoliciesPage/>} />


        { !!user._id &&
          <>
        {/* AUTH PROTECTED ROUTES */}
          
          
        <Route path="/profile"  exact  element={<Profile />} />
        <Route path="/settings"  exact  element={<Settings />} />
        <Route path="/notifications"  exact  element={<Notification />} />

        {/* MANAGEMENT PROTECTED ROUTES */}

        {!!(role &&( role === "admin" || role==="sales" || role ==="manager" )) && (
         <>
          <Route path="/admin"  exact  element={<AdminDashboard />} />
          <Route path="/management"  exact  element={<AdminDashboard />} />
          <Route path="/sales"  exact  element={<SalesDashboard />} />
          <Route path="/roles-permissions"  exact  element={<RolesAndPermisions />} />
          <Route path="/management/customer"  exact  element={<Customers />} />
          <Route path="/management/inquiries"  exact  element={<Inquiry />} />
          <Route path="/inquiries"  exact  element={<Inquiry />} />
         
          <Route path="/management/vehicle"  exact  element={<Vehicle />} />
          <Route path="/management/staff"  exact  element={<Staff />} />
          <Route path="/management/sales"  exact  element={<Sales />} />
          <Route
            path="/management/website-content"
            element={<StaticPageManagement />}
          />
         
         </>
        )}
      

        {/* USER PROTECTED ROUTE
        {!!(role && role === "user") && (
          <Route path="/user"  exact  element={<UserDashboard />} />
        )} */}

       
        </>
       }
       
       {/* this will match any route that wasn't matched by any other route */}
       <Route path="*"  exact  element={<NotFound/>}/>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
