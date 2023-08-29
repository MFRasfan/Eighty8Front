import React, { useState, useEffect } from "react";
import DashboardLayout from "../../component/dashboardLayout";
import { formStyle } from "../../style/adminStyle";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import { toastComponent } from "../../utils/toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { COLORS } from "../../utils/color";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchRoles } from "../../store/features/role/roleService";
import Dropdown from "react-dropdown";
import { createCustomer } from "../../store/features/customer/customerService";

import { BiImageAdd } from "react-icons/bi";
import { validateEmail } from "../../utils/validation";

const StaffForm = ({ toggleForm }) => {
  const navigation = useNavigate();
  const [input, setinput] = useState({});
  const [showPassword, setshowPassword] = useState(false);
  const [roles, setroles] = useState([
    {
      label: "Walk-In",
      value: "Walk-In",
    },
    {
      label: "Online",
      value: "Online",
    },
    {
      label: "Guest",
      value: "Guest",
    },
  ]);
  const [statuses , setStatuses] = useState([{label:'Active' , value:"Active"} , {label:'InActive' , value:'InActive'}])

  const rolesSelector = useSelector((state) => state.role.roles);

  const dispatch = useDispatch();

  const onInputChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    try {
      console.log(validateEmail(input.email))
      if(!input.firstName){
        throw "Please enter first name"
      } else if(!input.lastName){
        throw "Please enter last name"
      } else if(!input.email){
        throw "Please enter email address"
      } else if(!validateEmail(input.email)){
        throw "Please enter a valid email "
      } else if(!input.phone){
        throw "Please enter a phone number"
      } else if(!input.dlNumber){
        throw "Please enter DL Number"
      } else if (!input.dlExpiry){
        throw "Please enter DL Expiry"
      } else if(!input.address) {
        throw "Please enter an address"
      } else if(!input.city) {
        throw "Please enter a city"
      } else if(!input.postal){
        throw "Please enter a postal code"
      } 


      let {firstName , middleName , lastName , email , phone ,dlNumber , dlExpiry , address, city , postal , role , status} = input

      let obj = {firstName ,  middleName , lastName , email , phone ,dlNumber , dlExpiry , address, city , postal , role: role.value , status: status.value}
      obj.role = input.role.value
      dispatch(createCustomer(obj , ()=>{
        setinput({
          firstName: "",
          lastName: "" ,
          email: "",
          phone: "",
          dlNumber: "" ,
          dlExpiry: "" ,
          address: "",
          city: "",
          postal: "",
          role:"" ,
          status: ""
        })
      }))
      console.log(obj)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <p
        onClick={() => toggleForm()}
        className={`${formStyle.h1Dashboard} cursor-pointer hover:underline hover:text-primary text-sm px-2`}
      >
        Back
      </p>

      <p className={`${formStyle.h1Dashboard} px-2`}>Create New Customer</p>

      <div className="flex md:flex-row flex-col space-x-6">
        <div style={{width: '100%'}} className="p-2 md:w-[50vw]">
          <div className="flex flex-col space-x-4 md:flex-row">
            <div className="md:w-[25%] lg:w-[25%] sm:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>
                First Name
              </label>
              <div className="mt-1 mb-1">
                <input
                  name={"firstName"}
                  className={formStyle.input}
                  value={input.firstName}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="md:w-[25%] lg:w-[25%] sm:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>
                Middle Name
              </label>
              <div className="mt-1 mb-1">
                <input
                  name={"middleName"}
                  className={formStyle.input}
                  value={input.middleName}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="md:w-[25%] lg:w-[25%] sm:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>
                Last Name
              </label>
              <div className="mt-1 mb-1">
                <input
                  name={"lastName"}
                  className={formStyle.input}
                  value={input.lastName}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="md:w-[25%] lg:w-[25%] sm:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>Email</label>
              <div className="mt-1 mb-1">
                <input
                  name={"email"}
                  className={formStyle.input}
                  value={input.email}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-x-4 md:flex-row">
            <div className="md:w-[25%] lg:w-[25%] sm:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>Phone</label>
              <div className="mt-1 mb-1">
                <input
                  name={"phone"}
                  className={formStyle.input}
                  value={input.phone}
                  onChange={onInputChange}
                />
              </div>
            </div>
            
            <div className="md:w-[25%] lg:w-[25%] sm:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>
                DL Number
              </label>
              <div className="mt-1 mb-1">
                <input
                  name={"dlNumber"}
                  className={formStyle.input}
                  value={input.dlNumber}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="md:w-[25%] lg:w-[25%] sm:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>
                DL Expiry
              </label>
              <div className="mt-1 mb-1">
                <input
                  name={"dlExpiry"}
                  type="date"
                  className={formStyle.input}
                  value={input.dlExpiry}
                  onChange={onInputChange}
                />
              </div>
            </div>
             <div className="md:w-[25%] lg:w-[25%] sm:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>Address</label>
              <div className="mt-1 mb-1">
                <input
                  name={"address"}
                  className={formStyle.input}
                  value={input.address}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-x-4 md:flex-row">
           
            <div className="md:w-[25%] lg:w-[25%] sm:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>City</label>
              <div className="mt-1 mb-1">
                <input
                  name={"city"}
                  className={formStyle.input}
                  value={input.city}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="md:w-[25%] lg:w-[25%] sm:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>
                Postal Code
              </label>
              <div className="mt-1 mb-1">
                <input
                  name={"postal"}
                  className={formStyle.input}
                  value={input.postal}
                  onChange={onInputChange}
                />
              </div>
            </div>
            <div className="md:w-[25%] lg:w-[25%] sm:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>Role</label>
              <div className="mt-1 mb-1">
                <Dropdown
                  options={roles}
                  name={"role"}
                  style={{ border: 0 }}
                  onChange={(val) => {
                    console.log(val);
                    setinput({ ...input, role: val });
                  }}
                  value={input.role}
                  placeholder="Select"
                />
              </div>
            </div>
            <div className="md:w-[25%] lg:w-[25%] sm:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>Status</label>
              <div className="mt-1 mb-1">
                <Dropdown
                  options={statuses}
                  name={"role"}
                  style={{ border: 0 }}
                  onChange={(val) => {
                    console.log(val);
                    setinput({ ...input, status: val });
                  }}
                  value={input.status}
                  placeholder="Select"
                />
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col space-x-4 md:flex-row">
            <div className="md:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>Email</label>
              <div className="mt-1 mb-1">
                <input
                  name={"username"}
                  className={formStyle.input}
                  value={input.username}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="md:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>Phone</label>
              <div className="mt-1 mb-1">
                <input
                  name={"role"}
                  className={formStyle.input}
                  value={input.role}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </div> */}

          {/* <div className="flex flex-col space-x-4 md:flex-row">
            <div className="md:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>Password</label>
              <div className="mt-1 mb-1">
                <input
                  name={"username"}
                  className={formStyle.input}
                  value={input.username}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="md:w-[50%]">
              <label className={`${formStyle.label} font-bold`}>
                Confirm Password
              </label>
              <div className="mt-1 mb-1">
                <input
                  name={"role"}
                  className={formStyle.input}
                  value={input.role}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </div> */}

          <button
            onClick={() => handleSubmit()}
            className={`rounded-md bg-secondary hover:bg-primary hover:shadow-lg  duration-300
         ease-in-out w-[100%] h-[40px] flex items-center justify-center`}
          >
            <p className="text-white font-semibold text-lg">Submit</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffForm;
