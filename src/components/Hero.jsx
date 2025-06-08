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
  const [allVideosLoaded, setAllVideosLoaded] = useState(false)

  const nextVideoRef = useRef(null)
  const miniVidPlayerRef = useRef(null)
  const breathingAnim = useRef(null)

  // 🆕 Added: To store preloaded blob URLs
  const [preloadedSources, setPreloadedSources] = useState([])

  // 🆕 Added: Force preload videos using fetch and blob
  const preloadVideos = async () => {
    const loadedBlobs = await Promise.all(
      [...Array(totalVideos)].map(async (_, idx) => {
        const response = await fetch(getVideoSrc(idx + 1))
        const blob = await response.blob()
        return URL.createObjectURL(blob)
      })
    )
    setPreloadedSources(loadedBlobs)
    setAllVideosLoaded(true)
  }

  // 🆕 Added: Start preloading on mount
  useEffect(() => {
    preloadVideos()
  }, [])

  // 🆕 Added: Cleanup blobs on unmount
  useEffect(() => {
    return () => {
      preloadedSources.forEach(url => URL.revokeObjectURL(url))
    }
  }, [preloadedSources])

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
      gsap.set("#next-video", { visibility: "visible"})
      gsap.set("#player", {border: "none"})
      gsap.to("#next-video", {
        transformOrigin: "center center",
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.out",
        onStart: () => nextVideoRef.current.play(),
        onComplete: () => {
          setHasClicked(false)
          gsap.to("#player", {border: "solid 2px white"})
          setbgVidIndex(expanderVidIndex)
        }
      })
      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.out"
      })
    }
  }, { dependencies: [miniVidIndex], revertOnUpdate: true })

  // GSAP scroll clip-path animation
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
    });

    gsap.to("#video-frame", {
      clipPath: "polygon(10% 0%, 65% 5%, 90% 90%, 0% 100%)",
      borderRadius: "25% 60% 45% 10%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: 0.5,
      }
    })
  });

  // Breathing animation for mini video
  useGSAP(() => {
    breathingAnim.current = gsap.fromTo(["#current-video"],
      { scale: 1 },
      {
        scale: 1.5,
        duration: 1.5,
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

      {/* 🆕 Removed the hidden preload <video> elements (no longer needed) */}

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
            <div id="player" className="scale-50 border-white border-4 hover:border-2 hover:scale-100 transition-all duration-500 overflow-hidden rounded-lg">
              <video
                id="current-video"
                onClick={handleMiniVideoPlayerClick}
                src={preloadedSources[miniVidIndex - 1] || ""}
                loop
                muted
                className="size-40 sm:size-64 scale-150 object-cover object-center"
              />
            </div>
          </div>

          {/* Next video zooms in on click */}
          <video
            id="next-video"
            ref={nextVideoRef}
            src={preloadedSources[expanderVidIndex - 1] || ""}
            loop
            muted
            className="absolute-center rounded-lg size-40 sm:size-64 object-cover object-center invisible z-20"
          />

          {/* Main background video */}
          <video
            src={preloadedSources[bgVidIndex - 1] || ""}
            autoPlay
            loop
            muted
            className="absolute object-cover size-full"
          />
        </div>

        <div className="absolute z-50 top-25 left-10">
          <h1 className="tracking-[2px] hero-heading special-font text-my-blue-75">
            Redefi<b>n</b>e
          </h1>
          <p className="font-robert-medium text-blue-100 mt-2 mb-5 text-md sm:text-lg">
            Enter the Metagame<br />Unleash the Play Economy
          </p>
          <Button id="" title="Watch Trailer" leftIcon={<TbLocationFilled />} containerClass="!bg-my-yellow-300" />
        </div>

        <h1 className="tracking-[2px] absolute z-50 hero-heading special-font right-10 bottom-5 text-my-blue-75">
          G<b>a</b>ming
        </h1>
      </div>

      <h1 className="tracking-[2px] absolute hero-heading z-[-10] special-font right-7 bottom-2 text-black">
        G<b>a</b>ming
      </h1>

      {!allVideosLoaded && (
        <div className="flex flex-col fixed inset-0 items-center justify-center bg-black bg-opacity-70 z-50 text-white">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
          <div className="font-zentry-regular text-xl text-center mt-10">
            Cooking...<br /> Please wait...
          </div>
        </div>
      )}
    </div>
  )
}

export default Hero
