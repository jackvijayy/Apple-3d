import { useEffect, useRef, useState } from "react"
import { hightlightsSlides } from "../constants"
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";






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

    const handleLoadededMetadata=(i,e)=> setLoadedData((pre)=>[...pre,e])
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
    }, [videoId,StartPlay]);
    const handleProcess = (type,i)=>{
        switch (type) {
            case 'video-end':
                setVideo((pre)=>({...pre,isEnd:true,videoId:i+1}))
                break;
            case 'video-last':
                setVideo((pre)=>({...pre,isLastVideo:true}))
                break;
            case 'video-reset':
               setVideo((pre)=>({...pre,isLastVideo:false,videoId:0}))
                break;    
            case 'play':
                setVideo((pre)=>({...pre,isPlaying:!pre.isPlaying}))
                break;  

            default:
                break;
        }

    }
    useGSAP(()=>{
        gsap.to('#video'),{
           scrollTrigger:{
                trigger:'#video',
                toggleActions:'restart none none none'

            },
            onComplete:()=>{
                setVideo((prev)=>({
                    ...prev,
                    StartPlay:true,
                    isPlaying:true,
                })
                )
            }
           

        }


    },[isEnd,videoId])
    
  
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
                        }}
                        onLoadedMetadata={(e)=>handleLoadededMetadata(i,e)}>
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
            {videoRef.current.map((_,i)=>(
                <span
                key={i}
                ref={(el)=>(videoDivRef.current[i]=el)} className="mx-2 w-3 h-3 bg-gray-300 rounded-full relative cursor-pointer">
                    <span className="absolute h-full w-full rounded-full" ref={(el)=>(videoSpanRef.current[i]=el)}/>
                </span>
            ))}
        </div>
        <button className="control-btn">
            <img src={isLastVideo ? replayImg: !isPlaying ? playImg : pauseImg} alt={isLastVideo ?'replay' : !isPlaying ? 'play' :'pause'} 
            onClick={isLastVideo ? ()=> handleProcess('video-reset')
                :!isPlaying ? ()=>handleProcess('play')
                : ()=>handleProcess('pause')
            }/>
        </button>
    </div>
    </>
  )
}

export default VideoCarousel