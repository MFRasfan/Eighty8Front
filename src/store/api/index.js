import axios from 'axios';
import { store } from '..';


export const baseURL= 'http://localhost:4000/api'
// export const baseURL = 'https://eighty8alpha.com/api'
export const imageURL = 'https://eighty8alpha-dev.s3.amazonaws.com/'
// export const imageURL= 'http://localhost:4000/uploads/'

export const VIN_API_KEY="I86JYDKNLF1RLK9"

export const  url={
    login:'auth/login',
    signup:'auth/signup',
    forgetPassword:'auth/forgetPassword',
    resendVerificationCode:'auth/sendVerificationCode',
    resetPassword:'auth/resetPassword',
    refreshAccessToken:'auth/refreshAccessToken',
    verifyAccount:'auth/verifyAccount',
    updateUserById:'user',
    fileUpload:'media/uploads',
    fileDelete:'media/delete',
    role:'role/',
    user:'user/',
    userGain:'user/user-gain',
    customer: 'user/customer',

    inquiry:'inquiry/',
    report:'inquiry/report',
    vehicle:'vehicle',
    notification:'notifications',
    notificationRead:'notifications/read',
    vehicleSearch:'vehicle/search',

    home:'content/home',
    faq:'content/faq',
    contact:'content/contact',
    about:'content/about',
    inquiryGetById:'inquiry/getbyId',
    userGetById:'user/getById',
    createStaff:'auth/registerStaff',
    createCustomer: 'auth/registerCustomer' ,
    vehicleFilter:'vehicle/filter',
    getVehicleById:'vehicle/getbyId',

    carAPI:{
      fetchCarDetailsByVin:`https://specifications.vinaudit.com/v3/specifications?format=json&key=${VIN_API_KEY}&format=json&vin=`
    }
}


export const setAuthToken= token =>{
    if(token){
        axios.defaults.headers.common['Authorization']= `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}

export const makeRequest = async ({method, url, data = null, headers}) => {
    try {

      


      const response = await axios({
        method,
        url:`${baseURL}/${url}`,
        data,
        headers
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };


