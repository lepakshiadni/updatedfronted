import Axios from "axios";
const baseUrl=localStorage.getItem('baseUrl')

export const verifyOtp = (phoneNumber, otp) => {
  console.log('otp verify action ',phoneNumber,otp)
  return async (dispatch) => {
    try {
      const response = await Axios.post(`${baseUrl}/user/verifyotp`, { phoneNumber, otp });
      // console.log(response)
      dispatch(verifyOtpSuccess(response.data));
    } catch (error) {
      dispatch(verifyOtpFailure());
    }
    // await Axios.post(`http://44.203.138.222:4000/user/verifyotp`, { phoneNumber, otp })
    // .then((resp)=>{
    //     console.log('resp',resp.data)
    //     dispatch(verifyOtpSuccess(resp.data));
    // })
    // .catch((error)=>{
    //   dispatch(verifyOtpFailure('Invalid OTP'));
    // })
  };
};

export const verifyOtpSuccess = (data) => ({
  type: 'VERIFY_OTP_SUCCESS',
  payload: data,
});

export const verifyOtpFailure = (error) => ({
  type: 'VERIFY_OTP_FAILURE',
  payload: { error },
});
