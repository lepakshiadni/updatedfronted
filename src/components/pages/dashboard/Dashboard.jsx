
import React, { useEffect, useState, useRef } from "react";
import Axios from 'axios'
import { io } from "socket.io-client";
import "../../styles/Dashboard.css"; // Import your CSS file for styling
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useDispatch, useSelector } from "react-redux";
import { employerDetails, getConversation } from "../../../redux/action/employers.action";
import { IoIosArrowUp } from "react-icons/io";
import { option } from "./Data";
import { NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import DashboardData from './trainerDashboard/DashboardData 2'
import Trainers from "../trainerlist/Trainer";
import TrainerListProfile from "./../trainerlist/TrainerListProfile";
import Requirements from "../postrequirements/Requirements";
import Chat from "../messages/Chat";
import EmployerSettings from "../settings/EmployerSettings";
import TrainingResources from "../trainingresourecs/EmployerTrainingResource";
import PostJobSection from "../postrequirements/PostRequirements/PostJob";
import PostTrainingSection from "../postrequirements/PostRequirements/PostTraining";
import EmployerMyTraining from "../mytrainings/EmployerMyTraining";
import EmployerPosted from "../mytrainings/EmployerMyTrainingChilds/EmployerPosted";
import EmployerOngoing from "../mytrainings/EmployerMyTrainingChilds/EmployerOngoing";
import EmployerCompleted from "../mytrainings/EmployerMyTrainingChilds/EmployerCompleted";
import EmployerFeed from '../feed/employerfeed/EmployerFeed'
import EmployerProposalManagement from '../proposalMangement/EmployerProposalManagement'
import EmployerProposalCandidacy from '../proposalMangement/Employerproposalmanagement/EmpProposalCandidacy'
import EmployerProposalRequest from '../proposalMangement/Employerproposalmanagement/EmpProposalRequest'
import TrainerHelpSupport from "../help&support/TrainerHelpSupport";
import EmployerHeader from "../../header&footer/EmployerHeader";
import EmployerMyPosts from '../myposts/EmployerMyPosts'
import { getTrainerCreatePost } from "../../../redux/action/trainercreatepost.action";

const DashboardApp = () => {

  const [showWelcome, setShowWelcome] = useState(true);
  const [prevSelectedOption, setPrevSelectedOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const baseUrl = localStorage.getItem('baseUrl')
  const dispatch = useDispatch();
  const location = useLocation();
  const socket = useRef();


  const role = localStorage.getItem("role");

  const handleOptionClick = (option) => {
    if (selectedOption !== option) {
      setPrevSelectedOption(selectedOption);
    }
    setSelectedOption(option);
  };

  const [trainerFilteredData, setTrainerFilteredData] = useState([]);
  const [storeLoc, setStoreLoc] = useState([])
  const [storedesignation, setStoreDesignation] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFilter2, setSelectedFilter2] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [trainerDetails, setTrainerDetails] = useState([])

  useEffect(() => {
    dispatch(getTrainerCreatePost())
  }, [dispatch, location.pathname])


  const trainerPost = useSelector(({ trainerCreatePost }) => {
    return trainerCreatePost?.trainerCreatePostDetails?.trainercreatePost
  })
  const employer = useSelector(({ employerSignUp }) => {
    return employerSignUp?.employerDetails?.employerDetails;
  });
  useEffect(() => {
    dispatch(employerDetails());
    dispatch(getConversation(employer?._id))
  }, [dispatch]);
  // console.log('employer', employer);
  useEffect(() => {
    socket.current = io(`http://52.66.32.200:4040`, {
      transports: ["websocket"],
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "value",
      },
    });

  }, []);
  useEffect(() => {
    if (employer) {
      socket.current.emit("addUser", employer?._id);
      socket.current.on("getUsers", (users) => {
        // console.log(.users);
      });
    }
  }, [employer]);
  const [postrainingData, setPosttrainingData] = useState([])

  useEffect(() => {
    Axios.get(`${baseUrl}/trainer/getAllTrainerDetails`)
      .then((resp) => {
        setTrainerDetails(resp.data?.trainerDetails)
        setSelectedFilter("")
        setSelectedFilter2("")
      })
      .catch((error) => {
        console.log(error)
      })
  }, [location.pathname])

  useEffect(() => {
    if (Array.isArray(trainerPost)) {

      let filteredData2 = trainerPost;
      if (searchTerm) {
        filteredData2 = filteredData2.filter(item =>
          Object.values(item).some(value => {
            if (typeof value === 'string') {
              return value.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (typeof value === 'object' && value !== null) {
              return Object.values(value).some(subValue =>
                typeof subValue === 'string' && subValue.toLowerCase().includes(searchTerm.toLowerCase())
              );
            }
            return false;
          })
        );
      }
      setPosttrainingData(filteredData2)
    }
  }, [trainerPost, searchTerm])


  useEffect(() => {
    if (Array.isArray(trainerDetails)) {

      const Loc = trainerDetails.map((val) => val?.basicInfo?.location).filter(loc => loc !== undefined);
      const UniqueLoc = [...new Set(Loc)]; // Filter out duplicate locations
      setStoreLoc(UniqueLoc);

      const Designation = trainerDetails.map((val) => val?.basicInfo?.designation).filter(designation => designation !== undefined);
      const UniqueDesignation = [...new Set(Designation)]; // Filter out duplicate designations
      setStoreDesignation(UniqueDesignation);

      let filteredData = trainerDetails;
      // console.log(filteredData);

      if (searchTerm) {
        filteredData = filteredData.filter(item =>
          Object.values(item).some(value => {
            if (typeof value === 'string') {
              return value.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (typeof value === 'object' && value !== null) {
              return Object.values(value).some(subValue =>
                typeof subValue === 'string' && subValue.toLowerCase().includes(searchTerm.toLowerCase())
              );
            }
            return false;
          })
        );
      }

      if (selectedFilter) {
        filteredData = filteredData.filter(item => item?.basicInfo?.location === selectedFilter)
      }
      if (selectedFilter2) {
        filteredData = filteredData.filter(item => item?.basicInfo?.designation === selectedFilter2)
      }

      setTrainerFilteredData(filteredData);

    }
  }, [trainerDetails, searchTerm, selectedFilter, selectedFilter2])


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (selectedValue) => {
    setSelectedFilter(selectedValue);
  };
  const handleFilterChange2 = (selectedValue) => {
    setSelectedFilter2(selectedValue);
  };


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Update the selectedOption based on the current location
    const currentOption = option.find((opt) => {
      if (
        location.pathname.startsWith("/employerDashboard/postarequirements") ||
        location.pathname.startsWith(
          "/employerDashboard/postarequirements/post-training"
        ) ||
        location.pathname.startsWith(
          "/employerDashboard/postarequirements/post-job"
        )
      ) {
        return opt.name === "Post a Requirements";
      }
      if (
        location.pathname.startsWith("/employerDashboard/proposalmanagement") ||
        location.pathname.startsWith(
          "/employerDashboard/proposalmanagement/candidacy"
        ) ||
        location.pathname.startsWith(
          "/employerDashboard/proposalmanagement/proposal"
        )
      ) {
        return opt.name === "Proposal Management";
      }
      if (
        location.pathname.startsWith("/employerDashboard/trainingmanagement")
      ) {
        if (
          location.pathname.startsWith(
            "/employerDashboard/trainingmanagement/posted"
          ) ||
          location.pathname.startsWith(
            "/employerDashboard/trainingmanagement/ongoing"
          ) ||
          location.pathname.startsWith(
            "/employerDashboard/trainingmanagement/completed"
          )
        ) {
          return opt.name === "Training Management";
        }
        return location.pathname.includes(
          opt.name.replace(/\s/g, "").toLowerCase()
        );
      }
      if (location.pathname.startsWith("/employerDashboard/trainerlist")) {
        // Check if the current path starts with the parent route or its child routes
        if (
          location.pathname.startsWith("/employerDashboard/trainerlist") ||
          location.pathname.startsWith(
            "/employerDashboard/trainerlist/trainerlistprofile"
          )
        ) {
          return opt.name === "TrainerList"; // Set the active state for the parent route
        }
        return location.pathname.includes(
          opt.name.replace(/\s/g, "").toLowerCase()
        );
      } else {
        return location.pathname.includes(
          opt.name.replace(/\s/g, "").toLowerCase()
        );
      }
    });
    if (currentOption) {
      setSelectedOption(currentOption.name);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="relative w-full">
        <div className="w-full">
          <EmployerHeader handleInputChange={handleInputChange} />
        </div>
        <div className="Reactangle-dash w-full flex">
          <div className="Rectangle-side w-[290px] bg-white mt-[2px] shadow">
            {option.map(({ name, icon }) => {
              let toPath = `/employerDashboard/${name
                .replace(/\s/g, "")
                .toLowerCase()}`;
              if (name === "Post a Requirements") {
                toPath = "/employerDashboard/postarequirements/post-training";
              }
              if (name === "Training Management") {
                toPath = "/employerDashboard/trainingmanagement/posted";
              }
              if (name === "Proposal Management") {
                toPath = "/employerDashboard/proposalmanagement/candidacy";
              }
              if (name === 'TrainerList') {
                toPath = '/employerDashboard/trainerlist';
              }
              return (
                <NavLink
                  key={name}
                  to={toPath}
                  className={`sidebar-option  ${selectedOption === name ? "active" : ""
                    } ${prevSelectedOption === name ? "reverse" : ""}`}
                  activeClassName="active"
                  onClick={() => handleOptionClick(name)}
                >
                  <ArrowForwardIosOutlinedIcon className="arrow-icon" />
                  {/* {selectedOption === "Billing & Payments" ? (
                    <HttpsIcon className="arrow-icon" />
                  ) : (
                    <ArrowForwardIosOutlinedIcon className="arrow-icon" />
                  )} */}
                  {icon}
                  {name}
                </NavLink>
              );
            })}
            {/* </div> */}
          </div>
          <div className="Reactangle-right w-9/12 ml-[20px]">
            <div className="dash_head z-10 h-[60px] pr-[20px] bg-white flex items-center justify-between" >
              <div className="Dashboard flex items-center text-zinc-500 text-base font-normal font-['Poppins'] space-x-3    ">
                <span> Dashboard</span>
                <span className="ml-[10px] ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                  >
                    <path
                      d="M1 1L7 7L1 13"
                      stroke="#2676C2"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                  {selectedOption}
                </span>

                {/* //postrequirements */}
                <div
                  className={`${selectedOption === "Post a Requirements" ? "" : "hidden"
                    }`}
                >
                  <div className=" flex items-center  ">
                    <span className=" ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                      >
                        <path
                          d="M1 1L7 7L1 13"
                          stroke="#2676C2"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                      {location.pathname ===
                        "/employerDashboard/postarequirements/post-training"
                        ? "Post Training"
                        : ""}
                      {location.pathname ===
                        "/employerDashboard/postarequirements/post-job"
                        ? "Post Job"
                        : ""}
                    </span>
                  </div>
                </div>

                {/* //trainer list */}
                <div
                  className={` ${selectedOption === "TrainerList" || location.pathname.startsWith("/employerDashboard/trainerlist/trainerlistprofile") ? "relative" : "hidden"
                    }`}
                >
                  <div className=" flex items-center  ">
                    {
                      location.pathname.startsWith("/employerDashboard/trainerlist/trainerlistprofile") ?
                        (
                          <>
                            <span className=" ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="14"
                                viewBox="0 0 8 14"
                                fill="none"
                              >
                                <path
                                  d="M1 1L7 7L1 13"
                                  stroke="#2676C2"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                              {location.pathname.startsWith("/employerDashboard/trainerlist/trainerlistprofile") ? "TrainerProfile" : ""}
                            </span>
                          </>
                        )
                        :
                        null
                    }
                  </div>
                </div>

                {/* //feed */}
                <div
                  className={` ${selectedOption === "Feed" || location.pathname.startsWith("/employerDashboard/feed/trainerlistprofile/") ? "relative" : "hidden"
                    }`}
                >
                  <div className=" flex items-center  ">
                    {
                      location.pathname.startsWith("/employerDashboard/feed/trainerlistprofile/") ?
                        (
                          <>
                            <span className=" ">

                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="14"
                                viewBox="0 0 8 14"
                                fill="none"
                              >
                                <path
                                  d="M1 1L7 7L1 13"
                                  stroke="#2676C2"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                              {location.pathname.startsWith("/employerDashboard/feed/trainerlistprofile/") ? "TrainerProfile" : ""}
                            </span>
                          </>
                        )
                        :
                        null
                    }
                  </div>
                </div>

                {/* //trainingmanagement */}

                <div className={` ${selectedOption === "Training Management" ? "relative" : "hidden"
                  }`}>
                    {
                      location.pathname.startsWith("/employerDashboard/trainingmanagement/posted")||
                      location.pathname.startsWith("/employerDashboard/trainingmanagement/ongoing")||
                      location.pathname.startsWith("/employerDashboard/trainingmanagement/completed")?
                      (
                        <div className=" flex items-center  ">
                          <span className=" ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="8"
                              height="14"
                              viewBox="0 0 8 14"
                              fill="none"
                            >
                              <path
                                d="M1 1L7 7L1 13"
                                stroke="#2676C2"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                            {
                              location?.pathname.includes('posted') ? 'Posted' :
                                location?.pathname.includes("ongoing") ? 'Ongoing' :
                                  location?.pathname.includes("completed") ? 'Completed' :
                                      null
                            }
                          </span>
                          {
                            location?.pathname.startsWith('/employerDashboard/trainingmanagement/posted/trainerlistprofile') ||
                              location?.pathname.startsWith('/employerDashboard/trainingmanagement/ongoing/trainerlistprofile') ||
                              location?.pathname.startsWith('/employerDashboard/trainingmanagement/completed/trainerlistprofile') ?
                              <div className=" flex items-center ml-[10px]  ">
                                <span className=" ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="14"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                  >
                                    <path
                                      d="M1 1L7 7L1 13"
                                      stroke="#2676C2"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                                <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                                  Trainer Profile
                                </span>
                              </div>
                              :
                              
                              null
                          }
                          </div>
                      ):
                      
                      null
                    }

                </div>

                {/* // proposalmanagement */}

                <div className={` ${selectedOption === "Proposal Management" ? "relative" : "hidden"
                  }`}>
                    {
                      location.pathname.startsWith("/employerDashboard/proposalmanagement/candidacy")||
                      location.pathname.startsWith("/employerDashboard/proposalmanagement/proposal")?
                      (
                        <div className=" flex items-center  ">
                          <span className=" ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="8"
                              height="14"
                              viewBox="0 0 8 14"
                              fill="none"
                            >
                              <path
                                d="M1 1L7 7L1 13"
                                stroke="#2676C2"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                            {
                              location?.pathname.includes('candidacy') ? 'Candidacy' :
                                  location?.pathname.includes("proposal") ? 'Proposal' :
                                      null
                            }
                          </span>
                          {
                            location?.pathname.startsWith('/employerDashboard/proposalmanagement/candidacy/trainerlistprofile') ||
                              location?.pathname.startsWith('/employerDashboard/proposalmanagement/proposal/trainerlistprofile') ?
                              <div className=" flex items-center ml-[10px]  ">
                                <span className=" ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="8"
                                    height="14"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                  >
                                    <path
                                      d="M1 1L7 7L1 13"
                                      stroke="#2676C2"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                                <span className=" text-[#2676C2] text-base font-normal font-['Poppins']  ml-[10px]">
                                  Trainer Profile
                                </span>
                              </div>
                              :
                              
                              null
                          }
                          </div>
                      ):
                      
                      null
                    }

                </div>
              </div>

              <div>
                <div
                  className={` ${selectedOption === "TrainerList" || location.pathname.startsWith("/employerDashboard/trainerlist/trainerlistprofile/") ? "relative" : "hidden"
                    }`}
                >

                  <div className="dropdown-buttons">
                    <select className="accordionPost" style={{ backgroundColor: "#f9f9f9", border: "1px solid #dadada", outline: 'none', color: 'gray' }} value={selectedFilter} onChange={(e) => handleFilterChange(e.target.value)} >
                      <option value="" selected>Select Location</option>
                      {storeLoc.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>

                    <select className="accordionPost" style={{ backgroundColor: "#f9f9f9", border: "1px solid #dadada", outline: 'none', color: 'gray' }} value={selectedFilter2} onChange={(e) => handleFilterChange2(e.target.value)} >
                      <option value="" selected>Select Designation</option>
                      {storedesignation.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                </div>
              </div>
            </div>


            <div className="content">
              <Routes>
                <Route path="dashboard" element={<DashboardData />} />
                <Route path="trainerlist/*" element={<Trainers trainerFilteredData={trainerFilteredData} />} />
                <Route path="trainerlist/trainerlistprofile/:id" element={<TrainerListProfile />} />

                {/* </Route> */}

                <Route path="trainingmanagement/*" element={<EmployerMyTraining />}>
                  <Route index element={<EmployerPosted />} />
                  <Route path="ongoing" element={<EmployerOngoing />} />
                  <Route path="completed" element={<EmployerCompleted />} />
                </Route>

                <Route path="trainingmanagement/ongoing/trainerlistprofile/:id" element={<TrainerListProfile />} />
                <Route path="trainingmanagement/completed/trainerlistprofile/:id" element={<TrainerListProfile />} />

                <Route path="postarequirements/" element={<Requirements />}>
                  <Route path="post-job" element={<PostJobSection />} />
                  <Route path="post-training" element={<PostTrainingSection />} />
                </Route>

                <Route path="feed/*" element={<EmployerFeed postrainingData={postrainingData} />} />
                <Route path="feed/trainerlistprofile/:id" element={<TrainerListProfile />} />
                {/* </Route> */}

                <Route path="messages" element={<Chat />} />


                <Route path='myposts' element={<EmployerMyPosts/>}/>
                <Route path="proposalmanagement/*" element={<EmployerProposalManagement />}>
                  <Route path="candidacy" element={<EmployerProposalCandidacy />} />
                  <Route path="proposal" element={<EmployerProposalRequest />} />
                </Route>
                <Route path="proposalmanagement/candidacy/trainerlistprofile/:id" element={<TrainerListProfile />} />
                <Route path="proposalmanagement/proposal/trainerlistprofile/:id" element={<TrainerListProfile />} />
                <Route path="settings" element={<EmployerSettings />} />
                <Route
                  path="trainingresource"
                  element={<TrainingResources />}
                />
                <Route path="help&support" element={<TrainerHelpSupport />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardApp;
