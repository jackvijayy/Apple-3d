import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo,smallHeroVideo } from "../utils";
import { useState } from "react";
import { useEffect } from "react";

const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
    const handleVideoSrcset=()=>{
        if(window.innerWidth < 760 ){
            setVideoSrc(smallHeroVideo)
        }
        else{
            setVideoSrc(heroVideo)
        }
    };
    useEffect(()=>{
       window.addEventListener('resize',handleVideoSrcset);
       return ()=>{
        window.removeEventListener('resize',handleVideoSrcset)
       }
    },[])
  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 2 });
  }, []);
  useGSAP(()=>{
    gsap.to('#cta',{opacity:1,y:-5,delay:1.5})

  },[])
  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p className="hero-title " id="hero">
          Iphone 15 Pro
        </p>
        <div className=" md:w-10/12 w-9/12">
        <video className="pointer-events-none" muted  autoPlay={true} loop={true} playsInline={true}  key={videoSrc}>
            <source src={videoSrc}  type="video/mp4"/>
        </video>
        </div>
      </div>
      <div id="cta" className=" flex flex-col items-center opacity-0 ">
        <a href="#highlights" className="btn">Buy</a>
        <p>From $199/Month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
