import React, { useEffect, useState } from "react";
import "../../styles/TrainerProposalManagement.css";
import "../../styles/MyTrainingProgram.css";
import EmployerPosted from "./EmployerMyTrainingChilds/EmployerPosted";
import EmployerOngoing from "./EmployerMyTrainingChilds/EmployerOngoing";
import EmployerCompleted from "./EmployerMyTrainingChilds/EmployerCompleted";
import { Link, useLocation } from "react-router-dom";
import { getPostTrainingRequirementAction } from '../../../redux/action/postRequirement.action'
import { getAppliedTrainingEmployer } from '../../../redux/action/employers.action'

import { useDispatch, useSelector } from 'react-redux'

const EmployerMyTraining = () => {
  const location = useLocation();
  const [activeSteps] = useState([1]);
  let ongoing;
  let completed;
  const dispatch = useDispatch()


  const postDetails = useSelector(({ postRequirement }) => {
    return postRequirement?.postTrainingDetails?.postTrainingDetails
  })
  const appliedTraining = useSelector(({ employerSignUp }) => {
    return employerSignUp?.getAppliedTrainingEmployer
  })
  useEffect(() => {
    dispatch(getPostTrainingRequirementAction())
    dispatch(getAppliedTrainingEmployer())
  }, [dispatch])

  if (appliedTraining?.success) {

    ongoing = appliedTraining?.getAppliedTraining?.map((details) => {
      return {
        trainerDetails: {
          trainerId: details.trainerId,
          trainerProfileImg: details.trainerProfileImg,
          trainerName: details.trainerName,
          trainerDesignation: details.trainerDesignation,
          trainerRating: details.trainerRating
        },
        training: details?.trainingDetails?.filter(({ appliedStatus, trainingPostDetails }) => {
          if (appliedStatus) {
            // Check if training is ongoing
            return trainingPostDetails &&
              trainingPostDetails.startDate <= new Date().toISOString().substr(0, 10) &&
              trainingPostDetails.endDate >= new Date().toISOString().substr(0, 10);
          }
        })
      };
    });
    completed = appliedTraining?.getAppliedTraining?.map((details) => {
      return {
        trainerDetails: {
          trainerId: details.trainerId,
          trainerProfileImg: details.trainerProfileImg,
          trainerName: details.trainerName,
          trainerDesignation: details.trainerDesignation,
          trainerRating: details.trainerRating
        },
        training: details?.trainingDetails?.filter(({ appliedStatus, trainingPostDetails }) => {
          if (appliedStatus) {
            // Check if training is completed
            return trainingPostDetails &&
              trainingPostDetails.startDate < new Date().toISOString().substr(0, 10) &&
              trainingPostDetails.endDate < new Date().toISOString().substr(0, 10);
          }
        })
      };
    });
  }

  // console.log('ongoing', ongoing)
  // console.log('complted', completed);

  useEffect(() => {
    setActiveOption(getActiveOption(location.pathname));
  }, [location.pathname]);

  const getActiveOption = (pathname) => {
    if (pathname.startsWith("/employerDashboard/trainingmanagement/posted"))
      return "posted";
    if (pathname.startsWith("/employerDashboard/trainingmanagement/ongoing"))
      return "ongoing";
    if (pathname.startsWith("/employerDashboard/trainingmanagement/completed"))
      return "completed";
    return "posted"; // Default if none matches
  };
  const [activeOption, setActiveOption] = useState(
    getActiveOption(location.pathname)
  );
  const renderComponent = () => {
    switch (activeOption) {
      case "posted":
        return (
          <EmployerPosted
            activeSteps={activeSteps}
            calculateProgressBarWidth={calculateProgressBarWidth}
            posted={postDetails}
          />
        );
      case "ongoing":
        return (
          <EmployerOngoing
            activeSteps={activeSteps}
            calculateProgressBarWidth={calculateProgressBarWidth}
            onGoing={ongoing}
          />
        );
      case "completed":
        return (
          <EmployerCompleted
            activeSteps={activeSteps}
            calculateProgressBarWidth={calculateProgressBarWidth}
            completed={completed}
          />
        );
      default:
        return "posted";
    }
  };
  const calculateProgressBarWidth = () => {
    const totalSteps = 3; // Update this based on the total number of steps
    const width = ((activeSteps.length - 1) / (totalSteps - 1)) * 100;
    return `${width}%`;
  };

  return (
    <div>
      <div className="Post_Buttons pt-[10px] pb-[10px]">
        <Link to="/employerDashboard/trainingmanagement/posted">
          <button
            className={`mr-[19px] min-w-[163px] w-auto h-[31px]  ${activeOption === "posted" ? "active" : ""
              }`}
          >
            Posted
          </button>
        </Link>
        <Link to="/employerDashboard/trainingmanagement/ongoing">
          <button
            className={`mr-[19px] min-w-[163px] w-auto h-[31px]  ${activeOption === "ongoing" ? "active" : ""
              }`}
          >
            Ongoing
          </button>
        </Link>
        <Link to="/employerDashboard/trainingmanagement/completed">
          <button
            className={`mr-[19px] min-w-[163px] w-auto h-[31px]  ${activeOption === "completed" ? "active" : ""
              }`}
          >
            Completed
          </button>
        </Link>
      </div>
      {renderComponent()}
    </div>
  );
};

export default EmployerMyTraining;
