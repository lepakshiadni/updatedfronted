import React, { useState, useEffect } from "react";
import '../../styles/TrainerProfile.css';
import UserAvatar from '../../assets/UserAvatar.png'
import Edit from "../../assets/edit.svg";
import { Link } from "react-router-dom";
import timeago from 'timesago'
import Favi from "../../assets/favi.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EmployerHeader from "../../header&footer/EmployerHeader";
import { employerDetails, getAllAppliedTraining, getConversation } from '../../../redux/action/employers.action'
import { getPostTrainingRequirementAction } from '../../../redux/action/postRequirement.action'
import EmployerConnectionPopUp from "../../utils/EmployerConnectionPopUp";

const EmployerProfile = () => {
  const [showAll, setShowAll] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  const location = useLocation();
  let recentApplication;
  const [showAllExp, setShowAllExp] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [visibleApplications, setVisibleApplications] = useState(1);
  const [showApplication, setShowApplication] = useState(false);
  const [connectionCount, setConnectionsCount] = useState(0)
  const [model, setModel] = useState(false)
  const toggleShowAllActivities = () => {
    setShowAllActivities(!showAllActivities);
  };
  const toggleShowAllExp = () => {
    setShowAllExp(!showAllExp);
  };

  const handleViewMore = () => {
    setVisibleApplications((prevCount) => {
      const newCount = prevCount + 2;
      setShowApplication(true);
      return Math.min(newCount, recentApplications.length);
    });
  };

  const handleViewLess = () => {
    setVisibleApplications(1);
    setShowApplication(false);
  };

  useEffect(() => {
    dispatch(employerDetails())
    dispatch(getPostTrainingRequirementAction())
    dispatch(getAllAppliedTraining())
    dispatch(getConversation(user?._id))
  }, [dispatch])

  const employer = useSelector(({ employerSignUp }) => {
    return employerSignUp?.employerDetails;
  });

  const postDetails = useSelector(({ postRequirement }) => {
    return postRequirement?.postTrainingDetails?.postTrainingDetails
  })
  const connections = useSelector(({ employerSignUp }) => {
    return employerSignUp?.connections?.conversation?.length  || 0;
  })

  useEffect(()=>{
    setConnectionsCount(connections)
  },[connectionCount,connections])

  console.log('connections', connections)

  // const appliedTraining = useSelector(({ employerSignUp }) => {
  //   return employerSignUp?.getAllAppliedTraining?.appliedTrainingDetails
  // })

  console.log(postDetails, "postDetails")


  useEffect(() => {
    if (employer?.success) {
      setUser(employer?.employerDetails);
    }
  }, [employer]);
  const experiences = [
    {
      companyName: "Zipro Technology",
      designation: "UX UI DEVELOPER",
      startDate: "17/7/2023",
      description:
        "Embark on a learning journey that goes beyond the basics. This certification signifies mastery in UI/UX principles.",
    },
    {
      companyName: "Zipro Technology",
      designation: "UX UI DEVELOPER",
      startDate: "17/7/2023",
      description:
        "Embark on a learning journey that goes beyond the basics. This certification signifies mastery in UI/UX principles.",
    },
    {
      companyName: "Zipro Technology",
      designation: "UX UI DEVELOPER",
      startDate: "17/7/2023",
      description:
        "Embark on a learning journey that goes beyond the basics. This certification signifies mastery in UI/UX principles.",
    },
    {
      companyName: "Zipro Technology",
      designation: "UX UI DEVELOPER",
      startDate: "17/7/2023",
      description:
        "Embark on a learning journey that goes beyond the basics. This certification signifies mastery in UI/UX principles.",
    },
    {
      companyName: "Zipro Technology",
      designation: "UX UI DEVELOPER",
      startDate: "17/7/2023",
      description:
        "Embark on a learning journey that goes beyond the basics. This certification signifies mastery in UI/UX principles.",
    },
    {
      companyName: "Zipro Technology",
      designation: "UX UI DEVELOPER",
      startDate: "17/7/2023",
      description:
        "Embark on a learning journey that goes beyond the basics. This certification signifies mastery in UI/UX principles.",
    },
    // Add more experience objects as needed
  ];

  const recentApplications = [
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
    {
      trainingProgramName: "Full Stack Developer",
      companyName: "Mindstay Technologies",
      trainingTopics: "Java, Js, Python, React Native",
      trainingType: "Corporate",
      trainingDuration: "10 Days",
      startDate: "01-12-2023",
      endDate: "10-01-2024",
      applicationStatus: "Pending",
    },
  ];


  console.log("user", user);
  const notificationMessages = [
    {
      image: "https://via.placeholder.com/40x40",
      name: "Mindstay Technologies Accept Request",
      time: "10 min ago",
      accept: "Accept",
      denied: "Denied",
    },
    { image: "", name: "Kowshik Viewed Your Application", time: "30 min ago" },
    {
      image: Favi,
      name: "Mindstay Technologies Accept Request",
      time: "10 min ago",
      accept: "Accept",
      denied: "Denied",
    },
    { image: "", name: "Kowshik Viewed Your Application", time: "30 min ago" },
    {
      image: "https://via.placeholder.com/40x40",
      name: "Mindstay Technologies Accept Request",
      time: "10 min ago",
      accept: "Accept",
      denied: "Denied",
    },
    {
      image: Favi,
      name: "you updated your application",
      time: "30 min ago",
    },
    {
      image: Favi,
      name: "eleesa Accepted Your Application ",
      time: "30 min ago",
    },
    {
      image: "https://via.placeholder.com/40x40",
      name: "Mindstay Technologies Accept Request",
      time: "10 min ago",
      accept: "Accept",
      denied: "Denied",
    },
  ];
  const visibleNotifications = showAll
    ? notificationMessages
    : notificationMessages.slice(-4);

  const handleToggle = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const handleEditProfile = async () => {
    // const profileEditPath = routingProfileEdit();
    await navigate("/employerprofile/profileupdate"); // Navigate to TrainerProfileEdit route
  };
 
  return (
    <>
      <EmployerHeader />
      <EmployerConnectionPopUp trigger={model} setTrigger={setModel} id={user?._id} />
      <div className="w-full sticky z-50 top-[0px] left-[60px]  p-[20px]  h-[60px] flex justify-start items-center bg-white ">
        <div
          onClick={() => {
            navigate("/employerDashboard/dashboard");
          }}
          style={{
            fontSize: "16px",
            fontWeight: "400",
            color: "#888888",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
          >
            <path
              d="M16 7.57143L0.999999 7.57143M0.999999 7.57143L7.42857 14M0.999999 7.57143L7.42857 1.14286"
              stroke="#888888"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h3 style={{ marginLeft: "10px" }}>Back</h3>
        </div>
      </div>

      <div className="w-full relative">
        <div className="w-100% relative ml-[80px] mr-[80px] h-auto flex">
          <div className="leftsideTrainerProfile w-8/12 mr-[23.67px]">
            <div className=" h-[auto] flex flex-col border">
              <div className="h-[195px] ">
                {
                  user?.basicInfo?.profileBanner ?

                    <img className="h-[235.41px] w-full" src={user?.basicInfo?.profileBanner} alt="img" />
                    :
                    <div className="flex justify-center items-center bg-slate-300 w-full h-[235.41px]" />

                }
              </div>
              <div className="">
                <div className="relative flex justify-center items-center flex-col">
                  {
                    user?.basicInfo.profileImg ?
                      <img
                        className="relative top-[-5px] w-[100px] h-[100px] rounded-full"
                        src={user?.basicInfo.profileImg}
                        alt=""
                      />
                      :
                      <div className="relative top-[-5px] w-[100px] h-[100px] flex justify-center items-center rounded-full bg-slate-300">
                        <img alt="" src={UserAvatar} />
                      </div>
                  }
                  <img
                    onClick={handleEditProfile}
                    className="absolute right-[30.33px] cursor-pointer"
                    src={Edit}
                    alt=""
                  />
                  <div className="relative flex justify-center items-center flex-col">
                    <div className="text-[#263238] text-[20px] font-[600] font-['Poppins'] capitalize">
                      {user?.basicInfo?.firstName && user?.basicInfo?.lastName
                        ? `${user.basicInfo.firstName} ${user.basicInfo.lastName}`
                        : user?.fullName
                      }
                    </div>
                    <div className="text-[#232323] text-base font-normal font-['Poppins'] capitalize">

                      {user?.designation}
                    </div>
                    <h4
                      className="font-[600] text-[#2676C2] text-[16px] font-[Poppins] cursor-pointer"
                      onClick={() => setModel(true)}
                    >
                      {connectionCount}{connectionCount >100 ? "+":""} connection
                    </h4>
                  </div>
                  <div className="relative text-center text-[#6A6A6A] text-[14px] font-[400] font-['Poppins'] capitalize">
                    {user?.skills?.slice(0, 7).map(({ name }) => {
                      return (
                        <>
                          <span>
                            {name}| {" "}
                          </span>
                        </>
                      );
                    })}
                    <br />
                    {user?.skills?.slice(7, 10).map(({ name }) => {
                      return (
                        <>
                          <span>
                            {name}| {" "}
                          </span>
                        </>
                      );
                    })}
                    {user?.skills?.length > 10 ? (
                      <span className="text-[#2676c2] hover:cursor-pointer">
                        ....more
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <div className="mt-[17px] mb-[17px] w-9/12 h-[0px] border border-neutral-200"></div>
              </div>
              {
                user?.basicInfo?.status === true ?
                  <div className="pl-[30px] pr-[30px]">
                    <div className="text-[#232323] text-[18px] font-[600px] font-['Poppins'] capitalize">

                      {user?.basicInfo?.objective}
                    </div>
                    <div className="text-[#535353] text-[16px] mt-[10px] font-[400px] font-['Poppins']">
                      {user?.basicInfo?.aboutYou}
                    </div>
                  </div>
                  :
                  <div onClick={handleEditProfile} className="flex justify-center items-center animate-pulse">
                    <span className=" hover:underline cursor-pointer text-[#2676c2] text-sm">
                      Please Complete the Basic Details Profile !
                    </span>
                  </div>
              }
              <div className="flex justify-center items-center flex-col mt-[30px] mr-[10px] ml-[10px]">
                <div className="w-full h-[0px] border border-neutral-200"></div>
              </div>
              <div className="mr-[22px] ml-[28px] mt-[20px]">
                <h3 className="text-[#232323] text-[18px] font-[500] font-['Poppins']">
                  Experience
                </h3>
                {
                  user?.experience?.length > 0 ?
                    <>

                      {user?.experience

                        ?.slice(0, showAllExp ? experiences.length : 3)
                        ?.map((experience, index) => (
                          <div key={index}>
                            <h3 className="mt-[10px]">
                              <span className="text-[#232323] text-[16px] font-[500] font-['Poppins']">
                                Company Name:{" "}
                              </span>
                              <span className="text-[#2676C2] text-[16px] font-[400] font-['Poppins']">
                                {experience.companyName}
                              </span>
                            </h3>

                            <h3 className="mt-[10px]">
                              <span className="text-[#232323] text-[16px] font-[500] font-['Poppins']">
                                Designation:{" "}
                              </span>
                              <span className="text-[#2676C2] text-[16px] font-[400] font-['Poppins']">
                                {experience.designation2}
                              </span>
                            </h3>
                            <h3 className="mt-[10px]">
                              <span className="text-[#232323] text-[16px] font-[500] font-['Poppins']">
                                Start Date:{" "}
                              </span>
                              <span className="text-[#2676C2] text-[16px] font-[400] font-['Poppins']">
                                {experience.startDate}
                              </span>
                            </h3>
                            <p className="mt-[20px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                              {experience.roleDescription}
                            </p>
                          </div>
                        ))}
                    </>
                    :
                    <div onClick={handleEditProfile} className="flex justify-center items-center animate-pulse">
                      <span className=" hover:underline cursor-pointer text-[#2676c2]">
                        Please Complete the Experience Details Profile !
                      </span>
                    </div>
                }
              </div>
              {user?.experience.length > 3 && (
                <div className="mt-[10px] ml-[28px] mb-[13px]">
                  <p
                    className="text-[#2676C2] text-[16px] font-[400] font-['Poppins'] cursor-pointer"
                    onClick={toggleShowAllExp}
                  >
                    {showAllExp ? "Show Less" : "Show More"}
                  </p>
                </div>
              )}
            </div>
            <div className="Reactangle238 w-full h-[auto] mt-[20px] border">
              <div className="pl-[28px] pr-[30px] mt-[21px]">
                <div className="flex justify-between items-center">
                  <div className="text-[#535353] text-[18px] font-[500] font-['Poppins']">
                    Recent Activities
                  </div>
                  <div className="text-[#2676C2] text-[16px] font-[600] font-['Poppins'] rounded-[8px] border border-[#2676C2] pl-[15px] pr-[15px] pt-[3px] pb-[3px] hover:bg-[#2676C2] hover:text-[#fff]">
                    <Link to='/employerDashboard/postarequirements/post-training'>Create post</Link>
                  </div>
                </div>
                <div>
                  {
                    postDetails?.length > 0 ?
                      <>

                        {postDetails
                          ?.slice(0, showAllActivities ? postDetails?.length : 3)
                          ?.map((activity, index) => (
                            <div key={index}>
                              <div className="mt-[20px] text-[#9F9F9F] text-[14px] font-[400] font-['Poppins']">
                                {/* {activity.posted} ago */}
                                {timeago(activity.createdAt)}
                              </div>
                              <div className="mt-[10px] text-[#535353] text-[18px] font-[600] font-['Poppins']">
                                {activity?.trainingName}

                              </div>
                              <div className="mt-[10px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                                {activity.description}
                              </div>
                              {/* <div className="mt-[10px] text-[#2676C2] text-[18px] font-[600] font-['Poppins']">
                                {activity.availability}
                              </div> */}
                              <div className="mt-[10px] flex items-center">
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="11"
                                    height="16"
                                    viewBox="0 0 11 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M11 2V0H0V2H3.5C4.802 2 5.901 2.838 6.315 4H0V6H6.315C6.1097 6.5832 5.7289 7.0886 5.2249 7.4467C4.7208 7.8048 4.1183 7.9981 3.5 8H0V10.414L5.586 16H8.414L2.414 10H3.5C4.652 9.9985 5.7682 9.5998 6.6604 8.8711C7.5526 8.1424 8.1663 7.1284 8.398 6H11V4H8.398C8.2447 3.2722 7.9288 2.58848 7.474 2H11Z"
                                      fill="#2676C2"
                                    />
                                  </svg>
                                </div>
                                <div className="pl-[6px] pr-[7px] text-[#2676C2] text-[18px] font-[400] font-['Poppins']">
                                  {activity?.minBudget}
                                </div>
                                <span className="pr-[7px] text-[#2676C2]">-</span>
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="11"
                                    height="16"
                                    viewBox="0 0 11 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M11 2V0H0V2H3.5C4.802 2 5.901 2.838 6.315 4H0V6H6.315C6.1097 6.5832 5.7289 7.0886 5.2249 7.4467C4.7208 7.8048 4.1183 7.9981 3.5 8H0V10.414L5.586 16H8.414L2.414 10H3.5C4.652 9.9985 5.7682 9.5998 6.6604 8.8711C7.5526 8.1424 8.1663 7.1284 8.398 6H11V4H8.398C8.2447 3.2722 7.9288 2.58848 7.474 2H11Z"
                                      fill="#2676C2"
                                    />
                                  </svg>
                                </div>
                                <div className="pl-[6px] text-[#2676C2] text-[18px] font-[400] font-['Poppins']">
                                  {activity?.maxBudget}
                                </div>
                              </div>
                              <div className="mt-[10px] mb-[20px] flex">
                                <div className="mr-[13px] text-[#888] text-[18px] font-[400] font-['Poppins'] capitalize">
                                  Mode of Training -
                                </div>
                                <div className="text-[#2676C2] text-[18px] font-[400] font-['Poppins'] capitalize">
                                  {activity?.modeOfTraining}
                                </div>
                              </div>
                              <hr />
                            </div>
                          ))}
                      </>
                      :
                      <div className="flex justify-center items-center animate-pulse">
                        <span className=" hover:underline cursor-pointer text-[#2676c2]">
                          Please Complete the Basic Details Profile !
                        </span>
                      </div>
                  }
                </div>
              </div>
              {postDetails?.length > 3 && (
                <div className="pl-[18px] pt-[11px]">
                  <p
                    className="text-[#2676C2] text-[18px] font-[600] font-['Poppins'] cursor-pointer"
                    onClick={toggleShowAllActivities}
                  >
                    {showAllActivities
                      ? "Show Less Activities"
                      : "Load More Activities"}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="rightsideTrainerProfile w-4/12 ">
            <div className="w-full  h-[auto] bg-[#FFFFFF] border border-[#EEEEEE]">
              <div className="pl-[23px] pt-[20px]">
                <h3 className="text-[#535353] text-[18px] font-[500] font-['Poppins']">
                  Recent Application
                </h3>
                {
                  postDetails?.length > 0 ?
                    <>

                      {postDetails
                        ?.slice(
                          0,
                          showApplication
                            ? postDetails.length
                            : visibleApplications
                        )
                        ?.map((application, index) => (
                          <div key={index}>
                            <div className="mt-[10px] text-[#333] text-[18px] font-[600] font-['Poppins']">
                              Training Program Name
                            </div>
                            <div className=" mt-[4px] text-[#2676C2] text-[16px] font-[400] font-['Poppins']">
                              {application?.trainingName}
                            </div>
                            <div className="mt-[10px] text-[#333] text-[18px] font-[600] font-['Poppins']">
                              Company Name
                            </div>
                            <div className="mt-[4px] text-[#2676C2] text-[16px] font-[400]  font-['Poppins']">
                              {application?.postedByCompanyName}
                            </div>
                            <div className="mt-[10px] text-[#333] text-[18px] font-[600] font-['Poppins']">
                              Training Topics & Subjects
                            </div>
                            <div className="mt-[4px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                              <div className="flex space-x-5 capitalize">
                                <div>{application?.topics?.slice(0, 5)?.map((items) => <h2>{items}</h2>)}</div>
                                <div className="bg-[#8888] w-[1px]"></div>
                                <div>{application?.topics?.slice(5, 10)?.map((items) => <h2>{items}</h2>)}</div>
                              </div>
                            </div>
                            <div className="mt-[10px] text-[#333] text-[18px] font-[600] font-['Poppins']">
                              Type Of Training
                            </div>
                            <div className="mt-[5px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                              {application.typeOfTraining}
                            </div>
                            <div className="mt-[10px] text-[#333] text-[18px] font-[600] font-['Poppins']">
                              Duration Of Training
                            </div>
                            <div className="mt-[5px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                              {/* {application.trainingDuration} */}
                              {`${application?.durationCount} ${application?.durationType} ${application?.durationCount > 0 ? "'s" : ""}`}

                            </div>
                            <div className="mt-[10px] flex">
                              <div>
                                <div className="text-[#434343] text-[18px] font-[600] font-['Poppins']">
                                  Start Date
                                </div>
                                <div className="mt-[4px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                                  {application.startDate}
                                </div>
                              </div>
                              <div className="ml-[30px]">
                                <div className="text-[#434343] text-[18px] font-[600] font-['Poppins']">
                                  End date
                                </div>
                                <div className="mt-[4px] text-[#535353] text-[16px] font-[400] font-['Poppins']">
                                  {application.endDate}
                                </div>
                              </div>
                            </div>
                            {/* <div className="mt-[10px]  text-[#434343] text-[18px] font-[600] font-['Poppins']">
        Status Of Application
      </div>
      <div className="mt-[11px] mb-[20px] w-[130px] h-[23px] bg-[#2676C2] bg-opacity-20 rounded border  border-sky-600">
        <div className="pl-[36px] pr-[36px] pt-[1px] pb-[1px] text-[#2676C2] text-[16px] font-[400] font-['Poppins']">
          {application.applicationStatus}
        </div>
      </div> */}

                            <hr />
                          </div>
                        ))}
                    </>
                    :
                    <div className="flex justify-start items-center animate-pulse">
                      <span className=" hover:underline cursor-pointer text-[#2676c2]">
                        No Applications Yet!
                      </span>
                    </div>
                }
              </div>
              {postDetails?.length > visibleApplications && (
                <div className="ml-[23px] mt-[9px] mb-[8px] text-[#2676C2] text-[16px] font-[400] font-['Poppins']">
                  {showApplication ? (
                    <button onClick={handleViewLess}>View Less</button>
                  ) : (
                    <button onClick={handleViewMore}>View More</button>
                  )}
                </div>
              )}
            </div>
            <div className="mt-[20px] w-full min-h-[428px] h-[auto] bg-[#FFFFFF] border border-[#EEEEEE]">
              <div className="pl-[20px] pt-[20px] pr-[20px]">
                <div className="text-neutral-600 text-base font-medium font-['Poppins']">
                  Notifications
                </div>

                <div className="mt-[20px] ">

                  {visibleNotifications.map((notification, index) => (
                    <div key={index}>
                      <div className="flex mt-[10px]">
                        <div className="">
                          <img
                            className="w-10 h-[40px] rounded-full"
                            src={notification.image}
                            alt=""
                          />
                        </div>
                        <div className="pl-[10px]">
                          <div className="flex justify-start flex-col">
                            <p className="text-[#434343] text-[16px] font-[400] font-['Poppins']">
                              {notification.name}
                            </p>
                            <p className="text-[#B8B8B8] text-[10px] font-[400] font-['Poppins']">
                              {notification.time}
                            </p>
                          </div>
                          {notification.accept && notification.denied && (
                            <div className="mt-[10px] flex item-center justify-center">
                              <button className="w-[125px] h-[30px] mr-[20px] text-[#2676C2] text-[16px] font-[600] font-['Poppins'] border border-[#2676C2] rounded-[8px]">
                                {notification.accept}
                              </button>
                              <button className="w-[125px] h-[30px] text-[#fff] text-[16px] font-[600] font-['Poppins'] bg-[#2676C2] rounded-[8px]">
                                {" "}
                                {notification.denied}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <hr className="mt-[10px]" />
                    </div>
                  ))}
                  {notificationMessages.length > 4 && (
                    <button
                      onClick={handleToggle}
                      className="mt-[13px] mb-[14px] pl-[5px] text-[#2676C2] text-[16px] font-[400] font-['Poppins']"
                    >
                      {showAll ? "Show Less" : "Show All"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerProfile;
