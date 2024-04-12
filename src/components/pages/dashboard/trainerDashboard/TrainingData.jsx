import React, { useState } from "react";
import '../../../styles/TrainerdashboardData2.css'
import Carousel from "react-material-ui-carousel";
import { FaArrowRight , FaArrowLeft  } from "react-icons/fa6";
const TrainingData = () => {
  const allTrainingData = [
    {
      type: "Upcoming",
      data: [
        { role: "UI Developer", topics: "Java, Python, C++, C sharp" },
        { role: "Full Stack Developer", topics: "Java, Python, C++, C sharp" },
        // Add more upcoming training data if needed
      ],
    },
    {
      type: "Ongoing",
      data: [
          { role: "UI Developer", topics: "Java, Python, C++, C sharp" },
          { role: "Full Stack Developer", topics: "Java, Python, C++, C sharp" },
          { role: "UI Developer", topics: "Java, Python, C++, C sharp" },
          { role: "UI Developer", topics: "Java, Python, C++, C sharp" },
          { role: "Full Stack Developer", topics: "Java, Python, C++, C sharp" },
          { role: "UI Developer", topics: "Java, Python, C++, C sharp" },
          { role: "UI Developer", topics: "Java, Python, C++, C sharp" },
          { role: "Full Stack Developer", topics: "Java, Python, C++, C sharp" },
          { role: "UI Developer", topics: "Java, Python, C++, C sharp" },
          { role: "UI Developer", topics: "Java, Python, C++, C sharp" },
          { role: "Full Stack Developer", topics: "Java, Python, C++, C sharp" },
          { role: "UI Developer", topics: "Java, Python, C++, C sharp" },
      ],
    },
    {
      type: "Completed",
      data: [
        { role: "UI Developer", topics: "Java, Python, C++, C sharp" },
        { role: "Full Stack Developer", topics: "Java, Python, C++, C sharp" },
        // Add more completed training data if needed
      ],
    },
    {
      type: "Denied",
      data: [
        { role: "Full Stack Developer", topics: "Java, Python, C++, C sharp" },
        { role: "UI Developer", topics: "Java, Python, C++, C sharp" },
        { role: "Full Stack Developer", topics: "Java, Python, C++, C sharp" },
        // Add more denied training data if needed
      ],
    },
  ];

  const [activeType, setActiveType] = useState(0);

  return (
    <div
      className="carousel-container"
      style={{ height: "891px", border: "1px solid #DEDEDE", margin:"20px 0px 0px 20px"}}
    >
      <Carousel
        showThumbs={false} 
        index={activeType}
        onRequestChange={(index) => setActiveType(index)}
        animation="slide"
        interval={5000} // Set the autoplay interval in milliseconds
        timeout={500} // Set the transition duration in milliseconds
        navButtonsAlwaysVisible={true} // Display navigation buttons always
        NavButton={({ onClick, className, style, next }) => {
        //   Customize the navigation buttons here
        //   const ArrowIcon = next ? FaArrowRight : FaArrowLeft;
        //   return (
        //     <ArrowIcon onClick={onClick} className={className} style={style} />
        //   );
        }}
      >
        {allTrainingData.map((trainingType, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeType ? "active" : ""}`}
          >
             <div className={`carousel-controls ${trainingType.type === "Denied" ? "denied-controls" : ""}`}>
              <FaArrowLeft
                style={{ fontSize: "17px" }}
                onClick={() => setActiveType((prev) => (prev === 0 ? allTrainingData.length - 1 : prev - 1))}
                className="custom-arrow left"
              />
              <h3>{trainingType.type} Trainings</h3>
              <h3 className="bg-[#FFFFFF] text-[#2676C2] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center ">{trainingType.data.length} </h3>
              <FaArrowRight
                style={{ fontSize: "18px" }}
                onClick={() => setActiveType((prev) => (prev === allTrainingData.length - 1 ? 0 : prev + 1))}
                className="custom-arrow right"
              />
            </div>
            <div className="slideDataScroll flex flex-col ">
              {trainingType.data.map((training, dataIndex) => (
                <div
                  key={dataIndex}
                  className=" flex align-items-center"
                  style={{
                    height: "121px",
                    fontWeight: 400,
                    backgroundColor: "rgba(38, 118, 194, 0.2)",
                    borderRadius: "4px",
                    marginLeft: "10px",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "5px",
                      height: "121px",
                      backgroundColor: trainingType.type === "Denied" ? "red" : "#2676C2",
                    }}
                  ></div>
                  <div style={{ marginLeft: "20px" }}>
                    <h3 style={{ color: "#333333", fontSize: "14px", fontFamily:"poppins" }}>
                      Name of training
                    </h3>
                    <h3
                      className="mb-2"
                      style={{ color: trainingType.type === "Denied" ? "red" : "#2676C2", fontSize: "12px" , fontFamily:"poppins"}}
                    >
                      {training.role}
                    </h3>
                    <h3 style={{ color: "#333333", fontSize: "14px", fontFamily:"poppins" }}>
                      Topics & Trainings
                    </h3>
                    <h3 style={{ color: trainingType.type === "Denied" ? "red" : "#2676C2", fontSize: "12px", fontFamily:"poppins" }}>
                      {training.topics}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TrainingData;
