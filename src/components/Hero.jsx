import { useRef, useState } from 'react'
import Button from './ui/Button'
import { TbLocationFilled } from "react-icons/tb";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {

  const [currentIndex, setCurrentIndex] = useState(1)
  const [hasClicked, setHasClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedVideos, setLoadedVideos] = useState(0)

  const totalVideos = 4
  const nextVideoRef = useRef(null)

  const handleMiniVideoPlayerClick = () => {
    setHasClicked(true)
    setCurrentIndex(prev => (prev % totalVideos) + 1)
  }

  const handleVideoLoad = () => {
    setLoadedVideos(prev => prev + 1)
  }

  const getVideoSrc = (index) => {
    const videoSrc = `videos/hero-${index}.mp4`
    return videoSrc
  }

  useGSAP(()=>{
    if(hasClicked) {
      gsap.set("#next-video", {visibility: "visible"})
      gsap.to("#next-video", {
        // transformOrigin: "center center",
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: ()=> nextVideoRef.current.play()
      })
      gsap.from("#current-video", {
        // transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut"
      })
    }
  }, {dependencies: [currentIndex], revertOnUpdate: true})

  return (
    <div className="relative h-dvh w-screen">
      <div id="video-frame" className="relative h-dvh w-screen rounded-lg">
        <div>
          {/* mini video player that we click on*/}
          <div className="z-50 mask-clip-path absolute-center cursor-pointer rounded-lg overflow-hidden">
            <div className="scale-50 opacity-0 hover:opacity-100 hover:scale-100 transition-all duration-500">
              {/* slowly appears on hover */}
              <video
                id="current-video"
                onClick={handleMiniVideoPlayerClick}                    // updates index to next
                src={getVideoSrc((currentIndex % totalVideos) + 1)}     // shows the next video to be played 
                loop
                muted
                autoPlay
                className="size-64 scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            // this video player will zoom in slowly from the mini video player 
            id="next-video"
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            className="absolute-center size-64 object-cover object-center invisible z-20"
            onLoadedData={handleVideoLoad}
          />
          <video
            // the actual main video playing in the background - will expand from the above vid player
            src={getVideoSrc(currentIndex)}
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
          <p className="font-robert-regular text-blue-100 mt-2 mb-5 text-md sm:text-xl md:text-2xl">
            Enter the Metagame Layer<br />Unleash the Play Economy
          </p>
          <Button id="" title="Watch Trailer" leftIcon={<TbLocationFilled />} containerClass="!bg-my-yellow-300" />
        </div>
        <h1 className="absolute z-50 hero-heading special-font right-5 bottom-5 text-my-blue-75">
          G<b>a</b>ming
        </h1>
      </div>
      <h1 className="absolute hero-heading special-font right-5 bottom-5 text-black">
        G<b>a</b>ming
      </h1>
    </div >
  )
}

export default Hero