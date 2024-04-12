// EmployerPosted.js
import React, { useState } from "react";
import PeofilePic from "../../../assets/profileTrainer.png";
import { Stack, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { deletePostTrainingRequirement } from '../../../../redux/action/postRequirement.action'
import { useDispatch } from 'react-redux'

const EmployerPosted = ({ posted }) => {
  console.log('posted', posted)
  const [seletedTraining, setSeletedTraining] = useState(null)
  const dispatch = useDispatch()
  const [activeSteps] = useState([1]);
  // const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const calculateProgressBarWidth = () => {
    const totalSteps = 3; // Update this based on the total number of steps
    const width = ((activeSteps.length - 1) / (totalSteps - 1)) * 100;
    return `${width}%`;
  };
  const togglePopup = (post) => {
    setIsVisible(!isVisible);

  };
  console.log('seleted', seletedTraining)
  const [isVisible, setIsVisible] = useState(false);
  const deleteTrainingHandler = () => {
    dispatch(deletePostTrainingRequirement(seletedTraining?._id))
    // console.log('postId',seletedTraining?._id)
    setIsVisible(!isVisible);

  }



  return (
    <>
      {
        posted?.length > 0 ? <>

          {
            posted?.map((training, index) => {
              return <>
                <div className="Training_Programs">
                  <div className="Training_Programm">
                    <div className="Trainer_Infoo">
                      <div className="TTTDD">
                        <p>Training Program Name</p>
                        <h3 className="Blue_H22">{training?.trainingName}</h3>
                        <p>Training Topics & Subjects</p>
                        <div className="flex space-x-5 capitalize">
                          <div>{training?.topics?.slice(0, 5)?.map((items) => <h2>{items}</h2>)}</div>
                          <div className="bg-[#8888] w-[1px]"></div>
                          <div>{training?.topics?.slice(5, 10)?.map((items) => <h2>{items}</h2>)}</div>
                        </div>
                        <p>Type Of Training</p>
                        <h2>{training.typeOfTraining}</h2>
                        <p>Duration Of Training</p>
                        <h2 className=" capitalize">{training.durationCount} {training?.durationType}{training?.durationCount > 1 ? "'s" : null}</h2>
                        <div className="SDEDD">
                          <div className="SDD">
                            <p>Start Date</p>
                            <h2>{training.startDate}</h2>
                          </div>
                          <div className="EDD">
                            <p>End Date</p>
                            <h2>{training.endDate}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Program_Info">
                      <div
                        className="Stepper"
                        style={{ height: "2.5rem", marginTop: "1.5rem" }}
                      >
                        <div className="steps">
                          {[1, 2, 3].map((step) => (
                            <span
                              key={step}
                              className={`circle ${activeSteps.includes(step) ? "active" : ""
                                }`}
                            >
                              {step}
                            </span>
                          ))}
                          <div className="progress-bar">
                            <span
                              className="indicator"
                              style={{
                                width: calculateProgressBarWidth(),
                              }}
                            ></span>
                          </div>
                        </div>
                      </div>
                      <div className="Step1PS">
                        <h4>Program Status</h4>
                        <p>Posted Date: {training?.createdAt?.slice(0, 10)}</p>
                      </div>
                      <div className="Program_Status">
                        <div className="Total_Part">
                          <p
                            style={{
                              whiteSpace: "nowrap",
                              marginBottom: "1rem",
                              margin: "0%",
                            }}
                          >
                            Total Application
                          </p>
                          <div className="P205">
                            <h1>{training?.participantCount}</h1>
                          </div>
                          <p>Mode</p>
                          <h2>{training.modeOfTraining}</h2>
                          <div>
                            {
                              training?.modeOfTraining === 'offline' ?
                                <>
                                  <p>Location</p>
                                  <h2>{training?.location}</h2>
                                </>
                                :
                                null
                            }

                          </div>
                          <div className="DELDIT" onClick={() => { setSeletedTraining(training) }} >
                            <button className="Del" onClick={togglePopup}>
                              Delete
                            </button>
                            {isVisible && (
                              <div
                                style={{
                                  position: "fixed",
                                  top: "0",
                                  left: "0",
                                  width: "100%",
                                  height: "100%",
                                  backgroundColor: "rgba(10, 10, 10, 0.64)",
                                  zIndex: "9998",
                                }}
                              >
                                <div
                                  style={{
                                    position: "fixed",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    height: "25rem",
                                    width: "45rem",
                                    backgroundColor: "white",
                                    border: "1px solid #ccc",
                                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                                    borderRadius: "10px",
                                    // padding: "20px",
                                    zIndex: 9999,
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <div className="flex justify-end items-end w-full h-[20px] mr-[30px] mt-[-50px]">
                                    <div
                                      className={`svg-container ${isHovered ? "hovered" : ""
                                        }`}
                                      onMouseEnter={() => setIsHovered(true)}
                                      onMouseLeave={() => setIsHovered(false)}
                                      cursor="pointer"
                                      onClick={togglePopup}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="34"
                                        height="34"
                                        viewBox="0 0 34 34"
                                        fill="none"
                                        cursor="pointer"
                                        onClick={togglePopup}
                                      >
                                        <path
                                          d="M8.48347 8.48528L16.9688 16.9706M16.9688 16.9706L25.454 25.4558M16.9688 16.9706L8.48347 25.4558M16.9688 16.9706L25.454 8.48528"
                                          stroke="#2676C2"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                      <svg
                                        className={`background-circle ${isHovered ? "hovered" : ""
                                          }`}
                                        viewBox="0 0 34 34"
                                      >
                                      </svg>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      width: "90%",
                                      // margin: "auto",
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        fontFamily: "Poppins",
                                        fontSize: "20px",
                                        fontWeight: "500",
                                        lineHeight: "30px",
                                        letterSpacing: "0",
                                        textAlign: "left",
                                        color: "#263238",
                                      }}
                                    >
                                      Are you sure you want to delete this post?
                                    </h3>

                                  </div>
                                  {/* <div className="Stepper" style={{ width: "90%" }}>
                                    <div className="steps">
                                      {[1, 2, 3].map((step) => (
                                        <span
                                          key={step}
                                          className={`circle ${activeSteps.includes(step) ? "active" : ""
                                            }`}
                                        >
                                          {step}
                                        </span>
                                      ))}
                                      <div className="progress-bar">
                                        <span
                                          className="indicator"
                                          style={{
                                            width: calculateProgressBarWidth(),
                                          }}
                                        ></span>
                                      </div>
                                    </div>
                                  </div> */}
                                  {/* <div style={{ width: "92%", margin: "auto" }}>
                                    <h3
                                      style={{
                                        color: "#888",
                                        fontFamily: "Poppins",
                                        fontSize: "1rem",
                                        fontStyle: "normal",
                                        fontHeight: "500",
                                        lineHeight: "normal",
                                      }}
                                    >
                                      Perfect trainers
                                    </h3>
                                  </div>
                                  <div
                                    className="PB"
                                    style={{ width: "92%", margin: "auto" }}
                                  >
                                    <img
                                      src={PeofilePic}
                                      alt=""
                                      style={{
                                        borderRadius: "10px 0 0 10px",
                                        width: "5.8rem",
                                        height: "6.55rem",
                                      }}
                                    />
                                    <div className="Trainer_Details">
                                      <h2>Kowshik</h2>
                                      <h3>UI/UX Developer</h3>
                                      <Stack
                                        spacing={1}
                                        sx={{
                                          width: "3rem",
                                          height: "0.95363rem",
                                          marginTop: "0.31rem",
                                        }}
                                        direction="row"
                                        alignItems="center"
                                      >
                                        <Rating
                                          name="half-rating-read"
                                          max={5}
                                          icon={
                                            <StarIcon
                                              sx={{ color: "#FFDE30", fontSize: 20 }}
                                            />
                                          }
                                          emptyIcon={
                                            <StarBorderIcon
                                              sx={{ fontSize: 20, color: "#FFDE30" }}
                                            />
                                          }
                                          precision={0.1}
                                          readOnly
                                        />
                                      </Stack>
                                    </div>
                                    
                                  </div> */}
                                  <div
                                    className="DELDIT flex space-x-9"
                                  // style={{ marginTop: "68px", marginLeft: "35%" }}
                                  >
                                    <button onClick={deleteTrainingHandler} className="Del">Delete</button>
                                    <button className="Edt" onClick={togglePopup}>
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="Notes">
                          <p>Notes</p>
                          <input type="text" placeholder="Taking Some Notes" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            })
          }

        </>
          :
          <div className=" flex justify-center items-center w-full h-[300px] bg-slate-200">
            <span>
              No Training Posted Yet !
            </span>
          </div>
      }

    </>

  );
};

export default EmployerPosted;
