import React, { useEffect, useState } from "react";
import "../../styles/TrainerProposalManagement.css";
import '../../styles/TrainerMyTrainings.css'
import '../../styles/Requirements.css'
import Image15 from "../../assets/image 15.png";
import TrainerProposalApplied from './TrainerProposalManagement/TrainerProposalApplied';
import TrainerProposalRequest from './TrainerProposalManagement/TrainerProposalRequest'
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { gettrainerAppliedTraining, getAllRequestTrainer } from '../../../redux/action/trainer.action'

const TrainerProposalManagement = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  let trainingRequest = [];
  const getActiveOption = (pathname) => {
    if (pathname.startsWith("/trainerDashboard/proposalmanagement/applied"))
      return "Applied";
    if (
      pathname.startsWith(
        "/trainerDashboard/proposalmanagement/proposalrequest"
      )
    )
      return "Proposal";
    return "Applied"; // Default if none matches
  };

  const [activeOption, setActiveOption] = useState(
    getActiveOption(location.pathname) || "Applied"
  );

  useEffect(() => {
    setActiveOption(getActiveOption(location.pathname));
  }, [location.pathname]);
  const proposalData = {
    trainingName: "Full Stack Developer",
    topics: "Java, JS, Python, React Native",
    trainingType: "Corporate",
    duration: "10 Days",
    startDate: "01-12-2023",
    endDate: "01-01-2024",
    postedByImage: Image15,
    postedBy: "Eleesa",
    companyPosted: "Zipro",
    budget: "$1000-$2000",
    mode: "Online",
    proposer: "Kowshik",
  };

  useEffect(() => {
    dispatch(gettrainerAppliedTraining())
    dispatch(getAllRequestTrainer())
  }, [dispatch])

  const appliedTraining = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.gettrainerAppliedTraining?.trainingPostData;
  })
  const requestTrainer = useSelector(({ trainerSignUp }) => {
    return trainerSignUp?.getAllRequestTraining?.trainingPostData
  })
  // console.log("requestTraineraads", requestTrainer)



  if (requestTrainer) {
    trainingRequest = requestTrainer?.map((training) => {
      return {
        trainerDetails:{
          employerId: training?.employerId || "",
          trainerDesignation: training?.trainerDesignation || "",
          trainerId: training?.trainerId || "",
          trainerName:training?.trainerName || "",
          trainerProfileImg:training?.trainerProfileImg || "",
        },
        trainingDetails: training?.trainingDetails?.filter(({ appliedStatus, applicationstatus }) => {
          if(appliedStatus === false  &&  applicationstatus == 'Requested'){
              return training
          }
        })
      }
    });
  }

  // console.log('requestTriner', trainingRequest);



  const renderComponent = () => {
    switch (activeOption) {
      case "Applied":
        return <TrainerProposalApplied training={appliedTraining} />;
      case "Proposal":
        return <TrainerProposalRequest training={trainingRequest} />;
      default:

        return null;
    }
  };

  return (
    <div className="ProposalManagement">
      <div className="Post_Buttons">
        <Link to="/trainerDashboard/proposalmanagement/applied">
          <button style={{ marginRight: "10px" }} className={`Post_T ${activeOption === "Applied" ? "active" : ""}`}>
            Applied
          </button>
        </Link>
        <Link to="/trainerDashboard/proposalmanagement/proposalrequest">
          <button className={`Post_J ${activeOption === "Proposal" ? "active" : ""}`}>Proposal</button>
        </Link>
      </div>
      <div className="ProposalManagement">{renderComponent()}</div>
    </div>
  );
};

export default TrainerProposalManagement;
