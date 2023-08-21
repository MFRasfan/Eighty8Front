import React, { useState } from "react";
import { formStyle } from "../../style/adminStyle";
import { toast, ToastContainer } from "react-toastify";
import { toastComponent } from "../../utils/toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { COLORS } from "../../utils/color";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from "../../component/authLayout";
import AuthModal from "../../component/authModel";
import {login} from '../../store/features/auth/authService'

const ManagementLogin = () => {
  const navigation = useNavigate();
  const [input, setinput] = useState({});
  const [showPassword, setshowPassword] = useState(false);
  const [tabName, settabName] = useState("")
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const roles= {}

  const onInputChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async(e) => {
    try {
      let emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (!input.email) throw "Please enter email";
      if (!input.email.match(emailRegex)) throw "Invalid Email";
      if (!input.password) throw "Please enter password";
      if (input.password.length < 8){
        throw "Password should be atleast 8 character long";
      }
      
      await dispatch(login(input));
      // navigation("/user/dashboard");
    
    } catch (error) {
      toastComponent.error(error+"32342");
    }
  };

  return (
    <>
    
    <AuthLayout>
      <div>
        <label className={`${formStyle.label} font-bold`}>Email</label>
        <div className="mt-1 mb-1">
          <input
            name={"email"}
            className={formStyle.input}
            value={input.email}
            onChange={onInputChange}
          />
        </div>

        <div>
          <label className={`${formStyle.label} font-bold`}>Password</label>
          <div className="w-[340px]">
            <input
              name={"password"}
              className={formStyle.input}
              value={input.password}
              type={showPassword ? "text" : "password"}
              onChange={onInputChange}
            />
            <div>
              {showPassword ? (
                <AiOutlineEye
                  onClick={() => setshowPassword(!showPassword)}
                  color={COLORS.primary}
                  size={18}
                  className="cursor-pointer"
                  style={{
                    position: "absolute",
                    marginTop: -48,
                    marginLeft: 315,
                  }}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => setshowPassword(!showPassword)}
                  color={COLORS.primary}
                  size={18}
                  className="cursor-pointer"
                  style={{
                    position: "absolute",
                    marginTop: -48,
                    marginLeft: 315,
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <p
             onClick={() => settabName("forgetpassword")}
            className="text-secondary hover:text-primary duration-300 mb-5
  ease-in-out text-center  font-semibold cursor-pointer"
          >
            Forget Password
          </p>
        </div>

        <button
          onClick={() => handleLogin()}
          className={`rounded-md bg-secondary hover:bg-primary hover:shadow-lg  duration-300
   ease-in-out w-[100%] h-[50px] flex items-center justify-center`}
        >
          <p className="text-white font-semibold text-lg">Login</p>
        </button>
      </div>
    </AuthLayout>
   
    <AuthModal
      from={"management"} 
      tabName={tabName}
      showModal={Boolean(tabName)} 
      toggleModal={()=>settabName("")}/>
    </>
  );
};

export default ManagementLogin;
