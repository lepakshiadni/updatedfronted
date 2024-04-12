import React from "react";
import "../../styles/TrainingResources.css";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import down from "../../assets/download 1.svg";
import { gettrainerAppliedTraining } from '../../../redux/action/trainer.action'
import { useDispatch, useSelector } from 'react-redux'


const resourceData = [
    "Fundamentals Of Full Stack Developer",
    "Rules of JavaScript",
    "Ways To Set Domain",
    "Fundamentals Of Full Stack Developer",
    "Ways To Set Domain",
    "Rules of JavaScript",
    "Ways To Set Domain",
    "Fundamentals Of Full Stack Developer",
    "Ways To Set Domain",
];

const resourceData1 = [
    "Fundamentals Of Full Stack Developer",
    "Rules of JavaScript",
    "Ways To Set Domain",
    "Fundamentals Of Full Stack Developer",
    "Ways To Set Domain",
    "Rules of JavaScript",
    "Ways To Set Domain",
    "Fundamentals Of Full Stack Developer",
    "Ways To Set Domain",
];

const TrainerTrainingResources = () => {
    const dispatch = useDispatch()

    const handleDownload = (url) => {
        // Create a new anchor element
        const anchor = document.createElement("a");
        // Set the href attribute to the resource URL
        anchor.href = url;
        // Specify that the anchor should trigger a download
        anchor.setAttribute("download", "");
        // Append the anchor to the body
        document.body.appendChild(anchor);
        // Click the anchor to start the download
        anchor.click();
        // Remove the anchor from the body
        document.body.removeChild(anchor);
    };
    let completed;
    const appliedTraining = useSelector(({ trainerSignUp }) => {
        return trainerSignUp?.gettrainerAppliedTraining?.trainingPostData;
    })
    React.useEffect(() => {
        dispatch(gettrainerAppliedTraining())
    }, [dispatch])

    if (appliedTraining) {
        completed = appliedTraining?.filter(({ appliedStatus, trainingPostDetails }) => {
            if (appliedStatus) {
                if (trainingPostDetails?.endDate < new Date().toISOString().slice(0, 10) &&
                    trainingPostDetails?.startDate < new Date().toISOString().slice(0, 10)) {
                    return trainingPostDetails
                }
            }
        })
    }
    console.log('complete', completed)



    return (
        <div className="TrainingResources">
            {
                completed?.length > 0 ?
                    <>
                        {
                            completed?.map(({ trainingPostDetails, trainingResources }) => {
                                return <>
                                    <div className="TrainingResources-main_Content">
                                        <div className="TrainingResources-main_Content_details">
                                            <p>Training Program Name</p>
                                            <h3>{trainingPostDetails?.trainingName}</h3>
                                            <p>Training Topics & Subjects</p>
                                            <div className="flex space-x-5 capitalize">
                                                <div>{trainingPostDetails?.topics?.slice(0, 5)?.map((items) => <h3>{items}</h3>)}</div>
                                                <div className="bg-[#8888] w-[1px]"></div>
                                                <div>{trainingPostDetails?.topics?.slice(5, 10)?.map((items) => <h3>{items}</h3>)}</div>
                                            </div>

                                            <p>Program Status</p>
                                            <h2 style={{ fontSize: "10px" }}>
                                                Review & Update Program
                                                <br />
                                                Results
                                            </h2>
                                            <button>Completed</button>
                                        </div>
                                        <div className="TrainingResources-child_Content">
                                            <p>Resources</p>
                                            <div
                                                style={{
                                                    border: "1px solid #eeeeee",
                                                    width: "98%",
                                                    overflow: "auto",
                                                    paddingTop: "10px",
                                                }}
                                            >
                                                <div className="TrainingResources-child_Content_details">
                                                    {trainingResources?.map((resource, index) => (
                                                        <h2 key={index}>
                                                            <a href="/images/myw3schoolsimage.jpg" download>
                                                                <img src={down} className="hoverr" alt="down-arrow" />
                                                            </a>
                                                            {resource?.fileName}
                                                        </h2>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>{" "}
                                    <br />
                                </>
                            })
                        }
                    </>
                    :
                    <div className="h-[300px] w-full flex justify-center items-center bg-slate-300 rounded-md">
                    <span>
                      No Training Resources Found!
                    </span>
                  </div>
            }

            {/* <div className="TrainingResources-main_Content">
                <div className="TrainingResources-main_Content_details">
                    <p>Training Program Name</p>
                    <h3>Full Stack Developer</h3>
                    <p>Training Topics & Subjects</p>
                    <h2>Java, Js, Python, React Native</h2>
                    <p>Program Status</p>
                    <h2 style={{ fontSize: "10px" }}>
                        Review & Update Program
                        <br />
                        Results
                    </h2>
                    <button>completed</button>
                </div>
                <div className="TrainingResources-child_Content">
                    <p>Resources</p>
                    <div
                        style={{
                            border: "1px solid #eeeeee",
                            width: "98%",
                            overflow: "auto",
                            paddingTop: "10px",
                        }}
                    >
                        <div className="TrainingResources-child_Content_details">
                            {resourceData1.map((resource, index) => (
                                <h2 key={index}>
                                    <img
                                        src={down}
                                        className="hoverr"
                                        alt="down-arrow"
                                        onClick={() => handleDownload(resource)}
                                    />
                                    {resource}
                                </h2>
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default TrainerTrainingResources;
