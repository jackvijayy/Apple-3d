import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"


const VideoCarousel = () => {
    const videoRef=useRef([]);
    const videoSpanRef=useRef([]);
    const videoDivRef=useRef([]);
    const[video,setVideo]=useState({
        isEnd:false,
        StartPlay:false,
        videoId:0,
        isLastVideo:false,
        isPlaying:false
    })
    const [loadedData, setLoadedData] = useState([])
    const{isEnd,StartPlay,videoId,isLastVideo,isPlaying}=video;
    useEffect(() => {
        if(loadedData.length > 3){
            videoRef.current[videoId].pause()

        }else{
            StartPlay && videoRef.current[videoId].play();

        }
     
     
    }, [StartPlay,videoId,isPlaying,loadedData])
    
    useEffect(() => {
        const currentProgress=0;
        let span=videoSpanRef.current;;
        if(span[videoId]){
            let anim=gsap.to(span[videoId],{
                onUpdate:()=>{


                },
                onComplete:()=>{

                }
            })
        }
      
      
    }, [videoId,StartPlay])
    
  
  return (
    <>
    <div className="flex items-center">
        {hightlightsSlides.map((list,i)=>(
            <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                <div className="video-carousel_container">
                    <div className=" w-full h-full flex-center rounded-xl bg-black overflow-hidden">
                        <video id="video" playsInline={true} autoPlay={true} preload="auto" muted
                        ref={(el)=>(videoRef.current[i]=el)}
                        onPlay={()=>{
                            setVideo((prevVideo)=>({
                                ...prevVideo,isplaying:true
                            }))
                        }}>
                            <source  src={list.video}/>
                        </video>
                    </div>
                    <div className="absolute top-12  left-[5%] z-10">
                        {list.textLists.map((text)=>(
                            <p key={text}>
                                {text}

                            </p>

                        ))}

                    </div>



                </div>

            </div>
        ))}

    </div>
    <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">

        </div>

    </div>
    </>
  )
}

export default VideoCarousel