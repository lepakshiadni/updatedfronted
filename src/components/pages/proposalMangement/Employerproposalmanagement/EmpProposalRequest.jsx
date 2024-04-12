// EmployerProposalRequest.js
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Profilepic from '../../../assets/profileTrainer.png'
import { Stack, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { updateApplicationStatus } from '../../../../redux/action/employers.action'
import { useDispatch, useSelector } from 'react-redux'
const EmployerProposalRequest = ({ isVisible, accEpt, denIed, appliedTrainingDetails }) => {
    // console.log('applied', appliedTrainingDetails)
    const dispatch = useDispatch()
    const proposalData = {
        programName: "Full Stack Developer",
        topics: "Java, Js, Python, React Native",
        trainingType: "Corporate",
        duration: "10 Days",
        startDate: "01-12-2023",
        endDate: "01-01-2024",
        trainer: {
            name: "Kowshik",
            role: "UI/UX Developer",
            rating: 4.5,
        },
        budget: "$1000-$2000",
        modeOfTraining: "Online",
        proposalStatus: "Kowshik Proposed For Your Post a Requirement",
        company: "Wipro",
        proposalBudget: "2000-3000",
        proposalMode: "Offline",
        proposalLocation: "Kerala",
    };

    const [isDenyPopupVisible, setIsDenyPopupVisible] = useState(false);
    const [isAcceptPopupVisible, setIsAcceptPopupVisible] = useState(false);
    const [seletedTraining, setSeletedTraining] = useState(null)
    const [trainerId, setTrainerId] = useState(null)
    const [trainingDetailsId, setTrainingDetailsId] = useState(null)
    ///
    function generateRandomColor(name) {
        // Get the character code of the first letter of the name
        const charCode = name.charCodeAt(0);

        // Generate random offsets for more variation
        const randomOffsetR = Math.floor(Math.random() * 256);
        const randomOffsetG = Math.floor(Math.random() * 256);
        const randomOffsetB = Math.floor(Math.random() * 256);

        // Generate RGB values based on the character code and random offsets
        const red = (charCode * 7 + randomOffsetR) % 256;
        const green = (charCode * 13 + randomOffsetG) % 256;
        const blue = (charCode * 19 + randomOffsetB) % 256;

        // Construct the RGB color string
        const color = `rgb(${red}, ${green}, ${blue})`;

        return color;
    }
    const deniedHandler = async (training, trainingDetailsId) => {
        setTrainerId(training?.trainerId)
        setTrainingDetailsId(trainingDetailsId)
        setSeletedTraining(training)
        setIsDenyPopupVisible(true);


    }
    const acceptedHandler = async (training, trainingDetailsId) => {
        // dispatch(updateApplicationStatus(trainingDetailsId, training?.trainerId, 'Accepted'));
        setTrainerId(training?.trainerId)
        setTrainingDetailsId(trainingDetailsId)
        setSeletedTraining(training)
        setIsAcceptPopupVisible(true);

    }
    // console.log('seleted', seletedTraining)



    return (
        <>
            {
                appliedTrainingDetails?.length > 0 ? <>
                    {
                        appliedTrainingDetails?.map((proposals, index) => {
                            return proposals?.trainingDetails?.map(({ trainingPostDetails, _id }, trainingData) => {
                                // console.log('traiing',trainingPostDetails)
                                return <div className='allaround' style={{ marginTop: '2rem' }}>
                                    <div className="Trainer_Info">
                                        <div className="TTTD">
                                            <p>Training Program Name</p>
                                            <h3 className="Blue_H2">{trainingPostDetails?.trainingName}</h3>
                                            <p>Training Topics & Subjects</p>
                                            {/* <h2>{proposalData.topics}</h2> */}
                                            <div className="capitalize">
                                                <div className='flex gap-1'>{trainingPostDetails?.topics?.slice(0, 5)?.map((items) => <h2> {items} </h2>)}</div>
                                                <div className='flex gap-1'>{trainingPostDetails?.topics?.slice(5, 10)?.map((items) => <h2>{items}</h2>)}</div>
                                            </div>
                                            <p>Type Of Training</p>
                                            <h2>{trainingPostDetails?.typeOfTraining}</h2>
                                            <p>Duration Of Training</p>
                                            <h2>{trainingPostDetails?.durationCount}</h2>
                                            <div className="SDED">
                                                <div className="SD">
                                                    <p>Start Date</p>
                                                    <h2>{trainingPostDetails?.startDate}</h2>
                                                </div>
                                                <div className="ED">
                                                    <p>End Date</p>
                                                    <h2>{trainingPostDetails?.endDate}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='ProposalStatus'>
                                        <div className='Proposall'>
                                            <div style={{ display: 'flex', flexDirection: "column", alignItems: '', gap: '0.5rem' }}>
                                                <h1 style={{
                                                    color: '#333',
                                                    fontFamily: 'Poppins',
                                                    fontSize: '1.125rem',
                                                    fontStyle: 'normal',
                                                    fontWeight: '500',
                                                    lineHeight: 'normal',
                                                }}>Trainer Profile</h1>

                                                <div className='PB'>
                                                    <Link to={`/employerDashboard/proposalmanagement/proposal/trainerlistprofile/${proposals?.trainerId}`}>
                                                        <div>
                                                            {
                                                                proposals?.trainerProfileImg ?

                                                                    <img src={proposals?.trainerProfileImg} alt="" style={{ borderRadius: "10px", width: '5.8rem', height: '6.55rem' }} />
                                                                    :
                                                                    // <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl bg-[#8888]" >{proposals?.trainerName[0]}</div>
                                                                    <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl bg-slate-400" >
                                                                        <span className="capitalize text-black ">
                                                                            {proposals?.trainerName[0]}
                                                                        </span>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </Link>
                                                    <div className='Trainer_Details'>
                                                        <h2>{proposals?.trainerName}</h2>
                                                        <h3>{proposals?.trainerDesignation}</h3>
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
                                                                icon={<StarIcon sx={{ color: "#FFDE30", fontSize: 20 }} />}
                                                                emptyIcon={
                                                                    <StarBorderIcon sx={{ fontSize: 20, color: "#FFDE30" }} />
                                                                }
                                                                precision={0.1}
                                                                value={0.1}
                                                                readOnly
                                                            />
                                                        </Stack>
                                                    </div>
                                                </div>

                                                <div className='B'><h2>Budget</h2><h1>{trainingPostDetails?.maxBudget} - {trainingPostDetails?.minBudget}</h1></div>
                                                <div className='B'><h2>Mode Of Training</h2><h1>{trainingPostDetails?.modeOfTraining}</h1></div>
                                            </div>
                                        </div>
                                        <div className='Statusss'>
                                            {/* <h3>{proposalData.proposalStatus}</h3> */}
                                            <h3>{proposals?.trainerName} Proposed For Your Post a Requirement</h3>
                                            <br />
                                            <div className='Statuss_Buttonss'>
                                                {isDenyPopupVisible && (
                                                    <div className="Trainer-Proposal-Management-Popup">
                                                        <div className="Trainer-Proposal-Management-Popup-modalContainer ">
                                                            <div className='Trainer-Proposal-Management-Popup-Top' >
                                                                <div className='Trainer-Proposal-Management-Popup-Posted-By'>
                                                                    <div style={{ marginLeft: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                                                        {/* <img src={proposals?.trainerProfileImg} alt="" style={{ borderRadius: "10px", width: '5.8rem', height: '6.55rem' }} /> */}
                                                                        <div>
                                                                            {

                                                                                seletedTraining?.trainerProfileImg ?

                                                                                    <img src={seletedTraining?.trainerProfileImg} alt="" style={{ borderRadius: "10px", width: '5.8rem', height: '6.55rem' }} />
                                                                                    :
                                                                                    // <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl bg-[#8888]" >{proposals?.trainerName[0]}</div>
                                                                                    <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl" style={{ backgroundColor: generateRandomColor(proposals?.trainerName) }}>{proposals?.trainerName[0]}</div>
                                                                            }
                                                                        </div>
                                                                        <div >
                                                                            <h2 style={{}}>{seletedTraining?.trainerName}</h2>
                                                                            <h2>{seletedTraining?.trainerDesignation}</h2>
                                                                            <Stack
                                                                                spacing={1}
                                                                                sx={{
                                                                                    width: "3rem",
                                                                                    height: "0.95363rem",
                                                                                    marginTop: "0.31rem",
                                                                                    // marginLeft: "1.11rem",
                                                                                }}
                                                                                direction="row"
                                                                                alignItems="center"
                                                                            >
                                                                                <Rating
                                                                                    name="half-rating-read"
                                                                                    max={5}
                                                                                    icon={<StarIcon sx={{ color: "#FFDE30", fontSize: 20 }} />}
                                                                                    emptyIcon={
                                                                                        <StarBorderIcon sx={{ fontSize: 20, color: "#FFDE30" }} />
                                                                                    }
                                                                                    precision={0.1}
                                                                                    // defaultValue={trainerData.averageRating}
                                                                                    readOnly
                                                                                />
                                                                            </Stack>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='Trainer-Proposal-Management-Popup-info'>
                                                                    <div className='C-T-B'>
                                                                        <h1>Company</h1>
                                                                        <h2>{trainingPostDetails?.postedByCompanyName}</h2>
                                                                        <h1>Training Name</h1>
                                                                        <h2>{trainingPostDetails?.trainingName}</h2>
                                                                        <h1>Budget</h1>
                                                                        <h2>{trainingPostDetails.maxBudget} - {trainingPostDetails.minBudget}</h2>
                                                                    </div>
                                                                    <div className='M-L'>
                                                                        <h1>Mode</h1>
                                                                        <h2>{trainingPostDetails?.modeOfTraining}</h2>
                                                                        {
                                                                            trainingPostDetails?.modeOfTraining === 'offline' ?
                                                                                <>
                                                                                    <h1>Location</h1>
                                                                                    <h2>{trainingPostDetails?.location}</h2>
                                                                                </>
                                                                                :
                                                                                null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='Trainer-Proposal-Management-Popup-Bottom'>
                                                                <h1>Do You Want To Accept This Proposal ?</h1>
                                                                <div className='Trainer-Proposal-Management-Popup-button'>
                                                                    <button>No</button>
                                                                    <button onClick={() => { setIsDenyPopupVisible(false); dispatch(updateApplicationStatus(trainingDetailsId, trainerId, 'Denied')) }} >Confirm</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                <button onClick={() => { deniedHandler(proposals, _id) }}>Denied</button>
                                                {isAcceptPopupVisible && (
                                                    <div className="Trainer-Proposal-Management-Popup">
                                                        <div className="Trainer-Proposal-Management-Popup-modalContainer ">
                                                            <div className='Trainer-Proposal-Management-Popup-Top' >
                                                                <div className='Trainer-Proposal-Management-Popup-Posted-By'>
                                                                    <div style={{ marginLeft: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                                                        {/* <img src={proposals?.trainerProfileImg} alt="" style={{ borderRadius: "10px", width: '5.8rem', height: '6.55rem' }} /> */}
                                                                        <div>
                                                                            {

                                                                                seletedTraining?.trainerProfileImg ?

                                                                                    <img src={seletedTraining?.trainerProfileImg} alt="" style={{ borderRadius: "10px", width: '5.8rem', height: '6.55rem' }} />
                                                                                    :
                                                                                    // <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl bg-[#8888]" >{proposals?.trainerName[0]}</div>
                                                                                    <div className="rounded-[10px] w-[5.8rem] h-[6.55rem] flex justify-center items-center text-3xl" style={{ backgroundColor: generateRandomColor(proposals?.trainerName) }}>{proposals?.trainerName[0]}</div>
                                                                            }
                                                                        </div>
                                                                        <div >
                                                                            <h2 style={{}}>{seletedTraining?.trainerName}</h2>
                                                                            <h2>{seletedTraining?.trainerDesignation}</h2>
                                                                            <Stack
                                                                                spacing={1}
                                                                                sx={{
                                                                                    width: "3rem",
                                                                                    height: "0.95363rem",
                                                                                    marginTop: "0.31rem",
                                                                                    // marginLeft: "1.11rem",
                                                                                }}
                                                                                direction="row"
                                                                                alignItems="center"
                                                                            >
                                                                                <Rating
                                                                                    name="half-rating-read"
                                                                                    max={5}
                                                                                    icon={<StarIcon sx={{ color: "#FFDE30", fontSize: 20 }} />}
                                                                                    emptyIcon={
                                                                                        <StarBorderIcon sx={{ fontSize: 20, color: "#FFDE30" }} />
                                                                                    }
                                                                                    precision={0.1}
                                                                                    // defaultValue={trainerData.averageRating}
                                                                                    readOnly
                                                                                />
                                                                            </Stack>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='Trainer-Proposal-Management-Popup-info'>
                                                                    <div className='C-T-B'>
                                                                        <h1>Company</h1>
                                                                        <h2>{trainingPostDetails?.postedByCompanyName}</h2>
                                                                        <h1>Training Name</h1>
                                                                        <h2>{trainingPostDetails?.trainingName}</h2>
                                                                        <h1>Budget</h1>
                                                                        <h2>{trainingPostDetails.maxBudget} - {trainingPostDetails.minBudget}</h2>
                                                                    </div>
                                                                    <div className='M-L'>
                                                                        <h1>Mode</h1>
                                                                        <h2>{trainingPostDetails?.modeOfTraining}</h2>
                                                                        {
                                                                            trainingPostDetails?.modeOfTraining === 'offline' ?
                                                                                <>
                                                                                    <h1>Location</h1>
                                                                                    <h2>{trainingPostDetails?.location}</h2>
                                                                                </>
                                                                                :
                                                                                null
                                                                        }

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='Trainer-Proposal-Management-Popup-Bottom'>
                                                                <h1>Do You Want To Accept This Proposal ?</h1>
                                                                <div className='Trainer-Proposal-Management-Popup-button'>
                                                                    <button>No</button>
                                                                    <button onClick={() => { setIsAcceptPopupVisible(false); dispatch(updateApplicationStatus(trainingDetailsId, trainerId, 'Accepted')) }} >Confirm</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                <button onClick={() => { acceptedHandler(proposals, _id) }}>Accept</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })

                        })
                    }
                </> : null
            }
        </>

    );
};

export default EmployerProposalRequest;