import React, { useEffect, useState, useMemo } from "react";
import "../styles/OtpVerify.css"; // Import your CSS file
import Logo from "../assets/Header_logo.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderSignin from "../slider/SliderSignin";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { generateOtp } from "../../redux/action/siginup.action";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { BiChevronDown } from "react-icons/bi";
import { employerDetails, employerPhoneUpdate } from "../../redux/action/employers.action";
import { trainerDetails, trainerPhoneUpdate } from "../../redux/action/trainer.action";

const SettingLogin = () => {
    const [validotp, setOtp] = useState(["", "", "", ""]);
    const phoneNumber = useState(Cookies.get("phoneNumber"));
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
    const countries = ["French", "Spanish", "German", "Italian"];
    const [initialTimer, setInitialTimer] = useState(60);
    const [disableResend, setDisableResend] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toastShown, setToastShown] = useState(false);

    const employer = useSelector(({ employerSignUp }) => {
        return employerSignUp?.employerDetails;
    });
    const trainer = useSelector(({ trainerSignUp }) => {
        return trainerSignUp?.trainerDetails;
    });

    useEffect(() => {
        dispatch(employerDetails())
        dispatch(trainerDetails())
    }, [dispatch])

    const startInitialTimer = () => {
        if (initialTimer > 0) {
            setTimeout(() => {
                setInitialTimer((prevTime) => prevTime - 1);
            }, 1000); // Update the timer after 1 second
        }
    };
    useEffect(() => {
        startInitialTimer();
    }, [initialTimer]);

    useEffect(() => {
        if (initialTimer === 0) {
            setDisableResend(false);
        }
    }, [initialTimer]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        // Check if the input is a digit
        if (/^\d*$/.test(value)) {
            // Update the OTP array with the new value at the specified index
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = value;
                return newOtp;
            });
            // Move to the next input box if a digit is entered
            if (index < 3 && value !== "") {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleVerifyOTP = useMemo(() => {
        return async (e) => {
            // e.preventDefault()
            const otp = validotp.join("");
            console.log(otp, phoneNumber[0]);
            if (otp.length !== 4) {
                toast.error("enter 4 digit otp");
                setToastShown(true);
            } else if (!phoneNumber[0]) {
                toast.error("Phone number not found");
            }
            else if (employer?.employerDetails?.role === "employer") {
                await dispatch(employerPhoneUpdate(phoneNumber[0], otp))
                setOtpVerified(true);
            }
            else if (trainer?.trainerDetails?.role === "trainer") {
                await dispatch(trainerPhoneUpdate(phoneNumber[0], otp))
                setOtpVerified(true);
            }
        };

    }, [dispatch, phoneNumber, validotp]);

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            // Handle backspace functionality
            e.preventDefault();
            // If the current input box is empty, move focus to the previous input box
            if (validotp[index] === "") {
                if (index > 0) {
                    document.getElementById(`otp-input-${index - 1}`).focus();
                }
                return;
            }
            // Clear the current input box
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];
                newOtp[index] = "";

                // Move focus to the current input box
                document.getElementById(`otp-input-${index}`).focus();
                return newOtp;
            });
        } else if (index === 3 && e.key === "Enter") {
            e.preventDefault(); // Prevent default behavior of Enter key
            console.log("handling verify otp");
            handleVerifyOTP();
        }
    };

    useEffect(() => {
        if (
            employer?.message === "Employer PhoneNumber Updated SuccessFully" &&
            employer?.employerDetails?.role === "employer"
        ) {
            toast.success(employer?.employerDetails?.role, {
                style: { backgroundColor: "#4CAF90", color: "#ffffff" },
            });

            localStorage.setItem("role", employer?.employerDetails?.role);
            navigate("/employerDashboard/settings"); // Navigate to the next page
        }
        if (employer?.message === "Invalid Otp") {
            // Handle invalid OTP case if needed
            toast.error(employer?.message);
            navigate("/employerDashboard/settings");
        }
        if (
            trainer?.message === "Trainer PhoneNumber Updated SuccessFully" &&
            trainer?.trainerDetails?.role === "trainer"
        ) {
            toast.success(trainer?.trainerDetails?.role, {
                style: { backgroundColor: "#4CAF90", color: "#ffffff" },
            });

            localStorage.setItem("role", trainer?.trainerDetails?.role);
            navigate("/trainerDashboard/settings"); // Navigate to the next page
        }
        if (trainer?.message === "Invalid Otp") {
            // Handle invalid OTP case if needed
            toast.error(trainer?.message);
            navigate("/trainerDashboard/settings");
        }

    }, [employer, trainer, navigate]);

    return (
        <>
            <div className="Otp_Verify">
                <div className="Content">
                    <div className="Otp_Header">
                        <img src={Logo} alt="Header_Logo" />
                        <div className="Help">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    id="Vector"
                                    d="M11.2441 11.1227C11.5288 10.2455 12.0503 9.46494 12.7513 8.86581C13.4524 8.26668 14.3063 7.87297 15.2171 7.72846C16.1279 7.58396 17.0604 7.694 17.9124 8.04671C18.7645 8.39943 19.5024 8.98124 20.0446 9.72721C20.5868 10.4732 20.9115 11.3543 20.9839 12.2736C21.0564 13.1929 20.8731 14.1146 20.4545 14.9364C20.0359 15.7581 19.399 16.4475 18.6127 16.9294C17.8264 17.4112 16.9222 17.6663 16 17.6663V19.3337M16 31C7.71573 31 1 24.2843 1 16C1 7.71573 7.71573 1 16 1C24.2843 1 31 7.71573 31 16C31 24.2843 24.2843 31 16 31ZM16.083 24.3333V24.5L15.917 24.5003V24.3333H16.083Z"
                                    stroke="#2676c3"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <div className=" relative inline-block z-1">
                                <div
                                    onClick={() => setOpen(!open)}
                                    className={`w-[189px] h-[49px]
                                            ring ring-offset-[-2px]
                                            font-normal text-base ring-[#2676c2] 
                                            leading-6
                                            flex items-center justify-around
                                            hover:bg-[#2676c2] hover:text-[#ffff] hover:cursor-pointer 
                                            ${open ? "bg-[#2676c2] text-[#ffff]"
                                            : "bg-[#ffff] text-[#2676c2]"
                                        }`}
                                >
                                    {open ? (
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                id="Vector"
                                                d="M1 13H7.66667M1 13C1 19.6274 6.37258 25 13 25M1 13C1 6.37258 6.37258 1 13 1M7.66667 13H18.3333M7.66667 13C7.66667 19.6274 10.0545 25 13 25M7.66667 13C7.66667 6.37258 10.0545 1 13 1M18.3333 13H25M18.3333 13C18.3333 6.37258 15.9455 1 13 1M18.3333 13C18.3333 19.6274 15.9455 25 13 25M25 13C25 6.37258 19.6274 1 13 1M25 13C25 19.6274 19.6274 25 13 25"
                                                stroke="#ffff"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="hover:stroke-[#2676C2]"
                                        >
                                            <path
                                                id="Vector"
                                                opacity="0.8"
                                                d="M1 13H7.66667M1 13C1 19.6274 6.37258 25 13 25M1 13C1 6.37258 6.37258 1 13 1M7.66667 13H18.3333M7.66667 13C7.66667 19.6274 10.0545 25 13 25M7.66667 13C7.66667 6.37258 10.0545 1 13 1M18.3333 13H25M18.3333 13C18.3333 6.37258 15.9455 1 13 1M18.3333 13C18.3333 19.6274 15.9455 25 13 25M25 13C25 6.37258 19.6274 1 13 1M25 13C25 19.6274 19.6274 25 13 25"
                                                stroke="currentcolor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    )}

                                    {selected
                                        ? selected?.length > 25
                                            ? selected?.substring(0, 25) + "..."
                                            : selected
                                        : "English"}
                                    <BiChevronDown
                                        size={30}
                                        className={`${open && "rotate-180"}`}
                                    />
                                </div>
                                {open && (
                                    <ul className=" absolute bg-[#2676c2] text-[#ffff] w-[190px] z-[3]">
                                        {countries?.map((country) => (
                                            <li
                                                key={country}
                                                className={`p-2 text-sm ${country?.toLowerCase() === selected?.toLowerCase()
                                                    ? "text-[16px] "
                                                    : "hover:cursor-pointer hover:bg-opacity-20 hover:bg-white"
                                                    }`}
                                                onClick={() => {
                                                    setSelected(country);
                                                    setOpen(false);
                                                }}
                                            >
                                                {country}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="Reciever">
                        <div className="Reciever_Align">
                            <h2>
                                Trailblazer or Voyager,
                                <br />
                                Select Your Role!
                            </h2>
                            <p style={{ color: "gray" }}>
                                Enter the 4-digit OTP to verify your Sissoo Training <br />
                                App account, Resend if needed{" "}
                            </p>
                            <p>
                                {initialTimer > 0 ? (
                                    <span style={{ color: "gray" }}>
                                        OTP Expires In:{" "}
                                        <span style={{ color: "#2676C2", fontWeight: "bold" }}>
                                            {initialTimer}sec
                                        </span>
                                    </span>
                                ) : (
                                    <span style={{ color: "red", fontWeight: "bold" }}>
                                        OTP Expired
                                    </span>
                                )}
                            </p>
                            <div className="otp-input-container">
                                {validotp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-input-${index}`}
                                        type="text"
                                        value={digit}
                                        maxLength="1"
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        style={{
                                            textAlign: "center",
                                            fontFamily: "poppins",
                                            fontSize: "1.5rem",
                                            color: "#2676C2",
                                        }}
                                    />
                                ))}
                            </div>
                            <button onClick={handleVerifyOTP}>Verify</button>
                            <p>
                                <span className="" style={{ color: "gray" }}>
                                    If you haven't received the OTP?
                                </span>{" "}
                                <Link
                                    href="#"
                                    style={{
                                        color: initialTimer > 0 ? "gray" : "#2676C2",
                                        cursor: initialTimer > 0 ? "not-allowed" : "pointer",
                                        fontWeight: "bold",
                                        textDecoration: "none",
                                        fontSize: "16px",
                                        marginLeft: "10px",
                                    }}
                                    onClick={() => {
                                        if (initialTimer === 0 && !disableResend) {
                                            dispatch(generateOtp(phoneNumber[0]));
                                            setInitialTimer(60);
                                            setDisableResend(true);
                                            setOtp(["", "", "", ""]);
                                        }
                                    }}
                                    disabled={initialTimer > 0 || disableResend}
                                >
                                    Resend
                                </Link>
                            </p>{" "}
                        </div>
                        <div className="Carousel">
                            <SliderSignin />
                        </div>
                    </div>

                    <div className="Git_Email">
                        <div className="hrtag">
                            <span className="line"></span>
                            <p>Or With</p>
                            <span className="line"></span>
                        </div>
                        <div className="GEIcons">
                            <MailOutlineRoundedIcon
                                className="hover:bg-[#2676c3] transform transition-transform duration-300 hover:scale-125"
                                sx={{
                                    color: "white",
                                    fontSize: "3.5rem",
                                    bgcolor: "#2676C24D",
                                    borderRadius: "100%",
                                    padding: "6%",
                                }}
                            />
                            <GitHubIcon
                                className="hover:fill-[#2676c3] transform transition-transform duration-300 hover:scale-125  "
                                sx={{ color: "#2676C24D", fontSize: "3.75rem" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingLogin;
