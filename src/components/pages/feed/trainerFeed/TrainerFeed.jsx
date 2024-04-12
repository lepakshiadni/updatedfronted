import '../../../styles/Feed.css'
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRef } from 'react';
import TrainerFeedData from './TrainerFeedData';
import { getAllPostTrainingRequirementAction, } from '../../../../redux/action/postRequirement.action'
import { getBookMarkedPost, createConversation, addBookMarkePost } from '../../../../redux/action/trainer.action'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from '@mui/material/Skeleton';
import TrainerApplyPopup from '../../../utils/TrainerApplyPopUp';



const TrainerFeed = ({postrainingData}) => {

    const dispatch = useDispatch()

    const trainer = useSelector(({ trainerSignUp }) => {
        return trainerSignUp?.trainerDetails?.trainerDetails;
    });

    const [open, setOpen] = useState([]);

    const handleMenuClick = (index) => {
        const updatedOpenState = [...open];
        updatedOpenState[index] = !updatedOpenState[index];
        setOpen(updatedOpenState);
    };

    const [showMoreArray, setShowMoreArray] = useState([]);
    const handleShowMoreClick = (index) => {
        const newShowMoreArray = [...showMoreArray];
        newShowMoreArray[index] = !newShowMoreArray[index];
        setShowMoreArray(newShowMoreArray);
    };
    // let menuRef = useRef()
    let showmoreRef = useRef()

    useEffect(() => {
        let handler = (e) => {

            // if (menuRef.current && !menuRef.current.contains(e.target)) {
            //     setOpen([]);
            // }
            if (showmoreRef.current && !showmoreRef.current.contains(e.target)) {
                setShowMoreArray([]);
            }

        };
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [open]);


    const bookMarkedPost = useSelector(({ trainerSignUp }) => {
        return trainerSignUp?.addBookMarkedPost?.userBookmarks;
    })

    useEffect(() => {
        dispatch(getBookMarkedPost())
        dispatch(getAllPostTrainingRequirementAction())
    }, [dispatch])


    const handleIconClick = async (index, bookmark) => {
        await dispatch(addBookMarkePost(bookmark?._id, bookmark))
        setOpen([])
    };

    const [applyPopUp, setApplyPopUp] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null)


    return (
        <div>
            <div className="feed">
                <TrainerApplyPopup trigger={applyPopUp} setTrigger={setApplyPopUp} selectedPost={selectedPost} trainderId={trainer?._id} ></TrainerApplyPopup>

                <section className="centered-section">
                    <div className="centered-content">
                        {
                            trainer?.basicInfo?.profileImg ?
                            <img src={trainer?.basicInfo?.profileImg} alt="" />
                            :
                            <div className='flex justify-center items-center bg-slate-300 rounded-full h-[90px] w-[90px]'>
                                <span className=' items-center text-3xl font-semibold'>
                                    {trainer?.fullName[0]}
                                </span>
                            </div>

                        }
                        <h3 style={{ marginTop: '15px', fontSize: '20px', color: '#263238' }}>
                            {
                                trainer?.basicInfo?.firstName? 
                                trainer?.basicInfo?.firstName + " " + trainer?.basicInfo?.lastName
                                :
                                trainer?.fullName
                            }
                        </h3>
                        <p style={{ fontSize: '14px', marginTop: '0px', color: '#6A6A6A' }}>{trainer?.basicInfo?.designation}</p>
                        <p style={{ fontSize: '12px', marginTop: '10px', color: '#6A6A6A', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                           {trainer?.skills?.slice(0,4)?.map(({name}) => (
                            <p className='ms-1'> {name} |</p>
                        ))}</p>
                        <p style={{ fontSize: '12px', marginTop: '10px', color: '#6A6A6A', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {trainer?.skills?.slice(4,10)?.map(({name}) => (
                            <p className='ms-1'> {name} |</p>
                        ))}</p>
                    </div>
                    <section>
                        <h3 style={{ color: '#888888', fontSize: '16px', marginTop: '10px', textAlign: "start" }}>Bookmarked post</h3>

                        <section ref={showmoreRef} className='scroll' style={{ border: '1px solid #EEEEEE', padding: '10px', height: '300px', marginTop: '10px' }}>

                            {bookMarkedPost?.postDetails?.length > 0 ? <>
                                {bookMarkedPost?.postDetails?.map((bookmark, index) => (
                                    <div key={index}>

                                        <div className='bookmark data' style={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex' }}>
                                                <div style={{ marginRight: '10px' }}>
                                                    {
                                                        bookmark?.postedByImg ? 
                                                        <img className='img2' src={bookmark.postedByImg} alt="" /> 
                                                    
                                                        :
                                                        <div className='img flex justify-center items-center bg-slate-100'>
                                                            <span className=' items-center capitalize'>
                                                                {bookmark?.postedByName[0]}
                                                            </span>
                                                        </div>
                                                    }
                                                </div>
                                                <div style={{ textAlign: 'start' }}>
                                                    <h5 style={{ fontSize: '18px', margin: '0px', color: "#333333" }}>{bookmark.postedByName}</h5>
                                                    <p style={{ fontSize: '14px', margin: '0px', color: '#535353' }}>{bookmark.postedByCompanyName}</p>
                                                </div>
                                            </div>

                                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                                <div
                                                    onClick={() => handleMenuClick(index)}
                                                    style={{ cursor: 'pointer', fontSize: '25px', fontWeight: 'bolder', color: 'gray' }}
                                                >
                                                    ⋮
                                                </div>
                                                {open[index] && (
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            top: '100%', // Position below the three dots
                                                            left: -100,
                                                            background: 'white',
                                                            border: '1px solid #ccc',
                                                            borderRadius: '5px',
                                                            width: '100px',
                                                            zIndex: 9999, // Set a high z-index value
                                                        }}
                                                    >
                                                        <div className='option' style={{ padding: '5px', cursor: 'pointer', fontSize: '12px' }}>Connect</div>
                                                        <div className='option' style={{ padding: '5px', cursor: 'pointer', fontSize: '12px' }} onClick={() => handleIconClick(index, bookmark)}>Remove</div>
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                        <p
                                            className={showMoreArray[index] ? "show-more" : "show-less"} style={{ fontSize: '14px', color: '#888888', marginTop: "10px" }}>
                                            {bookmark?.description}
                                            <hr style={{ margin: '10px 0px' }} />
                                            <div className='skilldata' >
                                                <h5 style={{ color: '#888888' }}>Wanted skills</h5>
                                                {bookmark?.topics.map((val, index) => (
                                                    <div key={index}>
                                                        <p>{val}</p>
                                                    </div>
                                                ))}

                                            </div>
                                            <div className='skilldata2'>
                                                <h5><span className='skillchild'>Type of training -</span> <span className='skillchild2'>{bookmark?.typeOfTraining}</span></h5>
                                                <h5><span className='skillchild' >Experience - </span><span className='skillchild2'>{bookmark?.experience} years</span></h5>
                                                <h5><span className='skillchild' >Duration of training -</span> <span className='skillchild2'>{bookmark?.durationCount} {bookmark?.durationType}</span></h5>
                                                <h5><span className='skillchild' >Budget -</span> <span className='skillchild2'>₹ {bookmark?.minBudget} - ₹ {bookmark?.maxBudget}</span> </h5>
                                                <h5 style={{ display: 'flex', alignItems: 'center', marginTop: '0px' }}><span className='skillchild' >Table of content - <span style={{ color: 'rgb(180, 161, 161)' }}> For Developer.pdf</span></span>
                                                    <span className='downlod'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
                                                            <path d="M1.33301 14.6673H10.2219M5.77745 1.33398V11.7044M5.77745 11.7044L9.48116 8.00065M5.77745 11.7044L2.07375 8.00065" stroke="#2676C2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </span>
                                                </h5>
                                                <div style={{ display: 'flex' }}>
                                                    <h5 style={{ marginRight: '20px', marginTop: "0px", marginBottom: '0px' }}><span className='skillchild' style={{ marginBottom: '15px' }}>Start Date</span> <br /> <span className='skillchild2'>{bookmark?.startDate}</span> </h5>

                                                    <h5 style={{ margin: '0px' }}><span className='skillchild' >End Date</span> <br /> <span className='skillchild2'>{bookmark?.endDate}</span> </h5>

                                                </div>
                                                <h5><span className='skillchild' >Mode of Training -</span> <span className='skillchild2'>{bookmark?.modOfTraining}</span> </h5>
                                                <button onClick={() => {
                                                    setApplyPopUp(true);
                                                    setSelectedPost(bookmark)
                                                }} style={{
                                                    backgroundColor: '#2676C2',
                                                    border: '0px',
                                                    color: 'white',
                                                    padding: '5px 135px',
                                                    fontWeight: 500,
                                                    borderRadius: '10px',
                                                    marginTop: '10px',
                                                    display: 'block' // Make it a block-level element
                                                }}>Apply</button>
                                            </div>
                                        </p>
                                        <button onClick={() => handleShowMoreClick(index)} style={{ background: 'none', border: 'none', color: '#2676C2', cursor: 'pointer', padding: "0px", margin: '0px' }}>
                                            {showMoreArray[index] ? 'Less' : 'more'}
                                        </button>
                                        {!showMoreArray[index] && (
                                            <div style={{ marginTop: '10px' }} className='skillFooter'>
                                                <p style={{ color: '#2676C2', fontWeight: '400px', margin: '0px' }}>₹ 1000 - ₹ 5000</p>
                                                <p style={{ margin: '0px' }}> <span style={{ color: 'gray' }}>Mode of Training</span> <span style={{ color: '#2676C2', fontWeight: '400px' }}>- offline</span> </p>
                                            </div>
                                        )}
                                        <hr style={{ margin: '10px 0px' }} />

                                    </div>
                                ))
                                }

                            </> : <>
                                <div className='flex justify-center items-center h-40'>
                                    <span>
                                        No BookMarks  yet. Start by clicking the "Bookmark" !!.
                                    </span>
                                </div>

                            </>
                            }


                        </section>

                    </section>

                </section>

                <section>
                    <TrainerFeedData bookMarkedPost={bookMarkedPost} postrainingData={postrainingData} />
                </section>

            </div >
        </div >

    );
}

export default TrainerFeed;
