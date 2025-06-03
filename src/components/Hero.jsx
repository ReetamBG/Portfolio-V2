import { useRef, useState } from 'react'
import Button from './ui/Button'
import { TbLocationFilled } from "react-icons/tb";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {

  const [bgVidIndex, setbgVidIndex] = useState(1)
  const [expanderVidIndex, setExpanderVidIndex] = useState(2)
  const [miniVidIndex, setMiniVidIndex] = useState(2)
  const [hasClicked, setHasClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedVideos, setLoadedVideos] = useState(0)

  const totalVideos = 4
  const nextVideoRef = useRef(null)

  const handleMiniVideoPlayerClick = () => {
    setHasClicked(true)
    setExpanderVidIndex(miniVidIndex)
    setMiniVidIndex(prev => (prev % totalVideos) + 1)
  }

  const handleVideoLoad = () => {
    setLoadedVideos(prev => prev + 1)
  }

  const getVideoSrc = (index) => {
    const videoSrc = `videos/hero-${index}.mp4`
    return videoSrc
  }

  useGSAP(() => {
    if (hasClicked) {
      gsap.set("#next-video", { visibility: "visible" })
      gsap.to("#next-video", {
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => nextVideoRef.current.play(),
        onComplete: () => {
          setHasClicked(false)
          setbgVidIndex(expanderVidIndex)
        }
      })
      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut"
      })
    }
  }, { dependencies: [miniVidIndex], revertOnUpdate: true })

  useGSAP(() => {
    gsap.set("#video-frame,#player", {
      clipPath: "polygon(10% 0%, 65% 5%, 90% 90%, 0% 100%)",
      borderRadius: "0% 0% 45% 10%"
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      }
    })
    gsap.from("#player", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "5%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#player",
        start: "center center",
        end: "bottom center",
        scrub: true,
      }
    })
  });

  // breathing animation (CHATGPT)
  const miniVidPlayerRef = useRef(null);
  const breathingAnim = useRef(null);

  useGSAP(() => {
    breathingAnim.current = gsap.fromTo(miniVidPlayerRef.current,
      { scale: 1 },
      {
        scale: 1.5,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      }
    )
  })
  const handleMouseEnter = () => {
    breathingAnim.current.pause();
  }
  const handleMouseLeave = () => {
    breathingAnim.current.resume();
  }

  // vid player follow cursor (CHATGPT)
  // useGSAP(() => {
  //   const handleGlobalMouseMove = (e) => {
  //     const centerX = window.innerWidth / 2;
  //     const centerY = window.innerHeight / 2;
  //     const deltaX = (e.clientX - centerX) / centerX;
  //     const deltaY = (e.clientY - centerY) / centerY;
  //     const maxTilt = 50;

  //     if (miniVidPlayerRef.current) {
  //       gsap.to(miniVidPlayerRef.current, {
  //         rotateY: deltaX * maxTilt,
  //         rotateX: -deltaY * maxTilt,
  //         duration: 0.3,
  //         ease: "power2.out"
  //       });
  //     }
  //   };

  //   window.addEventListener("mousemove", handleGlobalMouseMove);
  //   return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  // }, []);

  return (
    <div className="relative h-dvh w-screen">
      <div id="video-frame" className="relative h-dvh w-screen rounded-lg overflow-hidden">
        <div>
          {/* mini video player that we click on*/}
          {/* <div id="mini-video-player"  className="z-50 mask-clip-path absolute-center cursor-pointer rounded-lg overflow-hidden"> */}
          {/*<div className="scale-50 opacity-0 hover:opacity-100 hover:scale-100 transition-all duration-500"> */}
          <div
            id="mini-video-player"
            ref={miniVidPlayerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="z-50 mask-clip-path absolute-center cursor-pointer rounded-lg"
          >
            <div id="player" className="scale-50 hover:scale-100 transition-all duration-500 overflow-hidden rounded-lg">
              {/* slowly appears on hover */}
              <video
                id="current-video"
                onClick={handleMiniVideoPlayerClick}                    // updates index to next
                src={getVideoSrc(miniVidIndex)}     // shows the next video to be played 
                loop
                muted
                autoPlay
                className="size-40 sm:size-64 scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            // this video player will zoom in slowly from the mini video player 
            id="next-video"
            ref={nextVideoRef}
            src={getVideoSrc(expanderVidIndex)}
            loop
            muted
            className="absolute-center rounded-lg size-40 sm:size-64 object-cover object-center invisible z-20"
            onLoadedData={handleVideoLoad}
          />
          <video
            // the actual main video playing in the background - will expand from the above vid player
            src={getVideoSrc(bgVidIndex)}
            autoPlay
            loop
            muted
            className="absolute object-cover size-full"
            onLoadedData={handleVideoLoad}
          />
        </div>
        <div className="absolute z-50 top-5 left-5">
          <h1 className="hero-heading special-font text-my-blue-75">
            Rededfi<b>n</b>e
          </h1>
          <p className="font-robert-medium text-blue-100 mt-2 mb-5 text-md sm:text-xl">
            Enter the Metagame<br />Unleash the Play Economy
          </p>
          <Button id="" title="Watch Trailer" leftIcon={<TbLocationFilled />} containerClass="!bg-my-yellow-300" />
        </div>
        <h1 className="absolute z-50 hero-heading special-font right-5 bottom-5 text-my-blue-75">
          G<b>a</b>ming
        </h1>
      </div>
      <h1 className="absolute hero-heading z-[-10] special-font right-5 bottom-5 text-black">
        G<b>a</b>ming
      </h1>
    </div >
  )
}

export default Hero