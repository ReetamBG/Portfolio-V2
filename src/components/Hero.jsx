import { useRef, useState, useEffect } from 'react'
import Button from './ui/Button'
import { TbLocationFilled } from "react-icons/tb";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

const totalVideos = 4;

const Hero = () => {

  const [bgVidIndex, setbgVidIndex] = useState(1)
  const [expanderVidIndex, setExpanderVidIndex] = useState(2)
  const [miniVidIndex, setMiniVidIndex] = useState(2)
  const [hasClicked, setHasClicked] = useState(false)
  const [loadedVideosCount, setLoadedVideosCount] = useState(0)
  const [allVideosLoaded, setAllVideosLoaded] = useState(false)

  const nextVideoRef = useRef(null)
  const miniVidPlayerRef = useRef(null)
  const breathingAnim = useRef(null)

  // Preload video refs - one for each video
  const preloadVideoRefs = useRef([])

  // Preload all videos on mount
  useEffect(() => {
    // When all videos have loaded, mark as loaded
    if (loadedVideosCount >= totalVideos) {
      setAllVideosLoaded(true)
    }
  }, [loadedVideosCount])

  // Handlers for loading preloaded videos
  const handlePreloadVideoLoad = () => {
    setLoadedVideosCount(count => count + 1)
  }

  // Handle mini video click
  const handleMiniVideoPlayerClick = () => {
    if (!allVideosLoaded) return // Ignore clicks before preload done

    setHasClicked(true)
    setExpanderVidIndex(miniVidIndex)
    setMiniVidIndex(prev => (prev % totalVideos) + 1)
  }

  // GSAP animation for zooming videos on click
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

  // GSAP scroll clip-path animation
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
    });
    gsap.set("#player", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "5%",
    });
    gsap.to("#video-frame, #player", {
      clipPath: "polygon(10% 0%, 65% 5%, 90% 90%, 0% 100%)",
      borderRadius: "25% 60% 45% 10%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      }
    })
  });

  // Breathing animation for mini video
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
  }, [])

  const handleMouseEnter = () => {
    breathingAnim.current.pause();
  }
  const handleMouseLeave = () => {
    breathingAnim.current.resume();
  }

  // Helper to get video src by index
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`

  return (
    <div className="relative h-dvh w-screen">

      {/* Preload all videos in hidden elements */}
      <div style={{ display: 'none' }}>
        {[...Array(totalVideos)].map((_, idx) => (
          <video
            key={`preload-${idx + 1}`}
            ref={el => preloadVideoRefs.current[idx] = el}
            src={getVideoSrc(idx + 1)}
            preload="auto"
            muted
            playsInline
            onCanPlayThrough={handlePreloadVideoLoad}
          />
        ))}
      </div>

      <div id="video-frame" className="relative h-dvh w-screen rounded-lg overflow-hidden">
        <div>

          {/* Mini video player to click */}
          <div
            id="mini-video-player"
            ref={miniVidPlayerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="z-50 mask-clip-path absolute-center cursor-pointer rounded-lg"
          >
            <div id="player" className="scale-50 hover:scale-100 transition-all duration-500 overflow-hidden rounded-lg">

              {/* Show mini video from preloaded video element's src */}
              <video
                id="current-video"
                onClick={handleMiniVideoPlayerClick}
                src={getVideoSrc(miniVidIndex)}
                loop
                muted
                autoPlay
                className="size-40 sm:size-64 scale-150 object-cover object-center"
              />
            </div>
          </div>

          {/* Next video zooms in on click */}
          <video
            id="next-video"
            ref={nextVideoRef}
            src={getVideoSrc(expanderVidIndex)}
            loop
            muted
            className="absolute-center rounded-lg size-40 sm:size-64 object-cover object-center invisible z-20"
          />

          {/* Main background video */}
          <video
            src={getVideoSrc(bgVidIndex)}
            autoPlay
            loop
            muted
            className="absolute object-cover size-full"
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

      {!allVideosLoaded && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 text-white text-xl">
          Loading videos...
        </div>
      )}

    </div>
  )
}

export default Hero
